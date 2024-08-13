import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import db from '../../firebase.js'
import Card from '../Card/Card'
import './ProductsPage.css'

export default function ProductsPage() {
  // List of database entries
  const [products, setProducts] = useState([])

  // Retrieve data from database and set it to state
  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setProducts(products)
  }

  // Run effect on initial page render
  useEffect(() => {
    getProducts()
  }, [])

  // Map and render products
  const productsData = products.map(product => {
    return <Card
      key={product.id}
      name={product.name}
      description={product.description} 
    />
  })

  return (
    <div className="products">
      <h1>Products Page</h1>
      <div className="products-data">
        {productsData}
      </div>
    </div>
  )
}
