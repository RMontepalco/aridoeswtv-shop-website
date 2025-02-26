import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";

import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import ProductsPage from './components/ProductsPage/ProductsPage'
import Card from './components/Card/Card'
import ContactPage from './components/ContactPage/ContactPage'
import CartPage from './components/CartPage/CartPage'
import SuccessPage from './components/SuccessPage/SuccessPage'
import db from './firebase.js'
import './App.css'

import aliens from '/gifs/aliens.gif'
import butterfly from '/images/butterfly.png'
import catBlue from '/gifs/cat-blue.gif'
import catYellow from '/images/cat-yellow.png'
import clown from '/images/clown.png'
import connection from '/gifs/connection.gif'
import drown from '/gifs/drown.gif'
import existing from '/gifs/existing.gif'
import girlDance from '/images/girl-dance.png'
import girlSit from '/images/girl-sit.png'
import joke from '/gifs/joke.gif'
import stardust from '/gifs/stardust.gif'
import thankYou from '/gifs/thank-you.gif'
import welcome from '/gifs/welcome.gif'

export default function App() {
  // Initiate or load cart from localStorage
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"))

  // Store products from database
  const [products, setProducts] = useState([])

  // Display number of items in cart
  const [count, setCount] = useState(0)

  // Render page with cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    countItems()
    console.log("cart rendered")
  }, [cart])

  // Add item to cart
  function addToCart(item, quantity) {
    let index = cart.findIndex(i => i.productId === item.productId);
    if (index === -1) {
      setCart(prevCart => [...prevCart, {
        productId: item.productId,
        priceId: item.priceId,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        quantity: quantity
      }])
      // alert(`${item.name} added to cart`)
    } else {
      setCart(prevCart => {
        let newCart = [...prevCart]
        let newItem = newCart[index]
        newItem.quantity += quantity
        newCart[index] = newItem
        return newCart
      })
      //alert(`${item.name} added to cart again`)
    }
  }

  // Remove item from cart
  function removeFromCart(index) {
    setCart(prevCart => prevCart.filter((item, i) => i !== index))
  }

  // Adjust item quantity in cart
  function adjustQuantity(productId, amount) {
    let index = cart.findIndex(i => i.productId === productId);
    setCart(prevCart => {
      let newCart = [...prevCart]
      let newItem = newCart[index]
      newItem.quantity += amount
      if (newItem.quantity <= 0) {
        newItem.quantity = 1
        return prevCart
      }
      newCart[index] = newItem
      return newCart
    })
  }

  // Calculate total number of items in cart
  function countItems() {
    let newCount = 0;
    cart.map(item => newCount += item.quantity)
    setCount(newCount)
  }

  // Retrieve products from database
  const getProducts = async (product) => {
    if (product !== "") {
      setProducts([])
      let querySnapshot = await getDocs(collection(db, "shop", "products", product));
      let queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      queryMap.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      if (queryMap.length === 0) {
      } else {
        setProducts(queryMap)
      }
    }
  }

  // Take customer and cart to Stripe Hosted Checkout Page
  function checkOut() {
    // Check if cart is empty
    if (cart.length === 0) {
      alert("Cart is empty")
      return
    }

    // Map and parse cart for POST request
    const lineItems = cart.map(item => {
      return {
        price: item.priceId,
        quantity: item.quantity
      }
    })

    // Initiate POST request to Render server
    // TO DO: Feedback when clicking on check out

    // TEST
    //fetch("http://localhost:3000/create-checkout-session", {

    // LIVE
    fetch("https://aridoeswtv.onrender.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({items: lineItems}),
    })
    .then(res => {
      if (res.ok) {
        // alert("res ok")
        return res.json()
      }
      // alert("res not ok")
      return res.json().then(e => Promise.reject(e))
    })
    .then(({ url }) => {
      localStorage.setItem("purchased", JSON.stringify(cart))
      // alert("Redirecting you to Stripe...")
      window.location = url
    })
    .catch(e => {
      alert(e.error)
      console.error(e.error)
    })
  }

  // Map products
  const productsData = products.map(product => {
    return <Card
      key={product.id}
      productId={product.productId}
      priceId={product.priceId}
      name={product.name}
      price={product.price}
      description={product.description}
      image={product.image}
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
        <Navbar cart={cart} count={count} />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/products" element={<ProductsPage cart={cart} addToCart={addToCart} getProducts={getProducts} productsData={productsData} />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/cart" element={<CartPage cart={cart} adjustQuantity={adjustQuantity} removeFromCart={removeFromCart} checkOut={checkOut}/>}/>
          <Route path="/success" element={<SuccessPage setCart={setCart}/>}/>
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
        <img src={joke} alt="Congratulations!" style={{cursor: "pointer"}} onClick={() => {alert(`You actually clicked it???\nwell i guess you should get something.....\ncomment "gotcha" in the comment box at check out for a free sticker with your purchase!`)}}/>
        <img src={existing} alt="Thank you for existing"/>
        <img className="app-girl-sit" src={girlSit} alt="Girl sitting"/>
      </div>
    </div>
  )
}
