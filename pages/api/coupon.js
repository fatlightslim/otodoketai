const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST)

export default async function handler(req, res) {
  try {
    let r = await stripe.coupons.retrieve(req.body.id)
    res.json(r)
  } catch (error) {
    res.json(error)
  }
}
