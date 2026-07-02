import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import Cart from './Pages/Cart/Cart'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/Cart' element={<Cart />} />
    </Routes>
  )
}

export default App
