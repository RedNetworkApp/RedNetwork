import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_STRIPE_CHECKOUT_KEY);
  }

  return stripePromise;
};

export default getStripe;
