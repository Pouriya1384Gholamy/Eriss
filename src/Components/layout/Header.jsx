import React, { useState, useEffect } from "react";
import { LuShoppingBag } from "react-icons/lu";
import {useNavigate , useParams} from 'react-router-dom'


function Header() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isMenueOpen, SetisMenueOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // خواندن تعداد سبد خرید از localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("eriss_cart");
    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);

    // آپدیت خودکار وقتی چیزی در سبد تغییر می‌کند
    window.addEventListener("storage", () => {
      const updatedCart = JSON.parse(localStorage.getItem("eriss_cart") || "[]");
      const updatedCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(updatedCount);
    });
  }, []);

  return (
    <>
      <div className="w-full h-2 bg-primary"></div>

      <header className="flex justify-between items-center bg-white shadow-md h-12 px-3 lg:h-[70px]">

        {/* LEFT */}
        <div className="flex items-center gap-3 mr-2 order-1 lg:order-2">

          {/* hamburger */}
          <button onClick={() => SetisMenueOpen(true)}
            className="lg:hidden p-1 rounded hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* search icon */}
          <button className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* desktop search */}
          <div className="hidden lg:block relative w-[500px]">

            {/* search icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-7 rounded-[7px] bg-primary search shadow-xl text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" 
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <input
              type="text"
              placeholder="جستوجو محصول مورد نظر ..."
              className="font-light w-full h-[42px] border border-secondary/40 rounded-lg pl-12 pr-4 text-sm bg-gray-50 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/30 placeholder:text-[#615353]"
            />

          </div>

        </div>

        {/* LOGO */}
        <p className="order-2 lg:order-1 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-semibold">
          ErissWood
        </p>

        {/* RIGHT */}
        <div className="flex items-center sm:gap-4 ml-2 order-3">

          {/* user */}
          <button className="p-1 hover:bg-gray-100 rounded transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* favorite */}
          <button className="p-1 hover:bg-gray-100 rounded transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 hidden sm:block"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>

          {/* CART ICON WITH BADGE */}
          <button className="relative p-1 hover:bg-gray-100 rounded transition">

            {/* react-icons سبد خرید */}
            <LuShoppingBag className="w-5 h-5" 
            onClick={() => {
              navigate("/cart");
            }} />

            {/* badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
