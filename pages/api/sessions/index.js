const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST)

export default async function handler(req, res) {
  const {
    customer_email,
    line_items,
    url,
    client_reference_id,
    metadata,
  } = req.body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email,
    client_reference_id,
    line_items,
    mode: "payment",
    success_url: url + "/order/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: url,
    metadata
  })

  res.json({ id: session.id })
}
