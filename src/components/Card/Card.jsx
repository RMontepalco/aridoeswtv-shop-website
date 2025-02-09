import { useEffect, useState } from 'react'
import Stripe from 'stripe'

import close from '/icons/x.svg'

import './Card.css'

export default function Card(props) {
  // Initialize Stripe API
  const stripe = Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY)

  // Store state of body scroll
  const [bodyScroll, setBodyScroll] = useState(true)

  // Store state of card overlay display
  const [overlay, setOverlay] = useState({display: "none"})

  // Store state of item quantity to add to cart
  const [quantity, setQuantity] = useState(1)

  // Store state of card inventory status
  const [soldOut, setSoldOut] = useState({display: "none"})

  // Enable or disable add to cart button
  const [disableAdd, setDisableAdd] = useState({display: "flex"})

  // Render inventory status of each product
  useEffect(() => {
    checkStock()
  }, [])

  // Toggle card overlay
  function toggleCardOverlay() {
    setOverlay(prevOverlay => prevOverlay.display === "none" ? {display: "flex"} : {display: "none"})

    // TO DO: prevent body scroll on mobile
    setBodyScroll(prevBodyScroll =>{
      prevBodyScroll ? document.body.classList.add("card-prevent-scroll") : document.body.classList.remove("card-prevent-scroll")
      return !prevBodyScroll
    })
  }

  // Adjust item quantity to add to cart
  function adjustQuantity(amount) {
    setQuantity(prevQuantity => {
      let newQuantity = prevQuantity += amount
      if (newQuantity <= 0) return 1
      return newQuantity
    })
  }

  // Check if item is in stock
  async function checkStock() {
    try {
      const product = await stripe.products.retrieve(props.productId)
      if (!product.active) {
        setSoldOut({display: "flex"})
        setDisableAdd({display: "none"})
      }
    } catch (e) {
      console.error("Error retrieving price:", e)
    }
  }

  return (
    <div>
      <div className="card" onClick={toggleCardOverlay} tabIndex="0">
        <img src={`products/${props.image}`} alt="Product Image"/>
        <p>{props.name}</p>
        <p>${props.price.toFixed(2)} SGD</p>
        <p style={soldOut}>sold out</p>
      </div>
      <div className="card-overlay-container" style={overlay}>
        <div className="card-overlay-background" onClick={toggleCardOverlay}></div>
        <div className="card-overlay">
          <img className="app-button card-close" src={close} alt="Close Button" onClick={toggleCardOverlay} tabIndex="0"/>
          <div className="card-overlay-image">
            <img src={`products/${props.image}`} alt="Product Image"/>
          </div>
          <div className="card-overlay-info">
            <div style={{display: "flex", flexDirection: "column"}}>
              <h2>{props.name}</h2>
              <h3>${props.price.toFixed(2)} SGD</h3>
            </div>
            <p>{props.description}</p>
            <div className="card-add-to-cart">
              <p style={soldOut}>sold out</p>
              <div className="card-quantity" style={disableAdd}>
                <div className="app-button app-adjust" onClick={() => {adjustQuantity(-1)}}><p>-</p></div>
                <p>{quantity}</p>
                <div className="app-button app-adjust" onClick={() => {adjustQuantity(1)}}><p>+</p></div>
              </div>
              <div className="app-button card-add" style={disableAdd} onClick={() => {
                props.addToCart(props, quantity)
                setQuantity(1)
                toggleCardOverlay()
              }}>
                <p>add to cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
