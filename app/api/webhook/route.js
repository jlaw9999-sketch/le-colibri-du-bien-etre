import { createCardAccessToken } from '../../../lib/cardAccess';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Protection contre l'injection de HTML dans les données du client
function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature Stripe manquante.' },
      { status: 400 }
    );
  }

  let event;

  // Vérification de l'authenticité de la notification Stripe
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Erreur signature Stripe :', err.message);

    return NextResponse.json(
      { error: 'Signature Stripe invalide.' },
      { status: 400 }
    );
  }

  // Nous traitons uniquement les paiements Checkout terminés
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;

  // Vérification du paiement
  if (session.payment_status !== 'paid') {
    console.log('Paiement non confirmé :', session.id);

    return NextResponse.json({ received: true });
  }

  const metadata = session.metadata || {};

  // Récupération de l'adresse e-mail
  const clientEmail =
    session.customer_details?.email ||
    session.customer_email ||
    metadata.emailClient;

  if (!clientEmail) {
    console.error('Adresse e-mail absente pour :', session.id);

    return NextResponse.json(
      { error: 'Adresse e-mail du client introuvable.' },
      { status: 400 }
    );
  }

  const prestation = escapeHtml(
    metadata.prestation || 'Soin Bien-Être'
  );

  const beneficiaire = escapeHtml(
    metadata.beneficiaire || 'Prénom Nom'
  );

  const nomExpediteur = process.env.RESEND_FROM_EMAIL;

  const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL;

  if (!nomExpediteur || !siteUrl) {
    console.error('Configuration Resend ou URL du site manquante.');

    return NextResponse.json(
      { error: 'Configuration e-mail incomplète.' },
      { status: 500 }
    );
  }

  try {
    const token = createCardAccessToken(clientEmail);

const lienCarte = `${siteUrl.replace(/\/$/, '')}/recuperer-carte?token=${encodeURIComponent(token)}`;

    const { data, error } = await resend.emails.send({
      from: nomExpediteur,
      to: [clientEmail],

      subject: `Confirmation de votre carte cadeau : ${prestation}`,

      html: `
        <div style="font-family: Arial, sans-serif; color: #451a03; background-color: #fdf8f6; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto;">

          <h2 style="color: #9a3412; margin-top: 0;">
            Merci pour votre achat !
          </h2>

          <p>Bonjour,</p>

          <p>
            Votre paiement a bien été validé.
          </p>

          <p>
            Votre carte cadeau pour
            <strong>${beneficiaire}</strong>,
            correspondant à la prestation
            <strong>${prestation}</strong>,
            est disponible.
          </p>

          <p>
            Vous pouvez la consulter, l'imprimer ou la télécharger
            depuis notre site en utilisant votre adresse e-mail.
          </p>

          <p style="margin: 25px 0;">
            <a
              href="${lienCarte}"
              style="background-color: #b45309; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;"
            >
              Retrouver ma carte cadeau
            </a>
          </p>

          <p>
            À très bientôt,<br />
            <strong>Le Colibri du Bien-Être</strong>
          </p>

          <hr style="border: 0; border-top: 1px solid #e7d5c5; margin: 25px 0;" />

<p style="font-size: 12px; color: #78716c; line-height: 1.6;">
  <strong>Message automatique – Merci de ne pas répondre à cet e-mail.</strong><br />
  Cette adresse est utilisée uniquement pour l'envoi automatique de vos cartes cadeaux.<br />
  Pour toute question ou demande d'information, contactez-nous directement à :
  <a href="mailto:lecolibridubienetre@gmail.com">
    lecolibridubienetre@gmail.com
  </a>.
</p>

<p style="font-size: 12px; color: #78716c;">
  Le Colibri du Bien-Être vous remercie de votre confiance
  et vous souhaite un agréable moment de détente.
</p>

        </div>
           `,
    }, {
      idempotencyKey: `carte-cadeau/${session.id}`,
    });

    if (error) {
      console.error('Erreur Resend :', error);

      return NextResponse.json(
        { error: 'Échec de l’envoi de l’e-mail.' },
        { status: 500 }
      );
    }

    console.log('E-mail envoyé avec succès :', data?.id);

    return NextResponse.json({
      received: true,
      emailSent: true,
    });

  } catch (emailError) {
    console.error('Erreur lors de l’envoi :', emailError);

    return NextResponse.json(
      { error: 'Erreur lors de l’envoi de l’e-mail.' },
      { status: 500 }
    );
  }
}
