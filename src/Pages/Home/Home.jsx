import React from 'react'
import Header from '../../Components/layout/Header'
import UnderHeader from '../../Components/layout/UnderHeader'
import HeroSection from './Components/HeroSection'
import CategoryItem from './Components/CategoryItem'
import FeaturedProducts from './Components/FeaturedProducts'
import Banner from './Components/Banner'
import NewProduct from './Components/NewProduct'
import Discount from './Components/Discount'
import CreativleyProduct from './Components/CreativleyProduct'
import FAQ from './Components/FAQ'
import BlogSection from './Components/BlogSection'
import Footer from '../../Components/layout/Footer'

function Home() {
  return (
    <>
        <Header />
        <UnderHeader />
        <HeroSection />
        <CategoryItem />
        <FeaturedProducts />
        <Banner />
        <NewProduct />
        <Discount />
        <CreativleyProduct />
        <FAQ />
        <BlogSection />
        <Footer />
    </>
  )
}

export default Home