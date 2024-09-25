import { Link } from 'react-router-dom'
import chevronCompactDown from '/chevron-compact-down.svg'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>aridoeswtv</h1>
      <Link to="/">Home</Link>

      {/*
        TO DO: Create a Products dropdown menu with the following criteria:
        Clicking Products will display all product categories in one page
        Hovering over Products will display a dropdown menu containing
          Keychains, Hairclips, Jewlery, misc.
        Clicking on a dropdown menu item will only display that category
          of products
      */}
      <div className="products-dropdown-menu">
        <Link className="products-button" to="/products">
          Products <div className="chevron"></div>
        </Link>

        <div className="products-dropdown-content">
          <Link to="/products">Keychains</Link>
          <Link to="/products">Hairclips</Link>
          <Link to="/products">Jewlery</Link>
          <Link to="/products">Prints</Link>
          <Link to="/products">Stickers</Link>
          <Link to="/products">Misc.</Link>
        </div>
      </div>

      <Link to="/contact">Contact</Link>
    </nav>
  )
}
