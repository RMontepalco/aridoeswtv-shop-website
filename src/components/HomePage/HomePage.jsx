import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
      <div className="headlines">
        <div className="intro">
          <p>hello! my name is arielle and i make silly art that my brain comes up with :)</p>
        </div>
        <div className="announcement">
          <p><u>upcoming events!</u></p>

          {
            // TO DO: Add announcements to database
          }
          <p>ongoing giveaway on my insta :)</p>

        </div>
        <img className="hamster-ufo" src={hamsterUfo} alt="Hamster in a UFO"/>
      </div>

      {
        // TO DO: Make new products into a carousel
      }
      <div className="new-products">
        <div className="new-products-data">
          {props.productsData}
        </div>
      </div>

    </div>
  )
}
