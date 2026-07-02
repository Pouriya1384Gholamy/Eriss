import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "../../../Components/ui/Slider"
import { products } from '../../../data/products'
import { GiWoodBeam } from "react-icons/gi";
import { FaStar, FaTelegram, FaWhatsapp, FaInstagram, FaShoppingBag, FaTimes, FaTrash } from "react-icons/fa"; 
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlinePriceChange } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";

function ProductHero() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  
  // Stateهای اصلی محصول
  const [count, setCount] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isBulk, setIsBulk] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // 🔥 مدیریت سبد خرید پایدار (Persistent Cart)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('eriss_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🔥 ذخیره خودکار تغییرات سبد خرید در LocalStorage
  useEffect(() => {
    localStorage.setItem('eriss_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  if (!product) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <p className="text-xl text-gray-500">محصول پیدا نشد</p>
    </div>
  )

  const increaseCount = () => { if (count < (product.stock || 10)) setCount(count + 1) }
  const decreaseCount = () => { if (count > 1) setCount(count - 1) }

  const formatDimensions = (dim) => {
    if (!dim) return '---'
    if (typeof dim === 'object') return `${dim.width} × ${dim.depth} × ${dim.height} سانتی‌متر`
    return dim
  }

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

  const getPrice = () => {
    let price = product.price || 0
    if (isBulk && product.bulkDiscount) price = price * (1 - product.bulkDiscount / 100)
    return price
  }

  // 🛠️ افزودن به سبد خرید
  const addToCart = () => {
    const finalPrice = getPrice();
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + count } : item
        );
      }
      return [...prevItems, { ...product, quantity: count, price: finalPrice }];
    });
    setIsCartOpen(true);
  };

  // 🛠️ حذف محصول از سبد خرید
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // 🛠️ تغییر تعداد یک محصول مستقیماً از داخل سبد خرید
  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // محاسبه مجموع کل سبد خرید بر اساس تمامی آیتم‌ها
  const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <section className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 relative' dir="rtl">
      
      {/* 🛒 ══════════════ SIDE CART MENU ══════════════ */}
      {/* لایه تاریک پشت منو */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* بدنه منوی سبد خرید */}
      <div className={`fixed top-0 left-0 h-full w-[320px] sm:w-[380px] bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* هدر */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-primary" />
            <h2 className="text-lg font-black text-stone-800">سبد خرید ({cartItems.length})</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors flex items-center gap-1 text-xs font-bold text-stone-400">
            بستن <FaTimes />
          </button>
        </div>

        {/* محتوای سبد */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-stone-400 mt-10">سبد خرید شما خالی است</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-stone-100 bg-white shadow-sm relative group">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className='absolute top-2 left-3.5 text-stone-300 hover:text-red-500 transition-colors'
                >
                  <HiOutlineTrash size={18} />
                </button>
                <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-stone-800 truncate pr-4">{item.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-stone-50 px-2 py-1 rounded-lg">
                      <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className="text-stone-400 hover:text-stone-750">+</button>
                      <span className="text-xs font-black">{item.quantity}</span>
                      <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} className="text-stone-400 hover:text-stone-755">−</button>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-black text-primary">{(item.price * item.quantity).toLocaleString('fa-IR')}</span>
                      <span className="text-[10px] text-stone-400 mr-1">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* فوتر سبد خرید */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/30">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-bold text-stone-500">مجموع:</span>
            <div className="text-left">
              <span className="text-2xl font-black text-primary">{totalCartPrice.toLocaleString('fa-IR')}</span>
              <span className="text-xs text-stone-400 mr-1">تومان</span>
            </div>
          </div>
          <button disabled={cartItems.length === 0} className="w-full py-4 bg-[#9EAD8C] text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-[#8A9B78] transition-all disabled:bg-stone-300">
            تکمیل سفارش و تسویه حساب
          </button>
        </div>
      </div>

      {/* ══════════════ MAIN CONTENT (کد اصلی شما بدون تغییر) ══════════════ */}
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
            
            <div className='p-4 sm:p-5 lg:p-6'>
              <div className='flex justify-between items-start gap-3'>
                <h1 className='text-base sm:text-lg md:text-xl font-bold text-gray-800 flex-1 leading-relaxed'>{product.title}</h1>
                <GiWoodBeam className="flex-shrink-0 mt-1" color="#9EAD8C" size={24} />
              </div>

              <div className='border-b border-gray-200 my-3'></div>

              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} size={15} className={index < product.rating ? "text-yellow-400" : "text-gray-200"} />
                  ))}
                  <span className="text-xs text-gray-500 mr-1">({product.rating || 0})</span>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${product.stockStatus === 'موجود' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.stockStatus || 'موجود'}
                </span>
              </div>

              <div className='mt-4'>
                <span className='text-xs text-gray-400 font-medium'>توضیحات کوتاه</span>
                <p className='text-sm text-gray-700 leading-relaxed mt-1 line-clamp-3'>{product.description}</p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100'>
                <div className="flex items-center gap-2"><span className='text-xs text-gray-400'>شناسه محصول :</span><span className='text-sm text-primary font-semibold'>{product.shareCode}</span></div>
                <div className="flex items-center gap-2"><span className='text-xs text-gray-400'>آخرین بروزرسانی :</span><span className='text-sm text-primary font-semibold'>{product.publishDate}</span></div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <span className='text-xs text-gray-400 font-medium'>اشتراک گذاری :</span>
                <div className="flex gap-2">
                  <button onClick={() => shareProduct('telegram')} className="p-1.5 bg-green-50 hover:bg-green-100 rounded-full transition-all duration-300 hover:scale-110"><FaTelegram className="text-[#26A5E4] text-lg" /></button>
                  <button onClick={() => shareProduct('whatsapp')} className="p-1.5 bg-green-50 hover:bg-green-100 rounded-full transition-all duration-300 hover:scale-110"><FaWhatsapp className="text-[#25D366] text-lg" /></button>
                  <button onClick={() => shareProduct('instagram')} className="p-1.5 bg-pink-50 hover:bg-pink-100 rounded-full transition-all duration-300 hover:scale-110"><FaInstagram className="text-[#E4405F] text-lg" /></button>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 lg:p-6 border-t border-gray-200'>
              
              <div className='flex items-center gap-2 mb-4'>
                <FaShoppingBag className='text-primary text-lg' />
                <p className='text-sm text-primary font-medium'>خرید اینترنتی از فروشگاه اریس وود</p>
              </div>
              <div className='border-b border-gray-200 mb-4'></div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'>
                <div className="flex items-center gap-2"><span className='text-xs text-gray-400'>ابعاد :</span><span className='text-sm font-medium text-gray-700'>{formatDimensions(product.dimensions)}</span></div>
                <div className="flex items-center gap-2"><span className='text-xs text-gray-400'>زمان آماده‌سازی :</span><span className='text-sm font-medium text-gray-700'>{product.prepTime || '---'}</span></div>
                <div className="flex items-center gap-2"><span className='text-xs text-gray-400'>گارانتی :</span><span className='text-sm font-medium text-gray-700'>{product.guarantee || '---'}</span></div>
                <div className="flex items-center gap-2"><span className='text-xs text-gray-400'>رنگ‌ها :</span>
                  <div className="flex gap-1.5">
                    {Array.isArray(product.colors) && product.colors.map((color, index) => (
                      <button key={index} onClick={() => setSelectedColor(index)} className={`w-6 h-6 rounded-full border-2 ${selectedColor === index ? 'border-primary' : 'border-gray-300'}`} style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-4'>
                <div className="flex items-center gap-2"><MdOutlinePriceChange className="text-primary text-xl" /><span className='text-xs text-gray-400'>قیمت :</span></div>
                <div className="text-left"><span className='text-xl font-bold text-primary'>{getPrice().toLocaleString()}</span><span className='text-sm text-gray-400 mr-1'>تومان</span></div>
              </div>

              <div className='flex items-center gap-3 mb-4 p-2 bg-blue-50/50 rounded-lg border border-blue-100'>
                <input type="checkbox" id="bulkPurchase" className="sr-only peer" checked={isBulk} onChange={() => setIsBulk(!isBulk)} />
                <label htmlFor="bulkPurchase" className='text-sm text-gray-700 cursor-pointer select-none font-medium'>خرید به صورت عمده</label>
              </div>

              <div className='flex flex-col sm:flex-row items-center gap-3'>
                <div className='flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0'>
                  <button className='w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 flex items-center justify-center' onClick={decreaseCount} disabled={count <= 1}><AiOutlineMinus size={18} /></button>
                  <span className='w-14 text-center font-bold text-gray-800 text-lg'>{count}</span>
                  <button className='w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 flex items-center justify-center' onClick={increaseCount} disabled={count >= (product.stock || 10)}><AiOutlinePlus size={18} /></button>
                </div>
                
                {/* دکمه خرید که سبد خرید را باز می‌کند و محصول را اضافه می‌کند */}
                <button 
                  onClick={addToCart}
                  className='flex-1 w-[95%] py-3.5 sm:min-w-[180px] bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                >
                  <FaShoppingBag size={18} />
                  افزودن به سبد خرید
                </button>
              </div>

            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ProductHero;
