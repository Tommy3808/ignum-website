/**
 * IGNUM Heptágono — Stripe Checkout
 * Crea sesión de pago para acceso al Heptágono
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const PLANS = {
  oracle: {
    name: 'Oracle — Claros_Luc',
    description: 'Acceso al Warrior Poet del Heptágono. Una perspectiva soberana.',
    price_usd: 0, // Free
  },
  heptagon: {
    name: 'Heptágono Completo',
    description: '7 IAs con arquetipos únicos respondiendo tu pregunta en paralelo.',
    price_usd: 99,
    price_id: process.env.STRIPE_HEPTAGON_PRICE_ID,
  },
  enterprise: {
    name: 'Heptágono Privado',
    description: 'Tu propio Heptágono configurado con el contexto de tu negocio.',
    price_usd: 0, // Custom
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { plan, email } = req.body;

  if (!plan || plan === 'oracle') {
    return res.status(400).json({ error: 'Oracle es gratuito. No requiere checkout.' });
  }

  if (plan === 'enterprise') {
    return res.status(200).json({
      redirect: 'mailto:tommy@ignumprotocol.com?subject=Heptágono Privado — Cotización',
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: PLANS.heptagon.price_id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://ignumprotocol.ai'}/heptagon/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://ignumprotocol.ai'}/heptagon`,
      metadata: { plan },
    });

    return res.status(200).json({ checkout_url: session.url });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
