
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST)

export default async function handler(req, res) {
  const id = req.query.id
  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.")
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["payment_intent"],
    })

    res.status(200).json(checkout_session)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}