import { useEffect, useState } from 'react'

import close from '/x.svg'
import stripe from '/stripe.svg'

import './Card.css'

export default function Card(props) {
  // Initiate or load cart items from localStorage
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, setCart] = useState(cartLocalStorage)

  // Store state of card overlay display
  const [styles, setStyles] = useState({display: "none"})

  // Store cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Add items to cart
  function addToCart() {
    setCart(prevCart => [...cart, {
      buyId: props.buyId,
      priceId: props.priceId,
      name: props.name,
      price: props.price,
      description: props.description,
      image: props.image,
      quantity: 1
    }])
  }

  // Toggle card overlay
  function toggleCardOverlay() {
    setStyles(prevStyles => prevStyles.display === "none" ? {display: "flex"} : {display: "none"})
  }

  return (
    <div>
      <div className="card" onClick={toggleCardOverlay} tabIndex="0">
        <img className="card-image" src={props.image} alt="Product Image"/>
        <div className="card-info">
          <p>{props.name}</p>
          <p>${props.price} SGD</p>
        </div>
      </div>
      <div className="card-overlay-container" style={styles}>
        <div className="card-overlay-background" onClick={toggleCardOverlay}></div>
        <div className="card-overlay">
          <img className="card-overlay-image" src={props.image} alt="Product Image"/>
          <div className="card-overlay-info">
            <div style={{display: "flex", flexDirection: "column"}}>
              <h2>{props.name}</h2>
              <h3>${props.price} SGD</h3>
            </div>
            <p>{props.description}</p>
            <div className="add-or-buy">
            {
              // TO DO: Add feedback for adding to cart
            }
              <div className="add" onClick={addToCart}>
                <p>add to cart</p>
              </div>
              <p>or</p>
              <stripe-buy-button
                buy-button-id={props.buyId}
                publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
              >
              </stripe-buy-button>
              <img className="stripe" src={stripe} alt="Powered by Stripe"/>
            </div>
          </div>
          <img className="close-button" src={close} alt="Close Button" 
            onClick={toggleCardOverlay} tabIndex="0"/>
        </div>
      </div>
    </div>
  )
}
