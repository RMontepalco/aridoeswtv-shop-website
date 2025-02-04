import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import ProductsPage from './components/ProductsPage/ProductsPage'
import ContactPage from './components/ContactPage/ContactPage'
import CartPage from './components/CartPage/CartPage'

import aliens from '/aliens.gif'
import catBlue from '/cat-blue.gif'
import connection from '/connection.gif'
import drown from '/drown.gif'
import existing from '/existing.gif'
import joke from '/joke.gif'
import stardust from '/stardust.gif'
import thankYou from '/thank-you.gif'
import welcome from '/welcome.gif'

import './App.css'

export default function App() {
  // Initiate or load cart from localStorage
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"))

  // Render page with cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log("app rendered")
  }, [cart])

  // Add item to cart
  // TO DO: Increase item quantity when at least one item already in cart
  function addToCart(item) {
    setCart(prevCart => [...cart, {
      buyId: item.buyId,
      priceId: item.priceId,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      quantity: 1
    }])
  }

  // Remove item from cart
  function removeFromCart(index) {
    setCart(prevCart => prevCart.filter((item, i) => i !== index))
  }

  return (
    <div className="app">
      <Navbar
        cart={cart}
      />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/products" element={<ProductsPage
          cart={cart}
          addToCart={addToCart}
        />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/cart" element={<CartPage
          cart={cart}
          removeFromCart={removeFromCart}
        />}/>
      </Routes>
      <div className="sidebar">
        <img src={drown} alt="drown"/>
        <img src={stardust} alt="stardust"/>
        <img src={aliens} alt="aliens"/>
        <img src={joke} alt="joke"/>
        <img src={existing} alt="existing"/>
        <img src={catBlue} alt="cat-blue"/>
      </div>
      <div className="footer">
        <img src={welcome} alt="welcome"/>
        <img src={thankYou} alt="thank-you"/>
        <img src={connection} alt="connection"/>
      </div>
    </div>
  )
}
