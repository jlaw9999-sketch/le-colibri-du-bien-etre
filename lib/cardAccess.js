
import { createHmac, timingSafeEqual } from 'node:crypto';

const DUREE_VALIDITE = 30 * 60;

function getSecret() {
  const secret = process.env.CARD_ACCESS_SECRET;

  if (!secret) {
    throw new Error('CARD_ACCESS_SECRET manquante.');
  }

  return secret;
}

function signer(payload) {
  return createHmac('sha256', getSecret())
    .update(payload)
    .digest('base64url');
}

export function createCardAccessToken(email) {
  const payload = Buffer.from(
    JSON.stringify({
      email: email.trim().toLowerCase(),
      expiresAt: Math.floor(Date.now() / 1000) + DUREE_VALIDITE,
    })
  ).toString('base64url');

  return `${payload}.${signer(payload)}`;
}

export function verifyCardAccessToken(token) {
  try {
    const [payload, signature, extra] = token.split('.');

    if (!payload || !signature || extra) return null;

    const expected = Buffer.from(signer(payload));
    const received = Buffer.from(signature);

    if (
      expected.length !== received.length ||
      !timingSafeEqual(expected, received)
    ) {
      return null;
    }

    const data = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    );

    if (
      !data.email ||
      !Number.isFinite(data.expiresAt) ||
      data.expiresAt < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return data.email;
  } catch {
    return null;
  }
}
