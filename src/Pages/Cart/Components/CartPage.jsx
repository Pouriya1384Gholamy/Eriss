import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // خواندن اولیه داده‌ها از LocalStorage در زمان لود صفحه
  useEffect(() => {
    const savedCart = localStorage.getItem('eriss_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // بروزرسانی LocalStorage با هر تغییر در سبد خرید
  const updateLocalStorage = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('eriss_cart', JSON.stringify(updatedItems));
  };

  // افزایش تعداد (کنترل یکتایی بر اساس شناسه و رنگ انتخابی)
  const increaseQuantity = (id, color) => {
    const updated = cartItems.map(item =>
      (item.id === id && item.selectedColor === color) 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
    updateLocalStorage(updated);
  };

  // کاهش تعداد (کنترل یکتایی بر اساس شناسه و رنگ انتخابی)
  const decreaseQuantity = (id, color) => {
    const updated = cartItems.map(item => {
      if (item.id === id && item.selectedColor === color) {
        const newQty = item.quantity - 1;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    updateLocalStorage(updated);
  };

  // حذف آیتم بر اساس شناسه و رنگ اختصاصی
  const removeItem = (id, color) => {
    const filtered = cartItems.filter(
      item => !(item.id === id && item.selectedColor === color)
    );
    updateLocalStorage(filtered);
  };

  // محاسبه قیمت‌ها
  const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = totalCartPrice * 0.09;
  const finalPrice = totalCartPrice + tax;

  return (
    <div
      className="min-h-screen py-10 px-4 mt-4 sm:px-6 lg:px-8 font-vazir"
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)'
      }}
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">

        {/* هدر صفحه */}
        <div
          className="flex items-center justify-between mb-10 pb-6 border-b"
          style={{ borderColor: 'var(--color-border)' }}
          >
          <h1 className="text-sm font-black flex items-center gap-3">
            <FaShoppingBag style={{ color: 'var(--color-text-import)' }} />
            سبد خرید اریس‌وود
          </h1>

          <button
            onClick={() => navigate(-2)}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            <FaArrowRight size={14} />
            <span>بازگشت به فروشگاه</span>
          </button>
        </div>

        {cartItems.length === 0 ? (
          /* سبد خرید خالی */
          <div
            className="text-center py-20 rounded-3xl border"
            style={{
              backgroundColor: 'var(--color-fiveth)',
              borderColor: 'var(--color-border)'
            }}
          >
            <p
              className="text-lg mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              سبد خرید شما خالی است!
            </p>

            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl font-bold transition-all"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-p-text)'
              }}
            >
              مشاهده محصولات اریس
            </button>
          </div>
        ) : (
          /* ساختار دو ستونه: آیتم‌ها در راست، فاکتور در چپ */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* لیست آیتم‌ها */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedColor || index}`}
                  className="flex flex-row gap-4 border-b pb-4"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {/* عکس محصول */}
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-sixeth)' }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* اطلاعات و کنترل‌ها */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col justify-between items-start gap-1">
                      
                      <div className="flex justify-between items-start w-full">
                        <h3
                          className="text-[13px] sm:text-[15px] font-bold"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {item.title}
                        </h3>
                        
                        <button
                          onClick={() => removeItem(item.id, item.selectedColor)}
                          className="transition-colors text-stone-400 hover:text-red-600 mr-2"
                        >
                          <FaTrash size={15} />
                        </button>
                      </div>

                      <p className='text-xs text-text'>کد محصول: {item.shareCode}</p>

                      {/* نمایش دایره رنگی انتخاب شده */}
                      {item.selectedColor && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className='text-xs text-text'>رنگ:</span>
                          {item.selectedColor ? (
                            <span 
                              className="w-4 h-4 rounded-full border border-stone-200 block" 
                              style={{ backgroundColor: item.selectedColor }} 
                            />
                          ) : (
                            <span className="text-xs text-stone-300">رنگ پیش‌فرض</span>
                          )}
                        </div>
                      )}

                      <div className='w-full flex justify-between flex-row text-sm text-text'>
                        <p>قیمت : </p>
                        <p>{item.price.toLocaleString()} تومان</p>
                      </div>

                      <hr className="block md:hidden w-full border-t border-dashed border-1 border-third" />

                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-3">

                
                      {/* دکمه‌های کنترل تعداد */}
                        <div className="w-full flex items-center justify-between gap-4">
                          <p className="text-sm font-medium text-text whitespace-nowrap">
                            تعداد:
                          </p>

                          <div className="flex items-center rounded-xl border border-primary/40 bg-white shadow-sm overflow-hidden">
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id, item.selectedColor)}
                              className="w-9 h-9 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                              aria-label="افزایش تعداد"
                            >
                              <AiOutlinePlus size={16} />
                            </button>

                            <span className="min-w-10 h-9 px-3 flex items-center justify-center text-sm font-bold text-text border-x border-primary/20">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id, item.selectedColor)}
                              className="w-9 h-9 flex items-center justify-center text-primary hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                              aria-label="کاهش تعداد"
                            >
                              <AiOutlineMinus size={16} />
                            </button>
                          </div>
                        </div>

                      <hr className="block md:hidden w-full border-t border-dashed border-1 border-third" />

                      {/* نمایش قیمت ضربدر تعداد */}
                      <div className="w-full flex justify-between items-center">
                        <span
                          className="text-sm block mb-0.5 text-text">
                          قیمت کل:
                        </span>
                        <span
                          className="text-secondary sm:text-lg font-black"
                        >
                          {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* سایدبار فاکتور نهایی */}
            <div
              className="h-fit p-6 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: 'var(--color-first)',
                borderColor: 'var(--color-border)'
              }}
            >
              <h2
                className="text-lg font-bold pb-4 border-b mb-5"
                style={{
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)'
                }}
              >
                خلاصه فاکتور
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-muted)' }}>جمع کل خرید:</span>
                  <span style={{ color: 'var(--color-text)' }}>
                    {totalCartPrice.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-muted)' }}>مالیات و عوارض (۹٪):</span>
                  <span style={{ color: 'var(--color-text)' }}>
                    {tax.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-muted)' }}>هزینه ارسال:</span>
                  <span style={{ color: 'var(--color-primary)' }}>
                    رایگان
                  </span>
                </div>

                <div
                  className="border-t pt-4 mt-4 flex justify-between items-center"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span
                    className="text-base font-bold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    مبلغ قابل پرداخت:
                  </span>
                  <span
                    className="text-xl font-black"
                    style={{ color: 'var(--color-text-import)' }}
                  >
                    {finalPrice.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <button
                onClick={() => alert('اتصال به درگاه پرداخت...')}
                className="w-full mt-6 py-4 rounded-xl font-bold text-sm transition-all"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-p-text)'
                }}
              >
                پرداخت و نهایی کردن سفارش
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
