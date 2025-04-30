import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../services/profile'; // Adjust the import path as necessary

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      // Step 1: Create payment intent
      const { data } = await api.post('/api/payments/create-payment-intent', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const clientSecret = data.clientSecret;
console.log('Client Secret:', clientSecret);
      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${firstName} ${lastName}`,
            address: {
              country: country,
              postal_code: postalCode,
            }
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Step 3: Confirm to backend
          await api.post('/api/payments/confirm', {
            paymentIntentId: result.paymentIntent.id
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Redirect after success
          
          navigate('/profile');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong during payment.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Secure Checkout</h2>

      {/* Billing Cycle */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Confirm your billing cycle</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="billingCycle"
              value="monthly"
              checked={billingCycle === 'monthly'}
              onChange={(e) => setBillingCycle(e.target.value)}
            />
            Monthly (EGP 499.99 / month)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="billingCycle"
              value="annual"
              checked={billingCycle === 'annual'}
              onChange={(e) => setBillingCycle(e.target.value)}
            />
            Annual (EGP 249.99 / month billed yearly)
          </label>
        </div>
      </div>

      {/* Card Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Credit/Debit Card</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="p-2 border rounded"
          />
        </div>

        <div className="p-3 border rounded mb-4">
          <CardElement options={{ hidePostalCode: true }} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        {loading ? 'Processing...' : billingCycle === 'monthly' ? 'Pay EGP 499.99' : 'Pay EGP 2999.88'}
      </button>

      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
