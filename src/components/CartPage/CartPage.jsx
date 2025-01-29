import { useEffect, useState } from 'react'

import './CartPage.css'

export default function CartPage() {
  // Initiate or load cart items from localStorage
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, setCart] = useState(cartLocalStorage)
  const [total, setTotal] = useState(0)

  // Add items to cart
  function addToCart() {
    setCart(prevCart => [...cart, {name: "Patchwork Cat"}])
  }

  // Store cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    let curr = 0
    cart.map(item => curr += parseFloat(item.price))
    setTotal(curr)
  }, [cart])

  function checkOut() {
    // Check if cart is empty
    if (cart.length === 0) {
      console.log("empty cart")
      return
    }

    // Parse cart to stripe format
    const lineItems = cart.map(item => {
        return {
          price: item.priceId,
          quantity: item.quantity
        }
    })

    // Initiate POST request to the server
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // Send cart items to Stripe
      body: JSON.stringify({items: lineItems}),
    })

    // Determine if response is ok
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(e => Promise.reject(e))
    })

    // Redirect customer to success URL
    .then(({ url }) => {
      window.location = url
    })

    // Catch and display error
    .catch(e => {
      console.error(e.error)
    })
  }

  // Map and render items
  const cartData = cart.map(item => {
    return <div className="cart-item">
      <img className="cart-image" src={item.image}/>
      <div className="cart-info">
        <p>{item.name}</p>
        <p>{item.price}</p>
      </div>
    </div>
  })

  return (
    <div className="cart">
      <h1>Cart</h1>
      {
        // TO DO: Add headers
      }
      <div className="cart-items">
        {cartData}
      </div>
      <p>total: ${total} SGD</p>
      <button onClick={checkOut}>Check Out</button>
    </div>
  )
}
