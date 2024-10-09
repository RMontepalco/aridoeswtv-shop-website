import { useState } from 'react'
import './Card.css'

export default function Card(props) {

  // Store state of card overlay display
  const [styles, setStyles] = useState({display: "none"})

  // Toggle card overlay
  function toggleCardOverlay() {
    setStyles(prevStyles => prevStyles.display === "none" ? {display: "flex"} : {display: "none"})
  }

  return (
    <div>
      <div className="card">
        <img className="card-image" src={props.image} alt="Product Image" onClick={toggleCardOverlay} tabIndex="0"/>
        <div className="card-info">
          <p>{props.name}</p>
          <p>{props.price}</p>
        </div>
      </div>
      <div className="card-overlay-background" onClick={toggleCardOverlay} style={styles}>
        <div className="card-overlay">
        {/*
          TO DO: add "x" button to close card overlay
        */}
          <img className="card-overlay-image" src={props.image} alt="Product Image"/>
          <div className="card-overlay-info">
            <p>{props.name}</p>
            <p>{props.price}</p>
            <p style={{marginTop: "30px"}}>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
