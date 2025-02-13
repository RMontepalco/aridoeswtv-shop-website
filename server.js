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
      - Promo Code
    Show customer recipt after successful purchase
*/
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
      success_url: "https://aridoeswtv.web.app/success",
      cancel_url: "https://aridoeswtv.web.app/cart",

      /*
      // TO DO: Promo Code
      discounts: [
        {
          coupon: '{{COUPON_ID}}',
        },
      ],
      */

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
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
      */
      
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
