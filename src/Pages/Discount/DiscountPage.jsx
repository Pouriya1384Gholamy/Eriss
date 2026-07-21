import React from 'react'
import Header from '../../Components/layout/Header'
import UnderHeader from '../../Components/layout/UnderHeader'
import Dis from './Components/Dis'
import Pagination from './Components/Pagination'
import Footer from '../../Components/layout/Footer'

function DiscountPage() {
  return (
    <>
      <Header />
      <UnderHeader />
      <Dis />
      <Pagination />
      <Footer />
    </>
  )
}

export default DiscountPage