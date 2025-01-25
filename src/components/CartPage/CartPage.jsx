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
    </div>
  )
}
