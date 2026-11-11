
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { verifyCardAccessToken } from '../../../lib/cardAccess';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

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

    // Parcours automatique de toutes les pages Stripe
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
