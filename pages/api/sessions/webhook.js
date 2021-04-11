import { fetchPostJSON } from "../../../utils/api-helpers"
import { buffer } from "micro"
import Cors from "micro-cors" 
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const fulfillOrder = (session) => {
  // console.log("Fulfilling order", session)
  fetchPostJSON(`${session.cancel_url}/api/orders`, {
    _id: session.client_reference_id,
    payment: session,
    status: "paid",
    url: session.cancel_url,
  }).then((r) => {
    console.log("Fulfilled")
  })
}

const createOrder = (session) => {
  // Saving a copy of the order in your own database.
  // console.log("Creating order", session)
  const meta = session.metadata
  const charge = {}
  Object.keys(meta).forEach((v) => {
    charge[v] = v === "pay" ? meta[v] : parseInt(meta[v])
  })
  fetchPostJSON(`${session.cancel_url}/api/orders`, {
    _id: session.client_reference_id,
    payment: session,
    status: "awaiting_payment",
    charge,
  }).then((r) => {
    console.log("awaiting_payment")
  })
}

const emailCustomerAboutFailedPayment = (session) => {
  // console.log("Emailing customer", session)
  fetchPostJSON(`${session.cancel_url}/api/orders`, {
    _id: session.client_reference_id,
    payment: session,
    status: "payment_failed",
  }).then((r) => {
    console.log("payment_failed")
  })
}

async function handler(req, res) {
  if (req.method === "POST") {
    const payload = await buffer(req)
    const sig = req.headers["stripe-signature"]

    let event

    try {
      event = stripe.webhooks.constructEvent(
        payload.toString(),
        sig,
        endpointSecret
      )
    } catch (err) {
      // console.log(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        // Save an order in your database, marked as 'awaiting payment'
        createOrder(session)

        // Check if the order is paid (e.g., from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === "paid") {
          fulfillOrder(session)
        }

        break
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object

        // Fulfill the purchase...
        fulfillOrder(session)

        break
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object

        // Send an email to the customer asking them to retry their order
        emailCustomerAboutFailedPayment(session)

        break
      }
    }
    // res.status(200)
    res.json({ received: true })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default cors(handler)
