import React, { useState, useEffect } from "react";
import { LuShoppingBag } from "react-icons/lu";

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isBadgeLoading, setIsBadgeLoading] = useState(false);

  const loadCartCount = () => {
    const savedCart = localStorage.getItem("eriss_cart");
    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    loadCartCount();
    window.addEventListener("storage", loadCartCount);
    const handleCustomUpdate = () => {
      setIsBadgeLoading(true);
      loadCartCount();
      setTimeout(() => setIsBadgeLoading(false), 450);
    };
    window.addEventListener("eriss_cart_updated", handleCustomUpdate);
    return () => {
      window.removeEventListener("storage", loadCartCount);
      window.removeEventListener("eriss_cart_updated", handleCustomUpdate);
    };
  }, []);

  return (
    <>
      {/* نوار بالای هدر با رنگ طلایی مات برند */}
      <div className="w-full h-2" style={{ backgroundColor: "var(--brand-gold)" }}></div>
      
      <header className="flex justify-between items-center bg-white shadow-sm h-12 px-3 lg:h-[70px]">
        {/* Left Section */}
        <div className="flex items-center gap-3 mr-2 order-1 lg:order-2">
          <button 
            className="lg:hidden p-1 rounded transition"
            style={{ color: "var(--brand-charcoal)" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-ivory)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          
          <div className="hidden lg:block relative w-[500px]">
            {/* دکمه جستجو با رنگ زغالی اصلی */}
            <div 
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-7 rounded-[7px] shadow-xl text-white"
              style={{ backgroundColor: "var(--brand-charcoal)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            
            <input 
              type="text" 
              placeholder="جستجوی محصول ..." 
              className="font-light w-full h-[42px] border rounded-lg pl-12 pr-4 text-sm outline-none transition"
              style={{ 
                borderColor: "rgba(160, 143, 122, 0.3)", // var(--brand-taupe) با اوپاسیتی ۳۰٪
                backgroundColor: "rgba(243, 235, 221, 0.2)", // var(--brand-ivory) با اوپاسیتی ۲۰٪
                color: "var(--color-text)",
                "--tw-placeholder-color": "var(--brand-taupe)"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--brand-gold)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(160, 143, 122, 0.3)"}
            />
          </div>
        </div>

        {/* Logo */}
        <p 
          className="order-2 lg:order-1 text-[20px] lg:text-[24px] font-black"
          style={{ color: "var(--brand-charcoal)" }}
        >
          ErissWood
        </p>

        {/* Right Section */}
        <div className="flex items-center sm:gap-4 ml-2 order-3">
          <button 
            className="p-1 rounded transition"
            style={{ color: "var(--brand-charcoal)" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-ivory)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21a8 8 0 0 0-16 0"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          
          <button 
            className="relative p-1 rounded transition"
            style={{ color: "var(--brand-charcoal)" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-ivory)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <LuShoppingBag className="w-5 h-5" />
            {isBadgeLoading && (
              <span 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping"
                style={{ backgroundColor: "rgba(176, 141, 87, 0.5)" }} // افکت ترنسپرنت طلایی
              ></span>
            )}
            {!isBadgeLoading && cartCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--brand-gold)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
