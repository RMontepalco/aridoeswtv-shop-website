import { useEffect, useState } from 'react'

import CartItem from '../CartItem/CartItem'
import './CartPage.css'

import stripe from '/stripe.svg'

export default function CartPage(props) {
  // Display cart total
  const [total, setTotal] = useState(0)

  // Store cart to localStorage and calculate cart total
  // TO DO: Figure out how to display trailing zeroes
  useEffect(() => {
    let curr = 0
    props.cart.map(item => curr += parseFloat(item.price * item.quantity))
    setTotal(parseFloat(curr.toFixed(2)))
  }, [props.cart])

  // Take customer and cart to Stripe Hosted Checkout Page
  function checkOut() {
    // Check if cart is empty
    if (props.cart.length === 0) {
      alert("Cart is empty")
      return
    }

    // Map and parse cart for POST request
    const lineItems = props.cart.map(item => {
      return {
        price: item.priceId,
        quantity: item.quantity
      }
    })

    // Initiate POST request to Render server
    // fetch("http://localhost:3000/create-checkout-session", {
    // TO DO: Feedback when clicking on check out
    fetch("https://aridoeswtv-shop-website.onrender.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({items: lineItems}),
    })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(e => Promise.reject(e))
    })
    .then(({ url }) => {
      alert("Redirecting you to Stripe...")
      window.location = url
    })
    .catch(e => {
      alert(e.error)
      console.error(e.error)
    })
  }

  // Map and render items
  let i = -1
  const cartData = props.cart.map(item => {
    i++
    return <CartItem
    key={i}
    index={i}
    productId={item.productId}
    name={item.name}
    price={item.price}
    description={item.description}
    image={item.image}
    quantity={item.quantity}
    cart={props.cart}
    adjustQuantity={props.adjustQuantity}
    removeFromCart={props.removeFromCart}
    />
  })

  return (
    <div className="cart">
      <h2>cart</h2>
      <div className="cart-header">
        <p>item</p>
        <p>quantity</p>
        <p>total</p>
      </div>
      <div className="cart-items">
        {cartData}
      </div>
      <p>total: ${total} SGD</p>
      <div className="cart-check-out">
        <div className="app-button cart-check-out-button"onClick={checkOut}>Check Out</div>
        <img className="app-stripe" src={stripe} alt="Powered by Stripe"/>
      </div>
    </div>
  )
}
