
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import {
  verifyCardAccessToken,
  createCardAccessToken,
} from '../../../lib/cardAccess';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

// Récupération des cartes avec un token valide
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Lien de récupération manquant ou invalide.' },
        { status: 401 }
      );
    }

    const email = verifyCardAccessToken(token);

    if (!email) {
      return NextResponse.json(
        { error: 'Ce lien est invalide ou a expiré. Demandez un nouveau lien.' },
        { status: 401 }
      );
    }

    const cartes = [];

    await stripe.checkout.sessions
      .list({ limit: 100 })
      .autoPagingEach(async (session) => {
        const sessionEmail =
          session.customer_details?.email ||
          session.customer_email ||
          session.metadata?.emailClient;

        if (
          session.mode === 'payment' &&
          session.payment_status === 'paid' &&
          sessionEmail?.trim().toLowerCase() === email
        ) {
          cartes.push({
            prestation: session.metadata?.prestation || 'Soin Bien-Être',
            beneficiaire: session.metadata?.beneficiaire || 'Prénom Nom',
            offertPar: session.metadata?.offertPar || 'Proche',
            message: session.metadata?.message || '',
            theme: session.metadata?.theme || 'plaisir',
            code: session.metadata?.codeCarte || 'COLIBRI-2026-XXXX',
          });
        }
      });

    return NextResponse.json({ cartes });

  } catch (error) {
    console.error('Erreur récupération cartes :', error);

    return NextResponse.json(
      { error: 'Impossible de récupérer les cartes pour le moment.' },
      { status: 500 }
    );
  }
}

// Demande d'un nouveau lien de récupération par e-mail
export async function POST(req) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: 'Veuillez saisir une adresse e-mail valide.' },
        { status: 400 }
      );
    }

    let carteTrouvee = false;

    // Recherche des achats payés associés à cette adresse
    await stripe.checkout.sessions
      .list({ limit: 100 })
      .autoPagingEach(async (session) => {
        const sessionEmail =
          session.customer_details?.email ||
          session.customer_email ||
          session.metadata?.emailClient;

        if (
  session.mode === 'payment' &&
  session.payment_status === 'paid' &&
  sessionEmail?.trim().toLowerCase() === email
) {
  carteTrouvee = true;
  return false;
}
      });

    // Si aucune carte n'est trouvée, on renvoie tout de même
    // le même message au client pour protéger ses informations.
    if (!carteTrouvee) {
      return NextResponse.json({
        message:
          'Si une carte cadeau est associée à cette adresse, un lien de récupération vient de vous être envoyé. Pensez à vérifier vos courriers indésirables.',
      });
    }

    const from = process.env.RESEND_FROM_EMAIL;
    const siteUrl =
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL;

    if (!from || !siteUrl || !process.env.RESEND_API_KEY) {
      console.error('Configuration Resend ou URL du site manquante.');

      return NextResponse.json(
        { error: 'Le service est momentanément indisponible.' },
        { status: 500 }
      );
    }

    const token = createCardAccessToken(email);

    const lienCarte =
      `${siteUrl.replace(/\/$/, '')}/recuperer-carte?token=${encodeURIComponent(token)}`;

    const emailSecurise = escapeHtml(email);

    const { data, error } = await resend.emails.send({
      from,
      to: [email],

      subject: 'Votre lien de récupération – Le Colibri du Bien-Être',

      html: `
        <div style="font-family: Arial, sans-serif; color: #451a03; background-color: #fdf8f6; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto;">

          <h2 style="color: #9a3412; margin-top: 0;">
            Retrouver ma carte cadeau
          </h2>

          <p>Bonjour,</p>

          <p>
            Vous avez demandé un nouveau lien pour retrouver
            vos cartes cadeaux du Colibri du Bien-Être.
          </p>

          <p>
            Adresse e-mail concernée :
            <strong>${emailSecurise}</strong>
          </p>

          <p style="margin: 25px 0;">
            <a
              href="${lienCarte}"
              style="background-color: #b45309; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;"
            >
              Retrouver mes cartes cadeaux
            </a>
          </p>

          <p>
            Ce lien est valable pendant 30 minutes.
          </p>

          <p>
            Si vous n'êtes pas à l'origine de cette demande,
            vous pouvez simplement ignorer cet e-mail.
          </p>

          <p>
            À bientôt,<br />
            <strong>Le Colibri du Bien-Être</strong>
          </p>

          <hr style="border: 0; border-top: 1px solid #e7d5c5; margin: 25px 0;" />

          <p style="font-size: 12px; color: #78716c; line-height: 1.6;">
            Message automatique – Merci de ne pas répondre à cet e-mail.<br />
            Pour toute question, contactez :
            <a href="mailto:lecolibridubienetre@gmail.com">
              lecolibridubienetre@gmail.com
            </a>.
          </p>

        </div>
      `,
    });

    if (error) {
      console.error('Erreur Resend :', error);

      return NextResponse.json(
        { error: 'Impossible d’envoyer le lien pour le moment.' },
        { status: 500 }
      );
    }

    console.log('Lien de récupération envoyé :', data?.id);

    return NextResponse.json({
      message:
        'Si une carte cadeau est associée à cette adresse, un lien de récupération vient de vous être envoyé. Pensez à vérifier vos courriers indésirables.',
    });

  } catch (error) {
    console.error('Erreur demande de récupération :', error);

    return NextResponse.json(
      { error: 'Impossible de traiter votre demande pour le moment.' },
      { status: 500 }
    );
  }
}
