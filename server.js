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
      - Shipping/Biling Address (Enable all countries)
      - Shipping Method (SG Ground, consult Arielle for International)
      - Payment Method (Enable all methods)
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
      success_url: "https://aridoeswtv.web.app/success",
      cancel_url: "https://aridoeswtv.web.app/cart",
      // success_url: "http://localhost:5173/success",
      // cancel_url: "http://localhost:5173/cart",
    })
    res.json({url: session.url})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

// Display specified port on server
app.get("/", (req, res) => {
  res.send(`Server running on port ${port}`)
})

// Start up server on specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
