import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'

// Setup express and cors
const app = express()
app.use(express.json())
app.use(cors());

// Set port number
const port = process.env.PORT || 3000

// Setup Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Create a post request for /create-checkout-session
app.post("/create-checkout-session", async (req, res) => {
  try {
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US', 'SG'],
      },
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => {
        return {
          price: item.price,
          quantity: item.quantity,
        }
      }),
      mode: "payment",
      success_url: `https://aridoeswtv.web.app/`,
      cancel_url: `https://aridoeswtv.web.app//cart`,
    })

    res.json({ url: session.url })
  } catch (e) {
    // If there is an error send it to the client
    res.status(500).json({ error: e.message })
  }
})

// Start up server on specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
