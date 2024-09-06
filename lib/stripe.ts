import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Update to a valid version
  typescript: true,
});