import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Use your correct publishable key
const stripePromise = loadStripe('pk_test_51RGO3fCcDUbvCfQ8Oed6Gly85v2yTVzTRQpG6eH9GGA6IB2RvOCmthZqx7PARJZNqxu8p1opbxmhbI9bfWp8Fyr0004Dy77MWE');

const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
