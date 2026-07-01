import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "../../../Components/ui/Slider"
import { products } from '../../../data/products'
import { GiWoodBeam } from "react-icons/gi";
import { FaStar, FaTelegram, FaWhatsapp, FaInstagram, FaShoppingBag } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlinePriceChange } from "react-icons/md";

function ProductHero() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  
  // State برای شمارنده
  const [count, setCount] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isBulk, setIsBulk] = useState(false)

  if (!product) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <p className="text-xl text-gray-500">محصول پیدا نشد</p>
    </div>
  )

  // توابع شمارنده
  const increaseCount = () => {
    if (count < (product.stock || 10)) {
      setCount(count + 1)
    }
  }

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  // تابع فرمت ابعاد
  const formatDimensions = (dim) => {
    if (!dim) return '---'
    if (typeof dim === 'object') {
      return `${dim.width} × ${dim.depth} × ${dim.height} سانتی‌متر`
    }
    return dim
  }

  // تابع اشتراک‌گذاری
  const shareProduct = (platform) => {
    const url = window.location.href
    const text = `${product.title} - قیمت: ${product.price?.toLocaleString()} تومان`
    
    const shareLinks = {
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      instagram: `https://www.instagram.com/`,
    }
    
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  // محاسبه قیمت با تخفیف عمده
  const getPrice = () => {
    let price = product.price || 0
    if (isBulk && product.bulkDiscount) {
      price = price * (1 - product.bulkDiscount / 100)
    }
    return price
  }

  return (
    <section className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6'>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
        
        {/* اسلایدر */}
        <article className='w-full lg:w-[42%] xl:w-[40%]'>
          <div className="sticky top-4 bg-white rounded-2xl shadow-lg overflow-hidden">
            <Slider />
          </div>
        </article>

        {/* اطلاعات محصول */}
        <article className='w-full lg:w-[58%] xl:w-[60%]'>
          <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
            
            {/* بخش بالایی - اطلاعات اصلی */}
            <div className='p-4 sm:p-5 lg:p-6'>
              {/* هدر */}
              <div className='flex justify-between items-start gap-3'>
                <h1 className='text-base sm:text-lg md:text-xl font-bold text-gray-800 flex-1 leading-relaxed'>
                  {product.title}
                </h1>
                <GiWoodBeam className="flex-shrink-0 mt-1" color="#9EAD8C" size={24} />
              </div>

              <div className='border-b border-gray-200 my-3'></div>

              {/* ستاره‌ها و موجودی */}
              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      size={15}
                      className={index < product.rating ? "text-yellow-400" : "text-gray-200"}
                    />
                  ))}
                  <span className="text-xs text-gray-500 mr-1">({product.rating || 0})</span>
                </div>
                
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  product.stockStatus === 'موجود' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.stockStatus || 'موجود'}
                </span>
              </div>

              {/* توضیحات */}
              <div className='mt-4'>
                <span className='text-xs text-gray-400 font-medium'>توضیحات کوتاه</span>
                <p className='text-sm text-gray-700 leading-relaxed mt-1 line-clamp-3'>
                  {product.description}
                </p>
              </div>

              {/* اطلاعات تکمیلی */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100'>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-gray-400'>شناسه محصول :</span>
                  <span className='text-sm text-primary font-semibold'>{product.shareCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-gray-400'>آخرین بروزرسانی :</span>
                  <span className='text-sm text-primary font-semibold'>{product.publishDate}</span>
                </div>
              </div>

              {/* اشتراک‌گذاری */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <span className='text-xs text-gray-400 font-medium'>اشتراک گذاری :</span>
                <div className="flex gap-2">
                  <button onClick={() => shareProduct('telegram')} className="p-1.5 bg-green-50 hover:bg-green-100 rounded-full transition-all duration-300 hover:scale-110">
                    <FaTelegram className="text-[#26A5E4] text-lg" />
                  </button>
                  <button onClick={() => shareProduct('whatsapp')} className="p-1.5 bg-green-50 hover:bg-green-100 rounded-full transition-all duration-300 hover:scale-110">
                    <FaWhatsapp className="text-[#25D366] text-lg" />
                  </button>
                  <button onClick={() => shareProduct('instagram')} className="p-1.5 bg-pink-50 hover:bg-pink-100 rounded-full transition-all duration-300 hover:scale-110">
                    <FaInstagram className="text-[#E4405F] text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* بخش پایینی - پرداخت */}
            <div className='bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 lg:p-6 border-t border-gray-200'>
              
              {/* هدر بخش پرداخت */}
              <div className='flex items-center gap-2 mb-4'>
                <FaShoppingBag className='text-primary text-lg' />
                <p className='text-sm text-primary font-medium'>خرید اینترنتی از فروشگاه اریس وود</p>
              </div>

              <div className='border-b border-gray-200 mb-4'></div>

              {/* مشخصات محصول */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-gray-400'>ابعاد :</span>
                  <span className='text-sm font-medium text-gray-700'>
                    {formatDimensions(product.dimensions)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-gray-400'>زمان آماده‌سازی :</span>
                  <span className='text-sm font-medium text-gray-700'>{product.prepTime || '---'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-gray-400'>گارانتی :</span>
                  <span className='text-sm font-medium text-gray-700'>{product.guarantee || '---'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-gray-400'>رنگ‌ها :</span>
                  <div className="flex gap-1.5">
                    {Array.isArray(product.colors) && product.colors.length > 0 ? (
                      product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(index)}
                          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                            selectedColor === index 
                              ? 'border-primary scale-110 shadow-md' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))
                    ) : (
                      <span className='text-sm font-medium text-gray-700'>{product.colors || '---'}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* قیمت */}
              <div className='flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-4'>
                <div className="flex items-center gap-2">
                  <MdOutlinePriceChange className="text-primary text-xl" />
                  <span className='text-xs text-gray-400'>قیمت :</span>
                </div>
                <div className="text-left">
                  <span className='text-xl font-bold text-primary'>
                    {getPrice().toLocaleString()} 
                  </span>
                  <span className='text-sm text-gray-400 mr-1'>تومان</span>
                  {isBulk && product.bulkDiscount && (
                    <span className='block text-xs text-green-600'>
                      {product.bulkDiscount}٪ تخفیف عمده
                    </span>
                  )}
                </div>
              </div>

              {/* عمده فروشی */}
              <div className='flex items-center gap-3 mb-4 p-2 bg-blue-50/50 rounded-lg border border-blue-100'>
                <label className="relative flex items-center cursor-pointer group flex-shrink-0">
                  <input 
                    type="checkbox" 
                    id="bulkPurchase"
                    className="sr-only peer"
                    checked={isBulk}
                    onChange={() => setIsBulk(!isBulk)}
                  />
                  <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                    isBulk 
                      ? 'bg-primary border-primary shadow-md' 
                      : 'border-gray-300 group-hover:border-primary'
                  }`}>
                    <svg className={`w-3 h-3 text-white transition-opacity ${
                      isBulk ? 'opacity-100' : 'opacity-0'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </label>
                <label htmlFor="bulkPurchase" className='text-sm text-gray-700 cursor-pointer select-none font-medium'>
                  خرید به صورت عمده
                </label>
                {product.bulkAvailable && (
                  <span className='text-xs text-white bg-green-500 px-2 py-0.5 rounded-full'>
                    موجود
                  </span>
                )}
                {product.bulkDiscount && (
                  <span className='text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-200'>
                    {product.bulkDiscount}٪
                  </span>
                )}
              </div>

              {/* دکمه‌ها */}
              <div className='flex flex-col sm:flex-row items-center gap-3'>
                {/* شمارنده */}
                <div className='flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0'>
                  <button 
                    className='w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={decreaseCount}
                    disabled={count <= 1}
                  >
                    <AiOutlineMinus size={18} />
                  </button>
                  <span className='w-14 text-center font-bold text-gray-800 text-lg'>{count}</span>
                  <button 
                    className='w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={increaseCount}
                    disabled={count >= (product.stock || 10)}
                  >
                    <AiOutlinePlus size={18} />
                  </button>
                </div>
                
                {/* دکمه خرید */}
                <button className='flex-1 w-[95%] sm:min-w-[180px] bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2'>
                  <FaShoppingBag size={18} />
                  افزودن به سبد خرید
                  <span className="text-xs bg-white/20 w-[50px] h-[50px] px-2 py-4.5 rounded-[10px]">
                    {count}
                  </span>
                </button>
              </div>

              {/* موجودی */}
              <div className="text-center mt-3">
                <span className="text-xs text-gray-400">
                  موجودی: {product.stock || 'نامشخص'} عدد
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ProductHero