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
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      custom_fields: [{
        key: 'comments',
        label: {
          type: 'custom',
          custom: 'Comments',
        },
        type: 'text',
        optional: true,
      },],
      shipping_address_collection: {
        allowed_countries: ["SG"],
      },
      phone_number_collection: {
        enabled: true,
      },
      payment_method_types: ["card"],
      mode: "payment",
      allow_promotion_codes: true,

      // LIVE
      shipping_options: [
        {
          shipping_rate: "shr_1Qrq3xGRlh09FAWd0h5FOFYy"
        },
        {
          shipping_rate: "shr_1Qrq68GRlh09FAWdyLDU9nJR"
        },
      ],
      line_items: req.body.items.map((item) => {
        return {
          price: item.price,
          quantity: item.quantity,
        }
      }),
      success_url: "https://aridoeswtv.web.app/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://aridoeswtv.web.app/cart",

      /*
      // TEST
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 300,
            currency: 'sgd',
          },
          display_name: 'Tracked Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },],
      line_items: [
        {
          price: "price_1Qq3jpDFXrpPauNh7sEq31Li",
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
      */
      
    })
    res.json({url: session.url})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

// Redirect customer to success page and display order information
app.get('/success', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
    const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);
    res.json({url: charge.receipt_url})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
});

// Display specified port on server
app.get("/", (req, res) => {
  res.send(`Server running on port ${port}`)
})

// Start up server on specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
