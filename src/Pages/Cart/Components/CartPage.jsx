import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('eriss_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateLocalStorage = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('eriss_cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const increaseQuantity = (id, color) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.selectedColor === color
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateLocalStorage(updated);
  };

  const decreaseQuantity = (id, color) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id && item.selectedColor === color) {
          const newQty = item.quantity - 1;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    updateLocalStorage(updated);
  };

  const removeItem = (id, color) => {
    const updated = cartItems.filter(
      (item) => !(item.id === id && item.selectedColor === color)
    );
    updateLocalStorage(updated);
  };

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const tax = totalCartPrice * 0.09;
  const finalPrice = totalCartPrice + tax;

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    alert(`کد تخفیف "${promoCode}" ارسال شد برای بررسی`);
  };

  return (
    <div
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-vazir mt-4 bg-background"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-third">
          <h1 className="text-lg font-black flex items-center gap-3 text-fourth">
            <FaShoppingBag className="text-primary" />
            سبد خرید اریس‌وود
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-fiveth hover:text-primary transition-colors"
          >
            <FaArrowRight size={14} />
            <span>بازگشت</span>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-third rounded-3xl border border-dashed border-third">
            <p className="text-stone-500 mb-6">سبد خرید شما فعلاً خالی است.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-text1 px-8 py-3 rounded-xl font-bold"
            >
              فروشگاه
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 bg-primary text-text1 px-5 py-4 rounded-t-2xl font-bold items-center text-center">
                <div className="col-span-5 text-right">محصول</div>
                <div className="col-span-2">قیمت</div>
                <div className="col-span-2">تعداد</div>
                <div className="col-span-2">جمع جزء</div>
                <div className="col-span-1"></div>
              </div>

              {/* Items Wrapper */}
              <div className="space-y-4 md:space-y-0 bg-text1 md:border-x md:border-b md:border-third md:rounded-b-2xl overflow-hidden shadow-sm md:shadow-none">
                {cartItems.map((item, index) => (
                  <React.Fragment key={`${item.id}-${item.selectedColor || index}`}>
                    {/* Desktop Row */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-5 border-b border-third items-center text-center">
                      {/* Product */}
                      <div className="col-span-5 flex items-center gap-4 text-right min-w-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover bg-fiveth shrink-0"
                        />

                        <div className="min-w-0">
                          <h3 className="font-bold text-fourh text-sm mb-1 truncate">
                            {item.title}
                          </h3>

                          <p className="text-[11px] text-fiveth mb-1">
                            کد محصول: {item.shareCode}
                          </p>

                          {item.selectedColor && (
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-fiveth">رنگ:</span>
                              <div
                                className="w-3 h-3 rounded-full border border-text1"
                                style={{ backgroundColor: item.selectedColor }}
                                title={item.selectedColor}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-sm font-medium">
                        {Number(item.price).toLocaleString('fa-IR')} تومان
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center bg-text-muted rounded-lg p-1">
                          <button
                            onClick={() => increaseQuantity(item.id, item.selectedColor)}
                            className="p-1 hover:text-primary transition-colors active:scale-95"
                            aria-label="افزایش تعداد"
                          >
                            <AiOutlinePlus size={14} />
                          </button>

                          <span className="px-3 font-bold text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => decreaseQuantity(item.id, item.selectedColor)}
                            className="p-1 hover:text-red-500 transition-colors active:scale-95"
                            aria-label="کاهش تعداد"
                          >
                            <AiOutlineMinus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-2 text-sm font-black text-secondary">
                        {(Number(item.price) * item.quantity).toLocaleString('fa-IR')} تومان
                      </div>

                      {/* Remove */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => removeItem(item.id, item.selectedColor)}
                          className="text-fiveth hover:text-red-600 transition-colors"
                          aria-label="حذف محصول"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Card */}
                    <div className="md:hidden bg-text1 rounded-2xl border border-text-muted p-4 flex flex-col gap-4 shadow-sm">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 rounded-xl object-cover bg-text1"
                        />

                        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-sm truncate">
                              {item.title}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id, item.selectedColor)}
                              className="text-text-muted shrink-0"
                              aria-label="حذف محصول"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>

                          <p className="text-[10px] text-third">
                            کد: {item.shareCode}
                          </p>

                          {item.selectedColor && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-fiveth">رنگ:</span>
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-text-muted block"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </div>
                          )}

                          <div className="text-primary font-bold text-sm">
                            {Number(item.price).toLocaleString('fa-IR')} تومان
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-dashed border-text-muted">
                        <div className="flex items-center gap-3 bg-text-muted rounded-xl p-1 px-2 border border-text-muted">
                          <button
                            onClick={() => increaseQuantity(item.id, item.selectedColor)}
                            className="text-primary active:scale-95"
                            aria-label="افزایش تعداد"
                          >
                            <AiOutlinePlus size={16} />
                          </button>

                          <span className="font-black text-sm">{item.quantity}</span>

                          <button
                            onClick={() => decreaseQuantity(item.id, item.selectedColor)}
                            className="text-primary active:scale-95"
                            aria-label="کاهش تعداد"
                          >
                            <AiOutlineMinus size={16} />
                          </button>
                        </div>

                        <div className="text-left leading-tight">
                          <p className="text-[10px] text-fiveth">جمع کل:</p>
                          <p className="font-black text-secondary text-base">
                            {(Number(item.price) * item.quantity).toLocaleString('fa-IR')} تومان
                          </p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mt-8 bg-text1 p-5 sm:p-6 rounded-2xl border border-text-muted">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <div className="flex-1 w-full relative">
                    <input
                      type="text"
                      placeholder="کد تخفیف را وارد کنید..."
                      className="w-full bg-text1 border border-text-muted rounded-xl h-12 sm:h-14 px-4 sm:px-6 text-sm outline-none focus:border-primary transition-all text-right"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-fiveth tracking-widest uppercase pointer-events-none">
                      Promo
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={applyPromo}
                    className="w-full sm:w-48 h-12 sm:h-14 bg-primary text-text1 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
                  >
                    اعمال تخفیف
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-fiveth leading-5">
                  کد تخفیف را دقیق وارد کنید؛ حروف انگلیسی و اعداد حساس هستند.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-text1 rounded-2xl border border-text-muted p-6 sticky top-24 shadow-sm">
                <h2 className="text-lg font-bold mb-6 pb-4 border-b border-text-muted">
                  خلاصه فاکتور
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-fiveth">
                    <span>جمع کل محصولات</span>
                    <span>{totalCartPrice.toLocaleString('fa-IR')} تومان</span>
                  </div>

                  <div className="flex justify-between text-sm text-fiveth">
                    <span>مالیات (۹٪)</span>
                    <span>{tax.toLocaleString('fa-IR')} تومان</span>
                  </div>

                  <div className="flex justify-between text-sm text-primary font-bold">
                    <span>هزینه ارسال</span>
                    <span>رایگان</span>
                  </div>

                  <div className="pt-4 border-t border-text-muted flex justify-between items-end">
                    <span className="font-bold text-stone-800">مبلغ نهایی</span>
                    <div className="text-left">
                      <span className="text-2xl font-black text-secondary leading-none">
                        {finalPrice.toLocaleString('fa-IR')}
                      </span>
                      <span className="text-[10px] block font-bold text-fiveth">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-primary text-text1 py-4 rounded-xl font-bold shadow-xl shadow-primary/10 hover:translate-y-[-2px] transition-all"
                >
                  تکمیل سفارش و پرداخت
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
