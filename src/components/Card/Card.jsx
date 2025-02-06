import { useEffect, useState } from 'react'

import close from '/x.svg'
import stripe from '/stripe.svg'

import './Card.css'

export default function Card(props) {
  // Store state of card overlay display
  const [styles, setStyles] = useState({display: "none"})

  // Toggle card overlay
  function toggleCardOverlay() {
    setStyles(prevStyles => prevStyles.display === "none" ? {display: "flex"} : {display: "none"})
  }

  return (
    <div>
      <div className="card" onClick={toggleCardOverlay} tabIndex="0">
        <img src={props.image} alt="Product Image"/>
        <p>{props.name}</p>
        <p>${props.price} SGD</p>
      </div>
      <div className="card-overlay-container" style={styles}>
        <div className="card-overlay-background" onClick={toggleCardOverlay}></div>
        <div className="card-overlay">
          <img className="app-button card-close" src={close} alt="Close Button" onClick={toggleCardOverlay} tabIndex="0"/>
          <div className="card-overlay-image">
            <img src={props.image} alt="Product Image"/>
          </div>
          <div className="card-overlay-info">
            <div style={{display: "flex", flexDirection: "column"}}>
              <h2>{props.name}</h2>
              <h3>${props.price} SGD</h3>
            </div>
            <p>{props.description}</p>
            <div className="card-add-or-buy">
              <div className="app-button card-add" onClick={() => props.addToCart(props)}>
                <p>add to cart</p>
              </div>
              <p>or</p>
              <div>
                <div className="card-buy">
                  <stripe-buy-button
                    buy-button-id={props.buyId}
                    publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
                  >
                  </stripe-buy-button>
                </div>
                <img className="app-stripe" src={stripe} alt="Powered by Stripe"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
