import React from 'react'
import Header from '../../Components/layout/Header'
import UnderHeader from '../../Components/layout/UnderHeader'
import Details from './Components/Details'
import ProductHero from './Components/ProductHero'
import ProductDetails from './Components/ProductDetails'
import Hello from './Components/Hello'
import Footer from '../../Components/layout/Footer'

function Product() {
  return (
    <div className='bg-background'>
        <Header />
        <UnderHeader />
        <Details />
        <ProductHero />
        <ProductDetails />
        <Hello />
        <Footer />
    </div>
  )
}

export default Product