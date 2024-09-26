import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import db from '../../firebase.js'
import Card from '../Card/Card'
import './ProductsPage.css'

export default function ProductsPage() {

  // Categorize and store products
  const category = useLocation().state.category
  const product = useLocation().state.product
  const [products, setProducts] = useState([])

  // Retrieve data from database and set it to state
  // TO DO: Products page should display all products
  // TO DO: Optimize database retrievals (lazy loading)
  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, product));
    const products = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setProducts(products)
  }

  // Run effect on initial page render, rerun when product category is selected
  useEffect(() => {
    getProducts()
  }, [product])

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
      <h1>{category}</h1>
      <div className="products-data">
        {productsData}
      </div>
    </div>
  )
}
