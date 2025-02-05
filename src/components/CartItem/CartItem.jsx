import { useEffect, useState } from 'react'

import close from '/x.svg'

import './CartItem.css'

export default function CartItem(props) {
  return (
    <div className="cart-item">
      <img className="cart-image" src={props.image} alt="Item image"/>
      <div className="cart-info">
        <p>{props.name}</p>
        <p>${props.price} SGD</p>
      </div>
      <p className="cart-quantity">{props.quantity}</p>
      <p className="cart-price">${props.price} SGD</p>
      <img className="cart-remove" onClick={() => props.removeFromCart(props.index)} src={close} alt="Close button" tabIndex="0"/>
    </div>
  )
}
