import { useEffect, useState } from 'react'

import './CartPage.css'

export default function CartPage() {
  // Initiate or load cart items from localStorage
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, setCart] = useState(cartLocalStorage)
  const [total, setTotal] = useState(0)

  // Store cart to localStorage and calculate cart total
  // TO DO: Round cart total to two decimal places
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    let curr = 0
    cart.map(item => curr += parseFloat(item.price))
    setTotal(curr)
  }, [cart])

  function checkOut() {
    // Check if cart is empty
    // TO DO: Display empty cart message to customer
    if (cart.length === 0) {
      return
    }

    // Map and parse cart for POST request
    const lineItems = cart.map(item => {
      return {
        price: item.priceId,
        quantity: item.quantity
      }
    })

    // Initiate POST request to the server
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
      window.location = url
    })
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
