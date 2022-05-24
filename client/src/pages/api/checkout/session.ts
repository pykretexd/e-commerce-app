import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK, {
  apiVersion: '2020-08-27',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const quantity = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1L15PhDozE4pfg6dz5oXfTA2',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cart`,
  });
  res.status(200).json({ sessionId: session.id });
};
