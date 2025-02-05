import { useState, useEffect } from 'react'

import './ProductsPage.css'

export default function ProductsPage(props) {
  // Store product category, product name, and array of products
  const [category, setCategory] = useState("products")
  const [product, setProduct] = useState("")
  const [products, setProducts] = useState([])

  // Store state of product categories and product list
  const [categoryStyles, setCategoryStyles] = useState({display: "flex"})
  const [productStyles, setProductStyles] = useState({display: "none"})

  // Render page with products
  useEffect(() => {
    props.getProducts(product)
    console.log("products rendered")
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
        <div className="products-list">{props.productsData}</div>
      </div>
    </div>
  )
}
