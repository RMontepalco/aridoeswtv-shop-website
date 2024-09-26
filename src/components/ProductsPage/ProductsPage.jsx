import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import db from '../../firebase.js'
import Card from '../Card/Card'
import './ProductsPage.css'

export default function ProductsPage() {

  // Store product category, product name, and array of products
  const category = useLocation().state ? useLocation().state.category : "All Products"
  const product = useLocation().state ? useLocation().state.product : "products"
  const [products, setProducts] = useState([])

  // Retrieve products from database and set it to state
  const getProducts = async () => {
    // TO DO: Find a better way to retrieve all products
    if (product === "products") {
      let allQueryMap = []
      let querySnapshot = await getDocs(collection(db, "shop", "products", "hairclips"));
      let queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      allQueryMap.push(...queryMap)
      querySnapshot = await getDocs(collection(db, "shop", "products", "jewlery"));
      queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      allQueryMap.push(...queryMap)
      querySnapshot = await getDocs(collection(db, "shop", "products", "keychains"));
      queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      allQueryMap.push(...queryMap)
      querySnapshot = await getDocs(collection(db, "shop", "products", "prints"));
      queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      allQueryMap.push(...queryMap)
      querySnapshot = await getDocs(collection(db, "shop", "products", "stickers"));
      queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      allQueryMap.push(...queryMap)
      querySnapshot = await getDocs(collection(db, "shop", "products", "misc"));
      queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      allQueryMap.push(...queryMap)
      setProducts(allQueryMap)
    } else {
      const querySnapshot = await getDocs(collection(db, "shop", "products", product));
      const queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setProducts(queryMap)
    }
  }

  // Run effect on initial page render, rerun when product category is selected
  useEffect(() => {
    getProducts()
  }, [category, product])

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
