import { useEffect, useState } from 'react'

import CartItem from '../CartItem/CartItem'
import './CartPage.css'

import stripe from '/icons/stripe.svg'

export default function CartPage(props) {
  // Display cart total
  const [total, setTotal] = useState(0)

  // Store cart to localStorage and calculate cart total
  useEffect(() => {
    let newTotal = 0
    props.cart.map(item => newTotal += item.price * item.quantity)
    setTotal(newTotal.toFixed(2))
  }, [props.cart])

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
        <div className="app-button cart-check-out-button"onClick={props.checkOut}>Check Out</div>
        <img className="app-stripe" src={stripe} alt="Powered by Stripe"/>
      </div>
    </div>
  )
}
