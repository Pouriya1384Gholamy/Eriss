import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products, calculateDiscountPrice } from "../../../data/products";
import Slider from "../../../Components/ui/Slider";
import {
  FaStar,
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlinePriceChange } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { GiWoodBeam } from "react-icons/gi";

function ProductHero() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id]
  );

  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorError, setColorError] = useState("");
  const [isBulk, setIsBulk] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("eriss_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("eriss_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setCount(1);
    setSelectedColor(null);
    setColorError("");
    setIsBulk(false);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-lg font-bold text-gray-500">محصول پیدا نشد</p>
      </div>
    );
  }

  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

  // ===== محاسبه قیمت تخفیف‌خورده =====
  const getPrice = () => {
    let price = product.price || 0;

    // اگر تخفیف دارد، قیمت تخفیف‌خورده را محاسبه کن
    if (product.discountPercentage && product.discountPercentage > 0) {
      price = calculateDiscountPrice(product.price, product.discountPercentage);
    }

    if (isBulk && product.bulkDiscount) {
      price = price * (1 - product.bulkDiscount / 100);
    }

    return Math.round(price);
  };

  const increaseCount = () => {
    const maxStock = product.stock || 10;
    if (count < maxStock) setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const formatDimensions = (dim) => {
    if (!dim) return "---";
    if (typeof dim === "object") {
      const { width, depth, height } = dim;
      return `${width} × ${depth} × ${height} سانتی‌متر`;
    }
    return dim;
  };

  const shareProduct = (platform) => {
    const url = window.location.href;
    const text = `${product.title} - قیمت: ${getPrice().toLocaleString()} تومان`;

    const shareLinks = {
      telegram: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      instagram: "https://www.instagram.com/",
    };

    window.open(shareLinks[platform], "_blank", "width=600,height=500");
  };

  const handleSelectColor = (index) => {
    setSelectedColor(index);
    setColorError("");
  };

  const addToCart = () => {
    if (hasColors && selectedColor === null) {
      setColorError("لطفاً رنگ محصول را انتخاب کنید");
      return;
    }

    const finalPrice = getPrice();
    const colorValue = hasColors ? product.colors[selectedColor] : null;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedColor === colorValue
      );

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + count }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: count,
          price: finalPrice,
          selectedColor: colorValue,
        },
      ];
    });

    setColorError("");
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedColor === color)
      )
    );
  };

  const updateCartItemQuantity = (productId, color, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ====== کامپوننت پنل خرید (فقط قیمت تخفیف‌خورده) ======
  const PurchasePanel = ({ showOnlineBadge = false }) => (
    <div className="p-4 bg-gray-50/50 sm:p-5 rounded-xl border border-gray-200 h-full">
      {showOnlineBadge && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaShoppingBag className="text-[#9EAD8C] text-lg" />
            <p className="text-sm text-[#9EAD8C] font-medium">
              خرید اینترنتی از فروشگاه اریس وود
            </p>
          </div>
          <div className="border-b border-gray-200 mb-4" />
        </>
      )}

      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap">ابعاد :</span>
          <span className="text-sm font-medium text-gray-700 truncate">
            {formatDimensions(product.dimensions)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap">زمان آماده‌سازی :</span>
          <span className="text-sm font-medium text-gray-700 truncate">
            {product.prepTime || "---"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap">گارانتی :</span>
          <span className="text-sm font-medium text-gray-700 truncate">
            {product.guarantee || "---"}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap mt-1">رنگ‌ها :</span>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1.5 flex-wrap">
              {hasColors ? (
                product.colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectColor(index)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === index
                        ? "border-black scale-110 shadow-md"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`انتخاب رنگ ${index + 1}`}
                  />
                ))
              ) : (
                <span className="text-sm text-gray-400">بدون رنگ</span>
              )}
            </div>
            {colorError && (
              <span className="text-xs text-red-500 font-medium">
                {colorError}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ===== نمایش فقط قیمت تخفیف‌خورده ===== */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center gap-2">
          <MdOutlinePriceChange className="text-[#9EAD8C] text-xl" />
          <span className="text-xs text-gray-400">قیمت :</span>
        </div>
        <div className="text-left">
          <span className="text-xl font-bold text-[#9EAD8C]">
            {getPrice().toLocaleString("fa-IR")}
          </span>
          <span className="text-sm text-gray-400 mr-1">تومان</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 p-2 bg-blue-50/50 rounded-lg border border-blue-100">
        <input
          type="checkbox"
          id="bulkPurchase"
          className="sr-only peer"
          checked={isBulk}
          onChange={() => setIsBulk(!isBulk)}
        />
        <label
          htmlFor="bulkPurchase"
          className="text-sm text-gray-700 cursor-pointer select-none font-medium"
        >
          خرید به صورت عمده
        </label>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">تعداد:</span>
        <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <button
            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
            onClick={decreaseCount}
            disabled={count <= 1}
          >
            <AiOutlineMinus size={18} />
          </button>
          <span className="w-14 text-center font-bold text-gray-800 text-lg">
            {count}
          </span>
          <button
            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
            onClick={increaseCount}
            disabled={count >= (product.stock || 10)}
          >
            <AiOutlinePlus size={18} />
          </button>
        </div>
      </div>

      <button
        onClick={addToCart}
        className="w-full py-3.5 bg-[#9EAD8C] text-white rounded-xl hover:bg-[#8A9B78] transition-all duration-300 hover:scale-[1.02] text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        <FaShoppingBag size={18} />
        افزودن به سبد خرید
      </button>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 relative" dir="rtl">
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] sm:w-[380px] bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-primary" />
            <h2 className="text-lg font-black text-stone-800">
              سبد خرید ({cartItems.length})
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors flex items-center gap-1 text-xs font-bold text-stone-400"
          >
            بستن <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-stone-400 mt-10">
              سبد خرید شما خالی است
            </p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedColor || index}`}
                className="flex gap-4 p-4 rounded-2xl border border-stone-100 bg-white shadow-sm relative group"
              >
                <button
                  onClick={() => removeFromCart(item.id, item.selectedColor)}
                  className="absolute top-2 left-3.5 text-stone-300 hover:text-red-500 transition-colors"
                >
                  <HiOutlineTrash size={18} />
                </button>

                <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-stone-800 truncate pr-4">
                    {item.title}
                  </h3>

                  {item.selectedColor && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-stone-400">
                        رنگ انتخابی:
                      </span>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-200 block"
                        style={{ backgroundColor: item.selectedColor }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-stone-50 px-2 py-1 rounded-lg">
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            item.id,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="text-stone-400 hover:text-stone-700"
                      >
                        +
                      </button>
                      <span className="text-xs font-black">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            item.id,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="text-stone-400 hover:text-stone-700"
                      >
                        −
                      </button>
                    </div>

                    <div className="text-left">
                      <span className="text-sm font-black text-primary">
                        {(item.price * item.quantity).toLocaleString("fa-IR")}
                      </span>
                      <span className="text-[10px] text-stone-400 mr-1">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/30">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-bold text-stone-500">مجموع:</span>
            <div className="text-left">
              <span className="text-2xl font-black text-primary">
                {totalCartPrice.toLocaleString("fa-IR")}
              </span>
              <span className="text-xs text-stone-400 mr-1">تومان</span>
            </div>
          </div>

          <button
            disabled={cartItems.length === 0}
            onClick={() => {
              setIsCartOpen(false);
              navigate("/cart");
            }}
            className="w-full py-4 bg-[#9EAD8C] text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-[#8A9B78] transition-all disabled:bg-stone-300"
          >
            تکمیل سفارش و تسویه حساب
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
        {/* Gallery */}
        <article className="w-full lg:w-[32%] xl:w-[30%] flex justify-center">
          <div className="sticky top-4 bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[400px] lg:max-w-none">
            <div className="aspect-[4/5] max-h-[500px] lg:max-h-[550px]">
              <Slider />
            </div>
          </div>
        </article>

        {/* Details */}
        <article className="w-full lg:w-[68%] xl:w-[70%]">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:gap-6">
                {/* ستون عنوان و توضیحات */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 leading-relaxed flex-1">
                      {product.title}
                    </h1>
                    <GiWoodBeam className="flex-shrink-0 mt-1" color="#9EAD8C" size={24} />
                  </div>

                  <div className="border-b border-gray-200 my-3" />

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          size={15}
                          className={index < (product.rating || 0) ? "text-yellow-400" : "text-gray-200"}
                        />
                      ))}
                      <span className="text-xs text-gray-500 mr-1">
                        ({product.rating || 0})
                      </span>
                    </div>

                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        product.stockStatus === "موجود"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stockStatus || "موجود"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs text-gray-400 font-medium">
                      توضیحات کوتاه
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed mt-1 line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">شناسه محصول :</span>
                      <span className="text-sm text-primary font-semibold">
                        {product.shareCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">آخرین بروزرسانی :</span>
                      <span className="text-sm text-primary font-semibold">
                        {product.publishDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">
                      اشتراک گذاری :
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => shareProduct("telegram")}
                        className="p-1.5 bg-green-50 hover:bg-green-100 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <FaTelegram className="text-[#26A5E4] text-lg" />
                      </button>

                      <button
                        onClick={() => shareProduct("whatsapp")}
                        className="p-1.5 bg-green-50 hover:bg-green-100 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <FaWhatsapp className="text-[#25D366] text-lg" />
                      </button>

                      <button
                        onClick={() => shareProduct("instagram")}
                        className="p-1.5 bg-pink-50 hover:bg-pink-100 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <FaInstagram className="text-[#E4405F] text-lg" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ====== ستون پنل خرید - دسکتاپ (فقط قیمت تخفیف‌خورده) ====== */}
                <div className="hidden lg:block lg:w-[340px] xl:w-[380px] flex-shrink-0 mt-4 lg:mt-0">
                  <div className="sticky top-4">
                    <PurchasePanel showOnlineBadge={true} />
                  </div>
                </div>
              </div>
            </div>

            {/* ====== پنل خرید - موبایل (فقط قیمت تخفیف‌خورده) ====== */}
            <div className="lg:hidden p-4 sm:p-5 border-t border-gray-200">
              <PurchasePanel showOnlineBadge={false} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProductHero;