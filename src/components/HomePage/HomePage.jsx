import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import db from '../../firebase.js'
import Card from '../Card/Card'
import './HomePage.css'

export default function HomePage() {

  /*
    TO DO: Maybe combine jsx with ProductsPage
  */

  // Store array of products
  const [products, setProducts] = useState([])

  // Retrieve products from database and set it to state
  const getProducts = async () => {
    // TO DO: Find a better way to retrieve all products
    let querySnapshot = await getDocs(collection(db, "shop", "products", "new"));
    let queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setProducts(queryMap)
  }

  // Run effect on initial page render, rerun when product category is selected
  useEffect(() => {
    getProducts()
  }, [products])

  // Map and render products
  const productsData = products.map(product => {
    return <Card
      key={product.id}
      name={product.name}
      description={product.description}
      image={product.image}
      price={product.price}
    />
  })

  return (
    <div className="home">
      <h1 className="header">Welcome to my shop!</h1>
      <div className="headline">
        <h2>Hi, I'm Arielle!</h2>
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit.
          Rutrum dolor facilisis vulputate parturient in lacus cras at? 
          Cubilia per mi donec ridiculus morbi platea urna amet. 
          Eleifend nunc arcu euismod sit porta ligula ligula nascetur. 
          Torquent class magnis sem commodo luctus eu cubilia mauris. 
          Semper praesent consectetur facilisi lorem mi ipsum commodo. 
          Blandit vestibulum mollis donec finibus ornare curae. 
          Convallis at adipiscing euismod gravida bibendum class tincidunt aenean? 
          Feugiat taciti quam eleifend porta pharetra. 
          Senectus odio nullam dapibus mi orci eleifend feugiat.
        </p>
      </div>
      <div className="new-products">
        <h1>New Arrivals</h1>
        <div className="new-products-data">
          {productsData}
        </div>
      </div>
    </div>
  )
}
