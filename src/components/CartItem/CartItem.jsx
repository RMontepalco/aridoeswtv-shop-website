import { useEffect, useState } from 'react'

import close from '/x.svg'

import './CartItem.css'

export default function CartItem(props) {
  return (
    <div className="cart-item">
      <img className="cart-image" src={props.image}/>
      <div className="cart-info">
        <p>{props.name}</p>
        <p>{props.description}</p>
      </div>
      <p className="cart-price">{props.quantity}</p>
      <p className="cart-price">${props.price} SGD</p>
      <img onClick={() => props.removeFromCart(props.index)} className="cart-remove" src={close} alt="Close Button" tabIndex="0"/>
    </div>
  )
}
