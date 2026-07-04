import React from 'react'
import Header from '../../Components/layout/Header'
import UnderHeader from '../../Components/layout/UnderHeader'
import CartPage from './Components/CartPage'
import Footer from '../../Components/layout/Footer'


function Cart() {
  return (
    <div className='bg-background'>
    <Header />
    <UnderHeader />
    <CartPage />
    <Footer />
    </div>
  )
}

export default Cart