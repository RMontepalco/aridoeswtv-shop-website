import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";

import db from '../../firebase.js'
import Card from '../Card/Card'

import './ProductsPage.css'

export default function ProductsPage() {

  // Store product category, product name, and array of products
  const [category, setCategory] = useState("products")
  const [product, setProduct] = useState("")
  const [products, setProducts] = useState([])

  // Store state of product categories and product list
  const [categoryStyles, setCategoryStyles] = useState({display: "flex"})
  const [productStyles, setProductStyles] = useState({display: "none"})

  // Retrieve products from database and set it to state
  const getProducts = async () => {
    if (product) {
      const querySnapshot = await getDocs(collection(db, "shop", "products", product));
      const queryMap = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setProducts(queryMap)
    }
  }

  // Run effect on initial page render, rerun when product category is selected
  useEffect(() => {
    getProducts()
  }, [product])

  function changeCategory(newCategory) {
    if (newCategory) {
      setCategory(newCategory)
      setProduct(newCategory)
      setCategoryStyles({display: "none"})
      setProductStyles({display: "flex"})
    } else {
      setCategory("products")
      setProduct("")
      setProducts([])
      setCategoryStyles({display: "flex"})
      setProductStyles({display: "none"})
    }
  }

  // Map and render products
  const productsData = products.map(product => {
    return <Card
      key={product.id}
      buyId={product.buyId}
      name={product.name}
      description={product.description}
      image={product.image}
      price={product.price}
    />
  })

  return (
    <div className="products">
      <h1>{category}</h1>
      <div className="categories" style={categoryStyles}>
      {
        // TO DO: Create cards for product categories
      }
        <button onClick={() => changeCategory("keychains")}>keychains</button>
        <button onClick={() => changeCategory("pins")}>pins</button>
        <button onClick={() => changeCategory("stickers")}>stickers</button>
        <button onClick={() => changeCategory("prints")}>prints</button>
        <button onClick={() => changeCategory("accessories")}>accessories</button>
      </div>
      <div className="products-data" style={productStyles}>
        <button onClick={() => changeCategory("")}>back</button>
        <div className="products-list">{productsData}</div>
      </div>
    </div>
  )
}
