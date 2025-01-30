import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'

// Setup Express and CORS
const app = express()
app.use(express.json())
app.use(cors());

// Set port number (Render || localhost)
const port = process.env.PORT || 3000

// Setup Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Create a POST request for Stripe Checkout via /create-checkout-session
/*
  TO DO:
    Set up Stripe Checkout Page with the following credentials:
      - Email
      - Phone
      - Comments
      - Shipping/Biling Address
      - Shipping Method
      - Payment Method
      - Promo Code
*/
app.post("/create-checkout-session", async (req, res) => {
  try {
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
    res.status(500).json({ error: e.message })
  }
})

// Start up server on specified port
app.get("/", (req, res) => {
  res.send(`Server running on port ${port}`)
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
