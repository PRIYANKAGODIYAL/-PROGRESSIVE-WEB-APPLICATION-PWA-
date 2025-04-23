const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Stripe Checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { cart } = req.body;
    const lineItems = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
