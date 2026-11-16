
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const tarifsPrestations = {
  "Massage holistique": 75,
  "Massage intuitif complet – Holistique, Énergétique & Magnétique": 95,
  "Soins énergétiques": 55,
  "Séance de relaxation": 65,
  "Massage assis AMMA": 50,
  "Massage tête / pieds / mains": 50,
  "Power Feet": 20,
  "Power Head": 25,
  "Massage sportif – préparation avant effort": 130,
  "Massage récupération après l’effort": 150,
  "Massage profond avec points d’acupression": 95,
  "TEST TECHNIQUE – Carte cadeau 1 €": 1,
};

// ============================================================
// GET : Récupération des informations pour /merci
// ============================================================

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Identifiant de session manquant.' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Ne jamais afficher une carte avant confirmation du paiement
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Le paiement n’est pas encore confirmé.' },
        { status: 403 }
      );
    }

    const metadata = session.metadata || {};

    return NextResponse.json({
      theme: metadata.theme || 'plaisir',
      prestation: metadata.prestation || 'Soin Bien-Être',
      beneficiaire: metadata.beneficiaire || 'Prénom Nom',
      offertPar: metadata.offertPar || 'Proche',
      message: metadata.message || '',
      code: metadata.codeCarte || 'COLIBRI-2026-XXXX',
    });

  } catch (error) {
    console.error('Erreur API GET session:', error);

    return NextResponse.json(
      { error: 'Impossible de récupérer les informations de la carte cadeau.' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST : Création d'une session de paiement Stripe
// ============================================================

export async function POST(request) {
  try {
    const body = await request.json();

    const beneficiaire = String(body.beneficiaire || '').trim();
    const offertPar = String(body.offertPar || '').trim();
    const prestation = String(body.prestation || '').trim();
    const message = String(body.message || '').trim();
    const emailClient = String(body.emailClient || '').trim().toLowerCase();
    const theme = body.theme === 'fetes' ? 'fetes' : 'plaisir';

    // Vérification des champs obligatoires
    if (!beneficiaire || !offertPar || !prestation || !emailClient) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être renseignés.' },
        { status: 400 }
      );
    }

    // Limitation des longueurs
    if (
      beneficiaire.length > 100 ||
      offertPar.length > 100 ||
      message.length > 120
    ) {
      return NextResponse.json(
        { error: 'Un des champs contient trop de caractères.' },
        { status: 400 }
      );
    }

    // Vérification de l'adresse e-mail
    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClient);

    if (!emailValide || emailClient.length > 254) {
      return NextResponse.json(
        { error: 'Adresse e-mail invalide.' },
        { status: 400 }
      );
    }

    // Le prix est déterminé uniquement par le serveur
    const prixEnEuros = tarifsPrestations[prestation];

    if (!prixEnEuros) {
      return NextResponse.json(
        { error: 'Prestation inconnue ou tarif non défini.' },
        { status: 400 }
      );
    }

    const unitAmountInCents = prixEnEuros * 100;

    // Génération cryptographique du code cadeau
    const randomString = randomBytes(6).toString('hex').toUpperCase();
    const codeUnique = `COLIBRI-2026-${randomString}`;

    // Adresse du site
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.headers.get('origin');

    if (!siteUrl) {
      return NextResponse.json(
        { error: 'Adresse du site non configurée.' },
        { status: 500 }
      );
    }

    const origin = new URL(siteUrl).origin;

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({

      payment_method_types: ['card'],

      line_items: [
        {
          price_data: {
            currency: 'eur',

            product_data: {
              name: `Carte Cadeau : ${prestation}`,

              description:
                `Pour : ${beneficiaire} | De : ${offertPar} | Code : ${codeUnique}`,
            },

            unit_amount: unitAmountInCents,
          },

          quantity: 1,
        },
      ],

      mode: 'payment',

      success_url:
        `${origin}/merci?type=carte-cadeau&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${origin}/carte-cadeau`,

      // Adresse utilisée par Stripe Checkout
      customer_email: emailClient,

      // Informations conservées pour le webhook et la récupération
      metadata: {
        beneficiaire,
        offertPar,
        prestation,
        message,
        theme,
        codeCarte: codeUnique,
        emailClient,
      },
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {
    console.error('Erreur Stripe API:', error);

    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement.' },
      { status: 500 }
    );
  }
}
