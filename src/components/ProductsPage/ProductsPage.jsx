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

  const categories = ["keychains", "pins", "stickers", "prints", "accessories"]
  const categoriesCards = categories.map(category => {
    return <div className="products-category-card" onClick={() => changeCategory(category)}>
        <img src="/product-image.png" alt="Product Image"/>
        <h2>{category}</h2>
    </div>
  })

  return (
    <div className="products">
      <h2 className="products-header">{category}</h2>
      <div className="products-categories" style={categoryStyles}>
        {categoriesCards}
      </div>
      <div className="products-list" style={productStyles}>
        <div className="app-button products-back" onClick={() => changeCategory("")}>back</div>
        <div className="products-data">
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
          {props.productsData}
        </div>
      </div>
    </div>
  )
}
