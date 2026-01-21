import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_STRIPE_CHECKOUT_KEY || "");
  }

  return stripePromise;
};

export default getStripe;
