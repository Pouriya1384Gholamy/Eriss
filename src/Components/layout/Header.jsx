import React, { useState, useEffect, useMemo, useRef } from "react";
import { LuShoppingBag } from "react-icons/lu";
import { useNavigate, useParams } from 'react-router-dom';
import { products } from "../../data/products";

function Header() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isMenueOpen, SetisMenueOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState("categories");
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
  const [selectedTypeProducts, setSelectedTypeProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  
  // state های جستجو
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // ref برای فوکوس input جستجو
  const searchInputRef = useRef(null);

  // استخراج داینامیک دیتا از فایل محصولات
  const dynamicMenu = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    
    const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
    
    return categories.map(cat => ({
      name: cat,
      products: products.filter(p => p.category === cat),
      subCategories: [...new Set(products
        .filter(p => p.category === cat)
        .map(p => p.type))]
        .filter(Boolean)
    }));
  }, [products]);

  // خواندن تعداد سبد خرید از localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("eriss_cart");
    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);

    window.addEventListener("storage", () => {
      const updatedCart = JSON.parse(localStorage.getItem("eriss_cart") || "[]");
      const updatedCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(updatedCount);
    });
  }, []);

  // فوکوس input جستجو وقتی تب جستجو فعال میشه
  useEffect(() => {
    if (activeTab === 'search' && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300);
    }
  }, [activeTab]);

  // تابع جستجو با لودینگ
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      setIsLoading(false);
      return;
    }
    setIsSearching(true);
    setIsLoading(true);
    
    // شبیه‌سازی لودینگ با setTimeout
    setTimeout(() => {
      const results = products.filter(p => 
        p.title.includes(query) || 
        p.category?.includes(query) ||
        p.model?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 400);
  };

  // کلیک روی دسته‌بندی با لودینگ
  const handleCategoryClick = (categoryName) => {
    const cat = dynamicMenu.find(c => c.name === categoryName);
    if (cat) {
      setIsLoading(true);
      setSelectedCategoryProducts([]);
      setSelectedTypeProducts([]);
      setShowProducts(true);
      setOpenCategory(openCategory === categoryName ? null : categoryName);
      setIsSearching(false);
      setSearchResults([]);
      setSearchQuery("");
      
      setTimeout(() => {
        setSelectedCategoryProducts(cat.products);
        setIsLoading(false);
      }, 300);
    }
  };

  // کلیک روی زیرمجموعه (type) با لودینگ
  const handleTypeClick = (categoryName, type) => {
    setIsLoading(true);
    setSelectedCategoryProducts([]);
    setSelectedTypeProducts([]);
    setShowProducts(true);
    setIsSearching(false);
    setSearchResults([]);
    setSearchQuery("");
    
    setTimeout(() => {
      const productsOfType = products.filter(p => p.category === categoryName && p.type === type);
      setSelectedTypeProducts(productsOfType);
      setIsLoading(false);
    }, 300);
  };

  // بستن منو و ریست کردن
  const closeMenu = () => {
    SetisMenueOpen(false);
    setShowProducts(false);
    setSelectedCategoryProducts([]);
    setSelectedTypeProducts([]);
    setIsSearching(false);
    setSearchResults([]);
    setSearchQuery("");
    setIsLoading(false);
  };

  // باز کردن منو و رفتن به تب جستجو
  const openSearchTab = () => {
    SetisMenueOpen(true);
    setActiveTab('search');
    setIsSearching(true);
    setShowProducts(false);
  };

  // کامپوننت اسکلتون لودینگ برای کارت محصولات (تیره)
  const SkeletonCard = () => (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)]/30 p-3 animate-pulse bg-[var(--color-sixeth)]">
      <div className="h-16 w-16 rounded-lg bg-[var(--color-background)]"></div>
      <div className="flex-1">
        <div className="h-4 w-3/4 bg-[var(--color-background)] rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-[var(--color-background)] rounded mb-1"></div>
        <div className="h-3 w-1/4 bg-[var(--color-background)] rounded"></div>
      </div>
    </div>
  );

  // کامپوننت اسکلتون لودینگ برای دسکتاپ (تیره)
  const SkeletonDesktopItem = () => (
    <div className="flex items-center gap-3 p-3 border-b border-[var(--color-border)]/20 animate-pulse bg-[var(--color-background)]">
      <div className="h-12 w-12 rounded-lg bg-[var(--color-sixeth)]"></div>
      <div className="flex-1">
        <div className="h-4 w-3/4 bg-[var(--color-sixeth)] rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-[var(--color-sixeth)] rounded"></div>
      </div>
    </div>
  );

  return (
    <>
      {/* خط بالای هدر - با padding-top برای جبران فضای هدر fix شده */}
      <div className="w-full h-2 bg-[var(--color-primary)]"></div>
      
      <header className="sticky top-0 z-40 flex justify-between items-center bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]/30 shadow-lg h-12 px-3 lg:h-[70px]">
        
        {/* LEFT */}
        <div className="flex items-center gap-3 mr-2 order-1 lg:order-2">
          {/* hamburger */}
          <button onClick={() => SetisMenueOpen(true)}
            className="lg:hidden p-1 rounded hover:bg-[var(--color-primary)]/10 transition text-[var(--color-text)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* search icon - با کلیک میرود به تب جستجو در منو */}
          <button 
            onClick={openSearchTab}
            className="lg:hidden p-1 rounded hover:bg-[var(--color-primary)]/10 transition text-[var(--color-text)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* desktop search */}
          <div className="hidden lg:block relative w-[500px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-7 rounded-[7px] bg-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/30 text-[var(--color-background)]">
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
              className="font-light w-full h-[42px] border border-[var(--color-border)]/40 rounded-lg pl-12 pr-4 text-sm bg-[var(--color-sixeth)] text-[var(--color-text)] placeholder:text-[var(--color-fiveth)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
            />
            {/* نتایج جستجو در دسکتاپ با لودینگ */}
            {isSearching && searchQuery.trim() !== "" && (
              <div className="absolute top-[48px] left-0 w-full bg-[var(--color-sixeth)] rounded-lg shadow-2xl shadow-black/50 border border-[var(--color-border)]/30 max-h-[400px] overflow-y-auto z-[200]">
                {isLoading ? (
                  // اسکلتون لودینگ دسکتاپ
                  <>
                    <SkeletonDesktopItem />
                    <SkeletonDesktopItem />
                    <SkeletonDesktopItem />
                    <SkeletonDesktopItem />
                  </>
                ) : searchResults.length > 0 ? (
                  // نمایش نتایج
                  <>
                    {searchResults.slice(0, 8).map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setSearchQuery("");
                          setSearchResults([]);
                          setIsSearching(false);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-[var(--color-primary)]/10 cursor-pointer border-b border-[var(--color-border)]/20 last:border-0 transition-colors"
                      >
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-[13px] font-medium text-[var(--color-text)]">{product.title}</div>
                          <div className="text-[11px] text-[var(--color-fiveth)]">{product.price.toLocaleString()} تومان</div>
                        </div>
                        {product.rating && (
                          <div className="flex items-center gap-0.5 text-[9px] text-yellow-500">
                            {"★".repeat(product.rating)}
                            {"☆".repeat(5 - product.rating)}
                          </div>
                        )}
                      </div>
                    ))}
                    {searchResults.length > 8 && (
                      <div className="p-2 text-center text-[11px] text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline cursor-pointer transition-colors">
                        مشاهده همه {searchResults.length} نتیجه
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 text-center text-[var(--color-fiveth)] text-sm">
                    محصولی یافت نشد
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* LOGO */}
        <p className="order-2 lg:order-1 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[var(--color-text)]">
          Eriss<span className="text-[var(--color-primary)]">Wood</span>
        </p>

        {/* RIGHT */}
        <div className="flex items-center sm:gap-4 ml-2 order-3">
          {/* user */}
          <button className="p-1 hover:bg-[var(--color-primary)]/10 rounded transition text-[var(--color-text)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* favorite */}
          <button className="p-1 hover:bg-[var(--color-primary)]/10 rounded transition text-[var(--color-text)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 hidden sm:block"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>

          {/* CART ICON WITH BADGE */}
          <button className="relative p-1 hover:bg-[var(--color-primary)]/10 rounded transition text-[var(--color-text)]">
            <LuShoppingBag className="w-5 h-5" onClick={() => navigate("/cart")} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-[var(--color-background)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/30">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* --- منوی موبایل (سایدبار) --- */}
      {isMenueOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden" dir="rtl">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeMenu}></div>
          <div className="fixed right-0 top-0 h-full w-[85%] max-w-[320px] bg-[var(--color-sixeth)] shadow-2xl shadow-black/50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-[var(--color-border)]/30">
            
            <div className="p-4 border-b border-[var(--color-border)]/30 flex justify-between items-center">
              <span className="font-bold text-[var(--color-text)]">منوی اصلی</span>
              <button onClick={closeMenu} className="text-[var(--color-fiveth)] hover:text-[var(--color-text)] text-xl transition-colors">✕</button>
            </div>

            <div className="flex border-b border-[var(--color-border)]/30 text-[13px] font-bold text-center">
              <button onClick={() => {
                setActiveTab('categories');
                setShowProducts(false);
                setSelectedCategoryProducts([]);
                setSelectedTypeProducts([]);
                setIsSearching(false);
                setSearchResults([]);
                setSearchQuery("");
                setIsLoading(false);
              }} className={`w-1/3 py-4 border-b-2 transition ${activeTab === 'categories' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'border-transparent text-[var(--color-fiveth)]'}`}>
                دسته‌بندی
              </button>
              <button onClick={() => {
                setActiveTab('search');
                setIsSearching(true);
                setShowProducts(false);
              }} className={`w-1/3 py-4 border-b-2 transition ${activeTab === 'search' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'border-transparent text-[var(--color-fiveth)]'}`}>
                جستجو
              </button>
              <button onClick={() => {
                setActiveTab('menu');
                setShowProducts(false);
                setSelectedCategoryProducts([]);
                setSelectedTypeProducts([]);
                setIsSearching(false);
                setSearchResults([]);
                setSearchQuery("");
                setIsLoading(false);
              }} className={`w-1/3 py-4 border-b-2 transition ${activeTab === 'menu' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'border-transparent text-[var(--color-fiveth)]'}`}>
                منو
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'categories' ? (
                <div className="p-3 space-y-1">
                  {showProducts ? (
                    // نمایش محصولات با لودینگ
                    <div>
                      <button 
                        onClick={() => {
                          setShowProducts(false);
                          setSelectedCategoryProducts([]);
                          setSelectedTypeProducts([]);
                          setIsLoading(false);
                        }}
                        className="mb-3 flex items-center gap-2 text-[12px] text-[var(--color-primary)] font-bold hover:text-[var(--color-secondary)] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        بازگشت
                      </button>
                      <div className="space-y-2">
                        {isLoading ? (
                          // اسکلتون لودینگ موبایل
                          <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                          </>
                        ) : (
                          (selectedCategoryProducts.length > 0 ? selectedCategoryProducts : selectedTypeProducts).map((product) => (
                            <div 
                              key={product.id}
                              onClick={() => {
                                navigate(`/product/${product.id}`);
                                closeMenu();
                              }}
                              className="flex items-center gap-3 rounded-xl bg-[var(--color-background)] p-2 cursor-pointer hover:bg-[var(--color-primary)]/10 transition border border-[var(--color-border)]/20"
                            >
                              <img 
                                src={product.image} 
                                alt={product.title} 
                                className="h-14 w-14 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-[13px] font-medium text-[var(--color-text)] line-clamp-1">{product.title}</div>
                                <div className="text-[12px] text-[var(--color-fiveth)]">{product.price.toLocaleString()} تومان</div>
                                {product.rating && (
                                  <div className="flex items-center gap-0.5 text-[10px] text-yellow-500">
                                    {"★".repeat(product.rating)}
                                    {"☆".repeat(5 - product.rating)}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    // نمایش دسته‌بندی‌ها
                    dynamicMenu.map((cat, i) => (
                      <div key={i} className="border-b border-[var(--color-border)]/20 last:border-0">
                        <div 
                          onClick={() => handleCategoryClick(cat.name)}
                          className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition ${openCategory === cat.name ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}
                        >
                          <span className="text-[13px] font-medium">
                            {cat.name}
                            <span className="mr-2 text-[10px] text-[var(--color-fiveth)]">({cat.products.length})</span>
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition ${openCategory === cat.name ? 'rotate-180' : 'rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                        {openCategory === cat.name && cat.subCategories.length > 0 && (
                          <div className="bg-[var(--color-background)]/50 mr-4 pr-3 py-1 space-y-1 rounded-b-xl border-r-2 border-[var(--color-primary)]/30">
                            {cat.subCategories.map((sub, idx) => {
                              const subProducts = products.filter(p => p.category === cat.name && p.type === sub);
                              return (
                                <button 
                                  key={idx} 
                                  onClick={() => handleTypeClick(cat.name, sub)}
                                  className="block w-full text-right py-2 px-3 text-[12px] text-[var(--color-fiveth)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition"
                                >
                                  {sub} ({subProducts.length})
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : activeTab === 'search' ? (
                // بخش جستجو در موبایل با لودینگ
                <div className="p-3">
                  <div className="relative mb-3">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="جستجوی محصول..."
                      className="w-full h-[42px] border border-[var(--color-border)]/40 rounded-xl pr-4 pl-10 text-sm bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-fiveth)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fiveth)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          setSearchQuery("");
                          setSearchResults([]);
                          setIsSearching(false);
                          setIsLoading(false);
                          if (searchInputRef.current) {
                            searchInputRef.current.focus();
                          }
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-fiveth)] hover:text-[var(--color-text)] transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* نتایج جستجو در موبایل - کارت محور با لودینگ */}
                  {searchQuery.trim() !== "" ? (
                    <div className="space-y-2">
                      {isLoading ? (
                        // اسکلتون لودینگ
                        <>
                          <SkeletonCard />
                          <SkeletonCard />
                          <SkeletonCard />
                        </>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <div 
                            key={product.id}
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              closeMenu();
                            }}
                            className="flex items-center gap-3 rounded-xl border border-[var(--color-border)]/30 p-3 cursor-pointer hover:bg-[var(--color-primary)]/10 transition shadow-lg shadow-black/20 bg-[var(--color-background)]"
                          >
                            <img 
                              src={product.image} 
                              alt={product.title} 
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="text-[13px] font-medium text-[var(--color-text)] line-clamp-1">{product.title}</div>
                              <div className="text-[11px] text-[var(--color-fiveth)]">{product.price.toLocaleString()} تومان</div>
                              {product.category && (
                                <span className="text-[9px] text-[var(--color-fiveth)] bg-[var(--color-sixeth)] px-2 py-0.5 rounded-full inline-block mt-1">
                                  {product.category}
                                </span>
                              )}
                              {product.rating && (
                                <div className="flex items-center gap-0.5 text-[9px] text-yellow-500 mt-0.5">
                                  {"★".repeat(product.rating)}
                                  {"☆".repeat(5 - product.rating)}
                                </div>
                              )}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-third)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <polyline points="9 6 15 12 9 18" />
                            </svg>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-[var(--color-fiveth)] py-8">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-[var(--color-third)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <p>نتیجه‌ای یافت نشد</p>
                          <p className="text-[11px]">عبارت جستجو را تغییر دهید</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-[var(--color-fiveth)] py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-[var(--color-third)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <p>برای جستجو عبارت خود را وارد کنید</p>
                      <p className="text-[11px]">محصولات بر اساس نام، دسته و مدل جستجو می‌شوند</p>
                    </div>
                  )}
                </div>
              ) : (
                // منوی اصلی
                <ul className="space-y-1 p-3">
                  {[
                    { name: "فروشگاه", path: "/" },
                    { name: "درباره ما", path: "/about" },
                    { name: "تماس با ما", path: "/Contact" },
                    { name: "وبلاگ", path: "/blog" },
                    { name: "سوالات متداول", path: "/faq" }
                  ].map((item, i) => (
                    <li 
                      key={i} 
                      onClick={() => {
                        navigate(item.path);
                        closeMenu();
                      }}
                      className="p-3 text-[13px] font-medium text-[var(--color-text)] hover:bg-[var(--color-primary)]/10 rounded-xl cursor-pointer transition-colors"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;