import { useState } from 'react'
import close from '/x.svg'
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
        <img className="card-image" src={props.image} alt="Product Image"/>
        <div className="card-info">
          <p>{props.name}</p>
          <p>{props.price}</p>
        </div>
      </div>
      <div className="card-overlay-container" style={styles}>
        <div className="card-overlay-background" onClick={toggleCardOverlay}></div>
        <div className="card-overlay">
          <img className="card-overlay-image" src={props.image} alt="Product Image"/>
          <div className="card-overlay-info">
            <h2>{props.name}</h2>
            <h3>{props.price}</h3>
            <p>{props.description}</p>
            <stripe-buy-button
              buy-button-id={props.buyId}
              publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
            >
            </stripe-buy-button>
          </div>
          <img className="close-button" src={close} alt="Close Button" 
            onClick={toggleCardOverlay} tabIndex="0"/>
        </div>
      </div>
    </div>
  )
}
