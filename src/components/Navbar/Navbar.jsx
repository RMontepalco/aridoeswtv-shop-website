import { Link } from 'react-router-dom'

import './Navbar.css'

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="navbar-banner">
        <h1>welcome to aridoeswtv's shop</h1>
      </div>
      <div className="navbar-buttons">
        <Link className="app-button" to="/">home</Link>
        <Link className="app-button" to="/products">products</Link>
        <Link className="app-button" to="/contact">contact</Link>
        <Link className="app-button" to="/cart">cart ({props.cart.length})</Link>
      </div>
    </nav>
  )
}
