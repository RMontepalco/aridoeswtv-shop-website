import { useState, useEffect } from 'react'

import './HomePage.css'

import hamsterUfo from '/hamster-ufo.png'

export default function HomePage(props) {
  // Render page with products
  useEffect(() => {
    props.getProducts("new")
    console.log("products rendered")
  }, [])

  return (
    <div className="home">
      <div className="home-headlines">
        <div className="home-ellipse home-intro">
          <h2>hello!<br/>my name is arielle and i make silly art that my brain comes up with :)</h2>
        </div>
        <div className="home-ellipse home-announcement">
          <h2><u>upcoming events!</u></h2>
          <ul>
            <li>ongoing giveaway on my insta!</li>
            <li>lorem ipsum thingy placeholder text yeah boom</li>
          </ul>
          <img className="home-hamster-ufo" src={hamsterUfo} alt="Hamster in a UFO"/>
        </div>
      </div>
      <div className="home-carousel">
        <h2>new products!</h2>
        <div className="home-products">
          <img src="/product-image.png" alt="Product image"/>
          <img src="/product-image.png" alt="Product image"/>
          <img src="/product-image.png" alt="Product image"/>
          <img src="/product-image.png" alt="Product image"/>
          <img src="/product-image.png" alt="Product image"/>
        </div>
      </div>
    </div>
  )
}
