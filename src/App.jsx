import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import ContactPage from './components/ContactPage/ContactPage'
import './App.css'

export default function App() {
  return (
    <div className="app">
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/contact" element={<ContactPage />}/>
      </Routes>
    </div>
  )
}
