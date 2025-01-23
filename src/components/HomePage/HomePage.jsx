import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";

import db from '../../firebase.js'
import Card from '../Card/Card'

import hamsterUfo from '/hamster-ufo.png'
import girlSit from '/girl-sit.png'

import './HomePage.css'

export default function HomePage() {
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
      <img className="girl-sit" src={girlSit} alt="girl-sit"/>
      <div className="headlines">
        <div className="intro">
          <p>
            hello! my name is arielle and i make silly art that my brain comes up with :)
          </p>
        </div>
        <div className="announcement">
          <p>
            <u>upcoming events!</u>
          </p>
          <p>
            ongoing giveaway on my insta :)
          </p>
        </div>
        <img className="hamster-ufo" src={hamsterUfo} alt="hamster-ufo"/>
      </div>
      <div className="new-products">
        <div className="new-products-data">
          {productsData}
        </div>
      </div>
    </div>
  )
}
