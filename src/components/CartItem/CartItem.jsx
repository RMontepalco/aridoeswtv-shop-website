import { useEffect, useState } from 'react'

import './CartItem.css'

import close from '/x.svg'

export default function CartItem(props) {
  return (
    <div className="cart-item">
      <div className="cart-info">
        <img className="cart-image" src={props.image} alt="Item image"/>
        <div className="cart-text">
          <p>{props.name}</p>
          <p>${props.price} SGD</p>
        </div>
      </div>
      <div className="cart-quantity">
        <p className="cart-mobile-header">quantity:&nbsp;</p>
        <p>{props.quantity}</p>
        </div>
      <div className="cart-total">
        <p className="cart-mobile-header">total:&nbsp;</p>
        <p>${props.price} SGD</p>
        <img className="app-button cart-remove" onClick={() => props.removeFromCart(props.index)} src={close} alt="Close button" tabIndex="0"/>
      </div>
    </div>
  )
}
