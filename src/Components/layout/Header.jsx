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

  // کامپوننت اسکلتون لودینگ برای کارت محصولات
  const SkeletonCard = () => (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 animate-pulse">
      <div className="h-16 w-16 rounded-lg bg-gray-200"></div>
      <div className="flex-1">
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded mb-1"></div>
        <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // کامپوننت اسکلتون لودینگ برای دسکتاپ
  const SkeletonDesktopItem = () => (
    <div className="flex items-center gap-3 p-3 border-b border-gray-50 animate-pulse">
      <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
      <div className="flex-1">
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

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

          {/* search icon - با کلیک میرود به تب جستجو در منو */}
          <button 
            onClick={openSearchTab}
            className="lg:hidden p-1 rounded hover:bg-gray-100 transition"
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
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
            />
            {/* نتایج جستجو در دسکتاپ با لودینگ */}
            {isSearching && searchQuery.trim() !== "" && (
              <div className="absolute top-[48px] left-0 w-full bg-white rounded-lg shadow-2xl border border-gray-100 max-h-[400px] overflow-y-auto z-[200]">
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
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                      >
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-[13px] font-medium text-gray-800">{product.title}</div>
                          <div className="text-[11px] text-gray-500">{product.price.toLocaleString()} تومان</div>
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
                      <div className="p-2 text-center text-[11px] text-primary hover:underline cursor-pointer">
                        مشاهده همه {searchResults.length} نتیجه
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    محصولی یافت نشد
                  </div>
                )}
              </div>
            )}
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
            <LuShoppingBag className="w-5 h-5" onClick={() => navigate("/cart")} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* --- منوی موبایل (سایدبار) --- */}
      {isMenueOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden" dir="rtl">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu}></div>
          <div className="fixed right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-800">منوی اصلی</span>
              <button onClick={closeMenu} className="text-gray-400 text-xl">✕</button>
            </div>

            <div className="flex border-b border-gray-100 text-[13px] font-bold text-center">
              <button onClick={() => {
                setActiveTab('categories');
                setShowProducts(false);
                setSelectedCategoryProducts([]);
                setSelectedTypeProducts([]);
                setIsSearching(false);
                setSearchResults([]);
                setSearchQuery("");
                setIsLoading(false);
              }} className={`w-1/3 py-4 border-b-2 transition ${activeTab === 'categories' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-400'}`}>
                دسته‌بندی
              </button>
              <button onClick={() => {
                setActiveTab('search');
                setIsSearching(true);
                setShowProducts(false);
              }} className={`w-1/3 py-4 border-b-2 transition ${activeTab === 'search' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-400'}`}>
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
              }} className={`w-1/3 py-4 border-b-2 transition ${activeTab === 'menu' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-400'}`}>
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
                        className="mb-3 flex items-center gap-2 text-[12px] text-primary font-bold"
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
                              className="flex items-center gap-3 rounded-xl bg-gray-50 p-2 cursor-pointer hover:bg-gray-100 transition"
                            >
                              <img 
                                src={product.image} 
                                alt={product.title} 
                                className="h-14 w-14 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-[13px] font-medium text-gray-800 line-clamp-1">{product.title}</div>
                                <div className="text-[12px] text-gray-500">{product.price.toLocaleString()} تومان</div>
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
                      <div key={i} className="border-b border-gray-50 last:border-0">
                        <div 
                          onClick={() => handleCategoryClick(cat.name)}
                          className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition ${openCategory === cat.name ? 'bg-primary/5 text-primary' : 'text-gray-700'}`}
                        >
                          <span className="text-[13px] font-medium">
                            {cat.name}
                            <span className="mr-2 text-[10px] text-gray-400">({cat.products.length})</span>
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition ${openCategory === cat.name ? 'rotate-180' : 'rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                        {openCategory === cat.name && cat.subCategories.length > 0 && (
                          <div className="bg-gray-50/50 mr-4 pr-3 py-1 space-y-1 rounded-b-xl border-r-2 border-primary/20">
                            {cat.subCategories.map((sub, idx) => {
                              const subProducts = products.filter(p => p.category === cat.name && p.type === sub);
                              return (
                                <button 
                                  key={idx} 
                                  onClick={() => handleTypeClick(cat.name, sub)}
                                  className="block w-full text-right py-2 px-3 text-[12px] text-gray-500 hover:text-primary hover:bg-white/50 rounded-lg transition"
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
                      className="w-full h-[42px] border border-gray-200 rounded-xl pr-4 pl-10 text-sm bg-gray-50 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 cursor-pointer hover:bg-gray-50 transition shadow-sm"
                          >
                            <img 
                              src={product.image} 
                              alt={product.title} 
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="text-[13px] font-medium text-gray-800 line-clamp-1">{product.title}</div>
                              <div className="text-[11px] text-gray-500">{product.price.toLocaleString()} تومان</div>
                              {product.category && (
                                <span className="text-[9px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <polyline points="9 6 15 12 9 18" />
                            </svg>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-400 py-8">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <p>نتیجه‌ای یافت نشد</p>
                          <p className="text-[11px]">عبارت جستجو را تغییر دهید</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
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
                  {["فروشگاه", "درباره ما", "تماس با ما", "وبلاگ"].map((m, i) => (
                    <li key={i} className="p-3 text-[13px] font-medium text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer">
                      {m}
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