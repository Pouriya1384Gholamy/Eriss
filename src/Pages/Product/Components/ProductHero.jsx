import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "../../../Components/ui/Slider"
import { products } from '../../../data/products'
import { GiWoodBeam } from "react-icons/gi";
import { FaStar, FaTelegram, FaWhatsapp, FaInstagram, FaShoppingBag, FaTimes } from "react-icons/fa"; 
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

  // مدیریت سبد خرید پایدار (Persistent Cart)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('eriss_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // حل مشکل شروع مجدد از ۱ هنگام تعویض محصول
  useEffect(() => {
    setCount(1);
    setIsBulk(false);
  }, [id]);

  // ذخیره خودکار تغییرات سبد خرید در LocalStorage و اطلاع‌رسانی به هدر
  useEffect(() => {
    localStorage.setItem('eriss_cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event("eriss_cart_updated"));
  }, [cartItems]);

  if (!product) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <p className="text-xl text-[var(--brand-charcoal)]/60 font-bold">محصول پیدا نشد</p>
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

  // افزودن به سبد خرید
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

  // حذف محصول از سبد خرید
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // تغییر تعداد یک محصول مستقیماً از داخل سبد خرید
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
    <section className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-10 relative' dir="rtl">
      
      {/* 🛒 ══════════════ SIDE CART MENU ══════════════ */}
      {/* لایه تاریک پشت منو با رنگ برند */}
      <div 
        className={`fixed inset-0 z-[100] bg-[var(--brand-charcoal)]/60 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* بدنه منوی سبد خرید */}
      <div className={`fixed top-0 left-0 h-full w-[320px] sm:w-[380px] bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* هدر سبد خرید - ترکیب زغالی و طلایی برند */}
        <div className="p-5 border-b border-[var(--brand-taupe)]/20 flex items-center justify-between bg-[var(--brand-charcoal)] text-white">
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-[var(--brand-gold)]" size={18} />
            <h2 className="text-base sm:text-lg font-black tracking-wide">سبد خرید ({cartItems.length})</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="p-2 hover:bg-white/10 hover:text-[var(--brand-gold)] rounded-full transition-all flex items-center gap-1.5 text-xs font-bold text-gray-300"
          >
            بستن <FaTimes />
          </button>
        </div>

        {/* محتوای سبد خرید */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[var(--brand-ivory)]/25">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FaShoppingBag size={40} className="text-[var(--brand-taupe)]/40 mb-3" />
              <p className="text-sm font-bold text-[var(--brand-charcoal)]/50">سبد خرید شما خالی است</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-3 p-3.5 rounded-2xl border border-[var(--brand-taupe)]/20 bg-white shadow-sm relative group hover:border-[var(--brand-gold)]/40 transition-colors"
              >
                {/* دکمه حذف محصول با رنگ برند */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className='absolute top-2 left-3 text-[var(--brand-taupe)] hover:text-red-500 transition-colors'
                  title="حذف از سبد"
                >
                  <HiOutlineTrash size={17} />
                </button>

                {/* تصویر محصول */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[var(--brand-ivory)] overflow-hidden flex-shrink-0 border border-[var(--brand-taupe)]/10">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* جزئیات محصول در سبد */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--brand-charcoal)] truncate pr-4">{item.title}</h3>
                  
                  <div className="flex items-center justify-between mt-2.5">
                    {/* شمارنده تعداد داخل سبد */}
                    <div className="flex items-center gap-2.5 bg-[var(--brand-ivory)] px-2 py-0.5 rounded-lg border border-[var(--brand-taupe)]/20">
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} 
                        className="text-[var(--brand-charcoal)] hover:text-[var(--brand-gold)] font-bold text-sm"
                      >
                        +
                      </button>
                      <span className="text-xs font-black text-[var(--brand-charcoal)]">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} 
                        className="text-[var(--brand-charcoal)] hover:text-[var(--brand-gold)] font-bold text-sm"
                      >
                        −
                      </button>
                    </div>

                    {/* قیمت نهایی آیتم */}
                    <div className="text-left">
                      <span className="text-xs sm:text-sm font-black text-[var(--brand-gold)]">
                        {(item.price * item.quantity).toLocaleString('fa-IR')}
                      </span>
                      <span className="text-[10px] text-[var(--brand-taupe)] mr-0.5">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* فوتر سبد خرید */}
        <div className="p-6 border-t border-[var(--brand-taupe)]/20 bg-[var(--brand-ivory)]/60">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs sm:text-sm font-bold text-[var(--brand-charcoal)]/80">جمع کل سبد:</span>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-black text-[var(--brand-gold)]">
                {totalCartPrice.toLocaleString('fa-IR')}
              </span>
              <span className="text-xs text-[var(--brand-taupe)] mr-1">تومان</span>
            </div>
          </div>
          <button 
            disabled={cartItems.length === 0} 
            className="w-full py-3.5 bg-[var(--brand-gold)] text-[var(--brand-charcoal)] hover:bg-[var(--brand-charcoal)] hover:text-white rounded-xl font-bold text-sm shadow-md transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            تکمیل سفارش و تسویه حساب
          </button>
        </div>
      </div>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className='flex flex-col lg:flex-row gap-6'>
        
        {/* اسلایدر */}
        <article className='w-full lg:w-[42%] xl:w-[40%]'>
          <div className="sticky top-4 bg-white rounded-3xl border border-[var(--brand-taupe)]/20 shadow-md overflow-hidden">
            <Slider />
          </div>
        </article>

        {/* اطلاعات محصول */}
        <article className='w-full lg:w-[58%] xl:w-[60%]'>
          <div className='bg-white rounded-3xl border border-[var(--brand-taupe)]/20 shadow-md overflow-hidden'>
            
            <div className='p-5 sm:p-6 lg:p-7'>
              <div className='flex justify-between items-start gap-3'>
                <h1 className='text-lg sm:text-xl font-bold text-[var(--brand-charcoal)] flex-1 leading-relaxed'>{product.title}</h1>
                <GiWoodBeam className="flex-shrink-0 mt-1 text-[var(--brand-gold)]" size={26} />
              </div>

              <div className='border-b border-[var(--brand-taupe)]/25 my-4'></div>

              <div className='flex flex-wrap items-center gap-3'>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} size={14} className={index < product.rating ? "text-[var(--brand-gold)]" : "text-[var(--brand-taupe)]/30"} />
                  ))}
                  <span className="text-xs text-[var(--brand-taupe)] mr-1">({product.rating || 0})</span>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${product.stockStatus === 'موجود' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {product.stockStatus || 'موجود'}
                </span>
              </div>

              <div className='mt-5'>
                <span className='text-xs text-[var(--brand-taupe)] font-bold'>توضیحات کوتاه</span>
                <p className='text-sm text-[var(--brand-charcoal)]/80 leading-relaxed mt-1.5 line-clamp-3'>{product.description}</p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-5 border-t border-[var(--brand-taupe)]/20'>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-[var(--brand-taupe)]'>شناسه محصول :</span>
                  <span className='text-sm text-[var(--brand-charcoal)] font-semibold'>{product.shareCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-[var(--brand-taupe)]'>آخرین بروزرسانی :</span>
                  <span className='text-sm text-[var(--brand-charcoal)] font-semibold'>{product.publishDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[var(--brand-taupe)]/20">
                <span className='text-xs text-[var(--brand-taupe)] font-bold'>اشتراک گذاری :</span>
                <div className="flex gap-2">
                  <button onClick={() => shareProduct('telegram')} className="p-1.5 bg-[var(--brand-ivory)] hover:bg-[var(--brand-gold)]/20 rounded-full transition-all duration-300 hover:scale-110"><FaTelegram className="text-[#26A5E4] text-base" /></button>
                  <button onClick={() => shareProduct('whatsapp')} className="p-1.5 bg-[var(--brand-ivory)] hover:bg-[var(--brand-gold)]/20 rounded-full transition-all duration-300 hover:scale-110"><FaWhatsapp className="text-[#25D366] text-base" /></button>
                  <button onClick={() => shareProduct('instagram')} className="p-1.5 bg-[var(--brand-ivory)] hover:bg-[var(--brand-gold)]/20 rounded-full transition-all duration-300 hover:scale-110"><FaInstagram className="text-[#E4405F] text-base" /></button>
                </div>
              </div>
            </div>

            {/* بخش قیمت و اکشن خرید با پس‌زمینه عاجی برند */}
            <div className='bg-[var(--brand-ivory)]/40 p-5 sm:p-6 lg:p-7 border-t border-[var(--brand-taupe)]/20'>
              
              <div className='flex items-center gap-2 mb-4'>
                <FaShoppingBag className='text-[var(--brand-gold)] text-lg' />
                <p className='text-sm text-[var(--brand-charcoal)] font-bold'>خرید اینترنتی از فروشگاه اریس وود</p>
              </div>
              <div className='border-b border-[var(--brand-taupe)]/20 mb-5'></div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5'>
                <div className="flex items-center gap-2"><span className='text-xs text-[var(--brand-taupe)]'>ابعاد :</span><span className='text-sm font-semibold text-[var(--brand-charcoal)]'>{formatDimensions(product.dimensions)}</span></div>
                <div className="flex items-center gap-2"><span className='text-xs text-[var(--brand-taupe)]'>زمان آماده‌سازی :</span><span className='text-sm font-semibold text-[var(--brand-charcoal)]'>{product.prepTime || '---'}</span></div>
                <div className="flex items-center gap-2"><span className='text-xs text-[var(--brand-taupe)]'>گارانتی :</span><span className='text-sm font-semibold text-[var(--brand-charcoal)]'>{product.guarantee || '---'}</span></div>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-[var(--brand-taupe)]'>رنگ‌ها :</span>
                  <div className="flex gap-1.5">
                    {Array.isArray(product.colors) && product.colors.map((color, index) => (
                      <button 
                        key={index} 
                        onClick={() => setSelectedColor(index)} 
                        className={`w-5.5 h-5.5 rounded-full border-2 transition-transform ${selectedColor === index ? 'border-[var(--brand-gold)] scale-110' : 'border-[var(--brand-taupe)]/40'}`} 
                        style={{ backgroundColor: color }} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* کادر شیک قیمت با بوردر طلایی خیلی ظریف */}
              <div className='flex items-center justify-between bg-white p-3.5 rounded-2xl shadow-sm border border-[var(--brand-gold)]/20 mb-5'>
                <div className="flex items-center gap-2">
                  <MdOutlinePriceChange className="text-[var(--brand-gold)] text-xl" />
                  <span className='text-xs text-[var(--brand-taupe)] font-bold'>قیمت نهایی :</span>
                </div>
                <div className="text-left">
                  <span className='text-xl font-black text-[var(--brand-charcoal)]'>{getPrice().toLocaleString('fa-IR')}</span>
                  <span className='text-xs text-[var(--brand-taupe)] mr-1'>تومان</span>
                </div>
              </div>

              {/* چک‌باکس خرید عمده */}
              <div className='flex items-center gap-3 mb-5 p-3.5 bg-white rounded-xl border border-[var(--brand-taupe)]/20'>
                <input 
                  type="checkbox" 
                  id="bulkPurchase" 
                  className="w-4 h-4 text-[var(--brand-gold)] border-[var(--brand-taupe)] rounded focus:ring-[var(--brand-gold)]" 
                  checked={isBulk} 
                  onChange={() => setIsBulk(!isBulk)} 
                />
                <label htmlFor="bulkPurchase" className='text-xs sm:text-sm text-[var(--brand-charcoal)] cursor-pointer select-none font-bold'>
                  خرید به صورت عمده (همراه با تخفیف ویژه)
                </label>
              </div>

              {/* کنترل تعداد و دکمه اصلی خرید */}
              <div className='flex flex-col sm:flex-row items-center gap-4'>
                <div className='flex items-center border-2 border-[var(--brand-taupe)]/30 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0'>
                  <button 
                    className='w-10 h-10 bg-gray-50 hover:bg-[var(--brand-ivory)] text-[var(--brand-charcoal)] transition-colors flex items-center justify-center' 
                    onClick={decreaseCount} 
                    disabled={count <= 1}
                  >
                    <AiOutlineMinus size={16} />
                  </button>
                  <span className='w-12 text-center font-black text-[var(--brand-charcoal)] text-base'>{count}</span>
                  <button 
                    className='w-10 h-10 bg-gray-50 hover:bg-[var(--brand-ivory)] text-[var(--brand-charcoal)] transition-colors flex items-center justify-center' 
                    onClick={increaseCount} 
                    disabled={count >= (product.stock || 10)}
                  >
                    <AiOutlinePlus size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={addToCart}
                  className='flex-1 w-full py-3.5 bg-[var(--brand-charcoal)] text-white rounded-xl hover:bg-[var(--brand-gold)] hover:text-[var(--brand-charcoal)] transition-all duration-300 hover:scale-[1.02] text-sm font-bold shadow-md flex items-center justify-center gap-2'
                >
                  <FaShoppingBag size={16} />
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
