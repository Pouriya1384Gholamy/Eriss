import React from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../../data/products'

import Header from '../../Components/layout/Header'
import UnderHeader from '../../Components/layout/UnderHeader'
import Details from './Components/Details'
import Footer from '../../Components/layout/Footer'

function Product() {
  const { id } = useParams()

  const currentProduct = products.find(
    (item) => item.id === Number(id)
  )

  if (!currentProduct) {
    return <div>محصول پیدا نشد</div>
  }

  return (
    <div className='bg-background'>
      <Header />
      <UnderHeader />
      <Details product={currentProduct} />
      <Footer />
    </div>
  )
}

export default Product
