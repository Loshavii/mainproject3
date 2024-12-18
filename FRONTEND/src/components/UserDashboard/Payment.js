import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';  // Import emailjs for sending emails
import 'react-toastify/dist/ReactToastify.css';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51QEogtFo5lCFtFC0pcYTJ9SEfi8OlHefwUWp8BGI2fxwpKAi4kXlamGv7a4ZvdAaKZgPnTd1gEieFvIev696DPO000g76MZTop');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [amount, setAmount] = useState(0);
  const [packageDetails, setPackageDetails] = useState({ name: '', description: '' });

  useEffect(() => {
    const storedPackageName = sessionStorage.getItem('selectedPackageName');
    const storedPackageDescription = sessionStorage.getItem('selectedPackageDescription');
    if (storedPackageName && storedPackageDescription) {
      setPackageDetails({
        name: storedPackageName,
        description: storedPackageDescription,
      });
    }
    const contactOption = sessionStorage.getItem('contactOption');
    if (contactOption) {
      setAmount(contactOption === 'chat' ? 300 : 500); // $3 or $5 in cents
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!cardholderName.trim()) {
      toast.error("Please enter the cardholder's name");
      setLoading(false);
      return;
    }

    // Retrieve userId with the "id-" prefix
    const userId = sessionStorage.getItem('id'); // Directly get the ID from sessionStorage

    if (!userId) {
      toast.error("User information is missing. Please log in again.");
      setLoading(false);
      return;
    }

    sessionStorage.setItem('paymentStatus', 'Pending');

    try {
      // Create a payment intent
      const response = await axios.post('http://localhost:2003/api/payments/payment-intent', {
        amount,
        cardholderName,
        userId, // Send raw userId without 'id-' prefix
      });

      const { clientSecret, paymentIntentId } = response.data;

      // Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: cardholderName },
        },
      });

      if (error) {
        toast.error('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success(`Payment of $${(amount / 100).toFixed(2)} successful! Thank you for your purchase.`, {
          position: "top-right",
          autoClose: 3000,
        });
        sessionStorage.setItem('paymentStatus', paymentIntent.status);

        // Save payment details in MongoDB
        await axios.patch('http://localhost:2003/api/payments/update-payment-status', {
          paymentIntentId: paymentIntent.id,
          status: 'Succeeded',
          userId: userId, // Use the prefixed userId
        });

        // Trigger Email after Payment Success
        const userEmail = sessionStorage.getItem('email'); // Get user's email from sessionStorage or backend

        if (userEmail) {
          const templateParams = {
            user_email: userEmail,
            payment_amount: (amount / 100).toFixed(2),
            package_name: packageDetails.name,
            package_description: packageDetails.description,
          };

          // Send the success email via EmailJS
          emailjs.send('service_sdz5ece', 'template_q9ja6b6', templateParams, '6YJpNZJnOKv4hOLAn')
            .then((result) => {
              console.log('Email sent successfully:', result.text);
            })
            .catch((error) => {
              console.log('Error sending email:', error.text);
            });
        }

        // Clean up session and local storage
        sessionStorage.removeItem('paymentAmount');
        sessionStorage.removeItem('selectedPackageName');
        sessionStorage.removeItem('selectedPackageDescription');
        sessionStorage.removeItem('contactOption');
        const userPackages = JSON.parse(localStorage.getItem('userPackages')) || [];
        const newPackage = {
          id: sessionStorage.getItem('selectedPackageId'),
          name: packageDetails.name,
          description: packageDetails.description,
          price: amount,
          date: new Date().toISOString(),
        };
        userPackages.push(newPackage);
        localStorage.setItem('userPackages', JSON.stringify(userPackages));
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4 className="mb-4">Enter Card Details</h4>
      <div className="form-group mb-3">
        <label htmlFor="cardholderName">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          className="form-control"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <CardElement className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

const Payment = () => (
  <div className="container payment-container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 mt-5">
          <h2 className="text-center mb-4">Complete Your Payment</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
);

export default Payment;
