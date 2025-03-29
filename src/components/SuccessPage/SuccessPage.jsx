import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './SuccessPage.css'

export default function SuccessPage(props) {
  // Store customer's receipt url
  const [receipt, setReceipt] = useState("")

  // Retrieve list of purchased items from localStorage
  const [purchased, setPurchased] = useState(JSON.parse(localStorage.getItem("purchased") || "[]"))

  // Display cart total
  const [total, setTotal] = useState(0)

  // Empty cart and calculate total of purchased items
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const session_id = query.get("session_id")
    
    // TEST
    //fetch(`http://localhost:3000/success?session_id=${session_id}`, {

    // LIVE
    fetch(`https://aridoeswtv.onrender.com/success?session_id=${session_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(({ url }) => setReceipt(url))
    .catch(e => console.error(e.error))
    props.setCart([])
    localStorage.setItem("purchased", JSON.stringify(purchased))
    let newTotal = 0
    purchased.map(item => newTotal += item.price * item.quantity)
    setTotal(newTotal.toFixed(2))
  }, [])

  // Map purchased items
  let i = -1
  const purchasedData = purchased.map(item => {
    i += 1
    return <div className="success-item" key={i}>

      <div className="success-info">
        <img className="success-image" src={`products/${item.image}`} alt="Item image"/>
        <div className="success-text">
          <p>{item.name}</p>
          <p>${item.price.toFixed(2)} SGD</p>
        </div>
      </div>

      <div className="success-quantity-total">
        <p>{item.quantity} for {(item.price * item.quantity).toFixed(2)} SGD</p>
      </div>

    </div>
  })

  return (
    <div className="success">
      <h2>Yay!</h2>
      <p>Thank you for your support!</p>
      <p>An email recipt will be sent you shortly.</p>
      <p>You can view your receipt below:</p>
      <a className="app-button" style={{width: "115px", height: "30px"}} href={receipt}>open receipt</a>
      <p>You purchased the following items:</p>
      <div className="success-items">
        {purchasedData}
      </div>
      <p>subtotal: ${total} SGD</p>
      <Link className="app-button" to="/" style={{width: "115px", height: "30px"}}>return home< /Link>
    </div>
  )
}
