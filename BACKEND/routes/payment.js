const express = require('express');
const Stripe = require('stripe');
const Payment = require('../models/payment');
const router = express.Router();

const stripe = Stripe('sk_test_51QEogtFo5lCFtFC0puPEhQ1Lnufb9wf9weD2Wj925QZbpyqPRMKa23pketo3OL6rUs4ZSSC6b38iMbRo0LsOQelZ00OUY9RR1c');

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    const newPayment = new Payment({
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

    await newPayment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

module.exports = router;