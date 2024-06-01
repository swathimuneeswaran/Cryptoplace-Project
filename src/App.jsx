import React from 'react'
import "./index.css"
import {Routes,Route} from "react-router-dom"
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'


const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/coin/:coinId" element={<Coin />}/>
        <Route path="/contact" element={<h1>Contact</h1>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App