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
  // Initiate or load cart items from localStorage
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, setCart] = useState(cartLocalStorage)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Remove an item from cart
  function removeFromCart(index) {
    setCart(prevCart => prevCart.filter((item, i) => i !== index))
  }

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/products" element={<ProductsPage />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/cart" element={<CartPage
          cartLocalStorage={cartLocalStorage}
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
