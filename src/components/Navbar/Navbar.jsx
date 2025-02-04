import { Link } from 'react-router-dom'

import './Navbar.css'

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="banner">
        <h1>welcome to aridoeswtv's shop</h1>
      </div>
      <div className="navbuttons">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart ({props.cart.length})</Link>
      </div>
    </nav>
  )
}
