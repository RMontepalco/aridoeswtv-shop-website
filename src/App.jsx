import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";

import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import ProductsPage from './components/ProductsPage/ProductsPage'
import Card from './components/Card/Card'
import ContactPage from './components/ContactPage/ContactPage'
import CartPage from './components/CartPage/CartPage'
import db from './firebase.js'
import './App.css'

import aliens from '/aliens.gif'
import butterfly from '/butterfly.png'
import catBlue from '/cat-blue.gif'
import catYellow from '/cat-yellow.png'
import clown from '/clown.png'
import connection from '/connection.gif'
import drown from '/drown.gif'
import existing from '/existing.gif'
import girlDance from '/girl-dance.png'
import girlSit from '/girl-sit.png'
import joke from '/joke.gif'
import stardust from '/stardust.gif'
import thankYou from '/thank-you.gif'
import welcome from '/welcome.gif'

export default function App() {
  // Initiate or load cart from localStorage
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"))

  // Store products from database
  const [products, setProducts] = useState([])

  // Render page with cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log("cart rendered")
  }, [cart])

  // Add item to cart
  // TO DO: Increase item quantity when at least one item already in cart
  // TO DO: Add feedback when customer adds item to cart
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
    alert(`${item.name} added to cart`)
  }

  // Remove item from cart
  function removeFromCart(index) {
    setCart(prevCart => prevCart.filter((item, i) => i !== index))
  }

  // Retrieve products from database
  const getProducts = async (product) => {
    if (product !== "") {
      setProducts([])
      let querySnapshot = await getDocs(collection(db, "shop", "products", product));
      let queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setProducts(queryMap)
    }
  }

  // Map products
  const productsData = products.map(product => {
    return <Card
      key={product.id}
      buyId={product.buyId}
      priceId={product.priceId}
      name={product.name}
      description={product.description}
      image={product.image}
      price={product.price}
      cart={cart}
      addToCart={addToCart}
    />
  })

  return (
    <div className="app">
      <div className="app-sidebar">
        <img className="app-girl-dance" src={girlDance} alt="Girl dancing"/>
        <div className="app-collage">
          <img className="app-cat-yellow" src={catYellow} alt="Yellow Cat"/>
          <img src={clown} alt="Clown"/>
          <img src={butterfly} alt="Butterfly"/>
        </div>
        <img src={catBlue} alt="Blue cat"/>
      </div>
      <div className="app-content">
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage getProducts={getProducts} productsData={productsData} />}/>
          <Route path="/products" element={<ProductsPage cart={cart} addToCart={addToCart} getProducts={getProducts} productsData={productsData} />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />}/>
        </Routes>
        <div className="footer">
          <img src={welcome} alt="Welcome to aridoeswtv's shop!"/>
          <img src={thankYou} alt="Thank you for supporting"/>
          <img src={connection} alt="We have a connection"/>
        </div>
      </div>
      <div className="app-sidebar">
        <img src={drown} alt="Drown it all out"/>
        <img src={stardust} alt="Made of stardust"/>
        <img src={aliens} alt="Do you believe in aliens?"/>
        <img src={joke} alt="Congratulations!"/>
        <img src={existing} alt="Thank you for existing"/>
        <img className="app-girl-sit" src={girlSit} alt="Girl sitting"/>
      </div>
    </div>
  )
}
