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
        <Link className="products-button"to="/products" state={{product: 'products', category: 'All Products'}}>
          Products <div className="chevron"></div>
        </Link>

        <div className="products-dropdown-content">
          <Link to="/products" state={{product: 'hairclips', category: 'Hairclips'}}>Hairclips</Link>
          <Link to="/products" state={{product: 'jewlery', category: 'Jewlery'}}>Jewlery</Link>
          <Link to="/products" state={{product: 'keychains', category: 'Keychains'}}>Keychains</Link>
          <Link to="/products" state={{product: 'prints', category: 'Prints'}}>Prints</Link>
          <Link to="/products" state={{product: 'stickers', category: 'Stickers'}}>Stickers</Link>
          <Link to="/products" state={{product: 'misc', category: 'Miscellaneous'}}>Misc.</Link>
        </div>
      </div>

      <Link to="/contact">Contact</Link>
    </nav>
  )
}
