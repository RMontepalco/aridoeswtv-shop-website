import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './SuccessPage.css'

export default function SuccessPage(props) {

  // Retrieve list of purchased items from localStorage
  const [purchased, setPurchased] = useState(JSON.parse(localStorage.getItem("purchased") || "[]"))

  // Display cart total
  const [total, setTotal] = useState(0)

  // Empty cart and calculate total of purchased items
  useEffect(() => {
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
        <img className="success-image" src={item.image} alt="Item image"/>
        <div className="success-text">
          <p>{item.name}</p>
          <p>${item.price} SGD</p>
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
      <p>You purchased the following items:</p>
      <div className="success-items">
        {purchasedData}
      </div>
      <p>total: ${total} SGD</p>
      <Link className="app-button" to="/" style={{width: "115px", height: "30px"}}>return home< /Link>
    </div>
  )
}
