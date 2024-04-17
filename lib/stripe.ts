import Stripe from "stripe"

// import { env } from "@/env.mjs"
// env.STRIPE_API_KEY
export const stripe = new Stripe("", {
  apiVersion: "2022-11-15",
  typescript: true,
})
