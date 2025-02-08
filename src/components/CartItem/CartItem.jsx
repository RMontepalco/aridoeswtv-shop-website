import { useEffect, useState } from 'react'

import './CartItem.css'

import close from '/icons/x.svg'

export default function CartItem(props) {
  return (
    <div className="cart-item">
      <div className="cart-info">
        <img className="cart-image" src={`products/${props.image}`} alt="Item image"/>
        <div className="cart-text">
          <p>{props.name}</p>
          <p>${props.price.toFixed(2)} SGD</p>
        </div>
      </div>
      <div className="cart-quantity">
        <p className="cart-mobile-header">quantity:&nbsp;</p>
        <div className="app-button app-adjust" onClick={() => {props.adjustQuantity(props.productId, -1)}}><p>-</p></div>
        <p>{props.quantity}</p>
        <div className="app-button app-adjust" onClick={() => {props.adjustQuantity(props.productId, 1)}}><p>+</p></div>
        </div>
      <div className="cart-total">
        <p className="cart-mobile-header">total:&nbsp;</p>
        <p>${(props.price * props.quantity).toFixed(2)}&nbsp;SGD</p>
        <img className="app-button cart-remove" onClick={() => props.removeFromCart(props.index)} src={close} alt="Close button" tabIndex="0"/>
      </div>
    </div>
  )
}
