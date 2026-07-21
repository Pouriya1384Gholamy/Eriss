import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { products, calculateDiscountPrice } from '../../../data/products';
import { 
  ChevronLeft, ChevronRight, X, Filter, Search, Star, 
  TrendingDown, ShoppingBag, Heart, Eye, SlidersHorizontal,
  ChevronDown, ChevronUp
} from 'lucide-react';

const DiscountPage = () => {
  // === State Management ===
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [tempPrice, setTempPrice] = useState({ min: 0, max: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const itemsPerPage = 12;

  // ===== فقط محصولات تخفیف‌دار =====
  const discountedProducts = useMemo(() => {
    return products.filter(p => p.discountPercentage && p.discountPercentage > 0);
  }, []);

  // ===== پیدا کردن محدوده قیمت واقعی محصولات تخفیف‌دار =====
  const getProductPriceRange = useMemo(() => {
    if (discountedProducts.length === 0) {
      return { min: 0, max: 10000000 };
    }
    const prices = discountedProducts.map(p => calculateDiscountPrice(p.price, p.discountPercentage));
    return {
      min: Math.floor(Math.min(...prices) / 100000) * 100000,
      max: Math.ceil(Math.max(...prices) / 100000) * 100000
    };
  }, [discountedProducts]);

  // ===== تنظیم اولیه قیمت‌ها =====
  useEffect(() => {
    if (getProductPriceRange.max > 0) {
      setPriceRange(getProductPriceRange);
      setTempPrice(getProductPriceRange);
    }
  }, [getProductPriceRange]);

  // ===== استخراج دسته‌بندی‌های منحصر‌به‌فرد از محصولات تخفیف‌دار =====
  const allCategories = useMemo(() => {
    const categorySet = new Set();
    discountedProducts.forEach(p => {
      if (p.category) categorySet.add(p.category);
    });
    
    const categoryIcons = {
      'میز ناهارخوری': { icon: '🍽️', color: 'from-amber-400 to-orange-500' },
      'صندلی': { icon: '🪑', color: 'from-blue-400 to-indigo-500' },
      'کنسول': { icon: '🪞', color: 'from-purple-400 to-pink-500' },
      'میز جلو مبلی': { icon: '🪵', color: 'from-emerald-400 to-teal-500' },
      'کتابخانه': { icon: '📚', color: 'from-rose-400 to-red-500' },
      'میز تحریر': { icon: '✏️', color: 'from-cyan-400 to-blue-500' },
      'میز آرایش': { icon: '💄', color: 'from-pink-400 to-rose-500' },
      'میز سرو': { icon: '🧁', color: 'from-yellow-400 to-amber-500' },
      'میز تلویزیون': { icon: '📺', color: 'from-gray-400 to-gray-600' },
      'کمد': { icon: '🚪', color: 'from-amber-500 to-yellow-600' },
      'تخت': { icon: '🛏️', color: 'from-indigo-400 to-purple-500' },
      'میز کار': { icon: '💼', color: 'from-slate-400 to-slate-600' },
      'میز عسلی': { icon: '🍯', color: 'from-orange-400 to-amber-500' },
      'میز پذیرایی': { icon: '🍷', color: 'from-red-400 to-rose-500' },
      'ویترین': { icon: '🪟', color: 'from-cyan-400 to-sky-500' },
      'میز بار': { icon: '🍸', color: 'from-violet-400 to-purple-500' },
      'میز کنار تخت': { icon: '🌙', color: 'from-indigo-300 to-purple-400' },
      'نیمکت': { icon: '🪑', color: 'from-amber-600 to-orange-600' },
      'پارتیشن': { icon: '🧱', color: 'from-stone-400 to-stone-600' },
      'وایت‌بورد': { icon: '📋', color: 'from-emerald-400 to-green-500' },
      'جزیره آشپزخانه': { icon: '🏠', color: 'from-amber-400 to-orange-400' },
      'میز اتو': { icon: '👕', color: 'from-blue-300 to-indigo-400' },
      'میز لپتاپ': { icon: '💻', color: 'from-slate-500 to-gray-600' },
      'میز مینیمال': { icon: '⬜', color: 'from-gray-300 to-gray-400' },
      'میز چوبی': { icon: '🪵', color: 'from-amber-500 to-orange-600' },
    };
    
    return Array.from(categorySet).map(cat => ({
      id: cat,
      name: cat,
      icon: categoryIcons[cat]?.icon || '📦',
      color: categoryIcons[cat]?.color || 'from-gray-400 to-gray-500'
    }));
  }, [discountedProducts]);

  // ===== فقط ۶ دسته اول برای نمایش =====
  const visibleCategories = useMemo(() => {
    return showAllCategories ? allCategories : allCategories.slice(0, 6);
  }, [allCategories, showAllCategories]);

  const hasMoreCategories = allCategories.length > 6;

  // === Filtering & Sorting Logic ===
  const filteredProducts = useMemo(() => {
    let result = discountedProducts.filter(product => {
      const finalPrice = calculateDiscountPrice(product.price, product.discountPercentage);
      
      const matchCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);
      const matchPrice = finalPrice >= priceRange.min && finalPrice <= priceRange.max;
      const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchPrice && matchSearch;
    });

    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => calculateDiscountPrice(a.price, a.discountPercentage) - 
          calculateDiscountPrice(b.price, b.discountPercentage));
        break;
      case 'price-high':
        result.sort((a, b) => calculateDiscountPrice(b.price, b.discountPercentage) - 
          calculateDiscountPrice(a.price, a.discountPercentage));
        break;
      case 'discount':
        result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return result;
  }, [selectedCategories, priceRange, searchQuery, sortBy, discountedProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // === Handlers ===
  const handleCategoryChange = useCallback((category) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategories(prev => 
        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
      );
      setCurrentPage(1);
      setLoading(false);
    }, 400);
  }, []);

  const applyPriceFilter = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPriceRange(tempPrice);
      setCurrentPage(1);
      setLoading(false);
    }, 400);
  }, [tempPrice]);

  const clearAllFilters = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategories([]);
      setPriceRange(getProductPriceRange);
      setTempPrice(getProductPriceRange);
      setSearchQuery('');
      setSortBy('default');
      setCurrentPage(1);
      setLoading(false);
    }, 400);
  }, [getProductPriceRange]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // ===== جلوگیری از اسکرول صفحه پشت =====
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [isFilterOpen]);

  // ===== محاسبه درصد برای اسلایدر =====
  const getPercentage = useCallback((value) => {
    const range = getProductPriceRange.max - getProductPriceRange.min;
    if (range === 0) return 0;
    return ((value - getProductPriceRange.min) / range) * 100;
  }, [getProductPriceRange]);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
      />
    ));
  };

  // ===== تابع بستن فیلتر =====
  const closeFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 font-sans" dir="rtl">
      
      {/* ===== HERO SECTION ===== */}
      <div className="relative bg-gradient-to-br from-[#8b9b7e] via-[#7a8a6e] to-[#6b7d5e] text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-medium">🔥 تخفیف‌های ویژه</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            تخفیفات شگفت‌انگیز
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            بهترین محصولات با کیفیت بالا و قیمت‌های استثنایی
          </p>
          
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{discountedProducts.length}</div>
              <div className="text-xs text-white/60">محصول تخفیف‌دار</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{allCategories.length}</div>
              <div className="text-xs text-white/60">دسته‌بندی</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">۵⭐</div>
              <div className="text-xs text-white/60">امتیاز کاربران</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-6">
        
        {/* ===== SIDEBAR FILTERS - بدون sticky و fixed ===== */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* ===== هدر فیلتر ===== */}
            <div className="border-b border-gray-100 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#8b9b7e]" />
                فیلترها
              </h2>
              {(selectedCategories.length > 0 || priceRange.min !== getProductPriceRange.min || searchQuery) && (
                <button 
                  onClick={clearAllFilters}
                  className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  حذف همه
                </button>
              )}
            </div>

            {/* ===== محتوای فیلترها ===== */}
            <div className="p-4">
              {/* ===== SEARCH ===== */}
              <div className="mb-4">
                <div className="relative group">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#8b9b7e] transition-colors" />
                  <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pr-10 pl-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#8b9b7e] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* ===== CATEGORIES ===== */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#8b9b7e] rounded-full"></span>
                    دسته‌بندی
                  </h3>
                  <span className="text-[10px] text-gray-400">
                    {selectedCategories.length} انتخاب شده
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {visibleCategories.map(({ id, name, icon, color }) => (
                    <label 
                      key={id} 
                      className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all duration-300 border-2 flex-1 min-w-[calc(50%-0.5rem)] ${
                        selectedCategories.includes(id) 
                          ? 'border-[#8b9b7e] bg-[#8b9b7e]/10 shadow-md' 
                          : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(id)}
                        onChange={() => handleCategoryChange(id)}
                        className="hidden" 
                      />
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white text-[10px] shadow-md flex-shrink-0`}>
                        {icon}
                      </div>
                      <span className="text-[10px] text-gray-700 font-medium truncate">{name}</span>
                    </label>
                  ))}
                </div>

                {hasMoreCategories && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="w-full mt-2 py-1.5 text-[10px] font-medium text-[#8b9b7e] hover:text-[#6b7d5e] transition-colors flex items-center justify-center gap-1 border border-[#8b9b7e]/20 rounded-xl hover:bg-[#8b9b7e]/5"
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronUp className="w-3 h-3" />
                        نمایش کمتر
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        نمایش همه ({allCategories.length} دسته)
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* ===== PRICE RANGE ===== */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 text-sm flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#8b9b7e] rounded-full"></span>
                  محدوده قیمت (تومان)
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl px-2 py-1.5 text-center border-2 border-gray-200">
                    <span className="text-[8px] text-gray-400 block">حداقل</span>
                    <span className="text-xs font-bold text-gray-700">
                      {tempPrice.min.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <span className="text-gray-300 text-xs">تا</span>
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl px-2 py-1.5 text-center border-2 border-gray-200">
                    <span className="text-[8px] text-gray-400 block">حداکثر</span>
                    <span className="text-xs font-bold text-gray-700">
                      {tempPrice.max.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>

                <div className="relative pt-2 pb-6">
                  <div className="relative h-1.5 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-[#8b9b7e] to-[#6b7d5e] rounded-full transition-all duration-200"
                      style={{
                        left: `${getPercentage(tempPrice.min)}%`,
                        right: `${100 - getPercentage(tempPrice.max)}%`
                      }}
                    />
                    
                    <input
                      type="range"
                      min={getProductPriceRange.min}
                      max={getProductPriceRange.max}
                      step={100000}
                      value={tempPrice.min}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= tempPrice.max) {
                          setTempPrice(prev => ({ ...prev, min: val }));
                        }
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                      style={{ zIndex: 10 }}
                    />
                    
                    <input
                      type="range"
                      min={getProductPriceRange.min}
                      max={getProductPriceRange.max}
                      step={100000}
                      value={tempPrice.max}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= tempPrice.min) {
                          setTempPrice(prev => ({ ...prev, max: val }));
                        }
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                      style={{ zIndex: 10 }}
                    />

                    <style jsx>{`
                      input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #8b9b7e;
                        box-shadow: 0 2px 12px rgba(139, 155, 126, 0.3);
                        cursor: pointer;
                        pointer-events: auto;
                        transition: all 0.2s;
                      }
                      input[type="range"]::-webkit-slider-thumb:hover {
                        transform: scale(1.15);
                        box-shadow: 0 4px 20px rgba(139, 155, 126, 0.4);
                      }
                      input[type="range"]::-moz-range-thumb {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #8b9b7e;
                        box-shadow: 0 2px 12px rgba(139, 155, 126, 0.3);
                        cursor: pointer;
                        pointer-events: auto;
                      }
                    `}</style>

                    <div className="absolute -bottom-5 right-0 text-[8px] text-gray-400">
                      {getProductPriceRange.min.toLocaleString('fa-IR')}
                    </div>
                    <div className="absolute -bottom-5 left-0 text-[8px] text-gray-400">
                      {getProductPriceRange.max.toLocaleString('fa-IR')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {[
                    { label: 'زیر ۲م', min: getProductPriceRange.min, max: 2000000 },
                    { label: '۲-۵م', min: 2000000, max: 5000000 },
                    { label: '۵-۱۰م', min: 5000000, max: 10000000 },
                    { label: 'بالای ۱۰م', min: 10000000, max: getProductPriceRange.max }
                  ].map((preset, index) => {
                    const isActive = tempPrice.min === preset.min && tempPrice.max === preset.max;
                    return (
                      <button
                        key={index}
                        onClick={() => setTempPrice({ min: preset.min, max: preset.max })}
                        className={`flex-1 text-[8px] px-1.5 py-1 rounded-lg transition-all duration-300 font-medium ${
                          isActive
                            ? 'bg-[#8b9b7e] text-white shadow-md shadow-[#8b9b7e]/20'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={applyPriceFilter}
                  className="w-full mt-3 bg-gradient-to-r from-[#8b9b7e] to-[#6b7d5e] text-white py-2 rounded-xl text-xs font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  اعمال قیمت
                </button>
              </div>

              {/* Active Filters Tags */}
              {(selectedCategories.length > 0 || priceRange.min !== getProductPriceRange.min || searchQuery) && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 mb-1.5">فیلترهای فعال:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCategories.map(cat => {
                      const category = allCategories.find(c => c.id === cat);
                      return (
                        <span key={cat} className="bg-[#8b9b7e]/10 text-[#8b9b7e] px-2 py-0.5 rounded-lg text-[8px] font-medium flex items-center gap-0.5 border border-[#8b9b7e]/20">
                          {category?.icon} {category?.name}
                          <button onClick={() => handleCategoryChange(cat)} className="hover:text-red-500">
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      );
                    })}
                    {(priceRange.min !== getProductPriceRange.min || priceRange.max !== getProductPriceRange.max) && (
                      <span className="bg-[#8b9b7e]/10 text-[#8b9b7e] px-2 py-0.5 rounded-lg text-[8px] font-medium flex items-center gap-0.5 border border-[#8b9b7e]/20">
                        {priceRange.min.toLocaleString('fa-IR')} - {priceRange.max.toLocaleString('fa-IR')}
                        <button onClick={() => {
                          setPriceRange(getProductPriceRange);
                          setTempPrice(getProductPriceRange);
                        }}>
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 min-w-0">
          
          {/* ===== TOOLBAR ===== */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">نمایش</span>
                <span className="font-bold text-[#8b9b7e] mx-1.5">
                  {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                </span>
                <span className="font-medium">تا</span>
                <span className="font-bold text-[#8b9b7e] mx-1.5">
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                </span>
                <span className="font-medium">از</span>
                <span className="font-bold text-gray-800 mx-1.5">{filteredProducts.length}</span>
                <span className="font-medium">محصول تخفیف‌دار</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#8b9b7e] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="default">مرتب‌سازی</option>
                <option value="price-low">💰 ارزان‌ترین</option>
                <option value="price-high">💰 گران‌ترین</option>
                <option value="discount">🔥 بیشترین تخفیف</option>
                <option value="rating">⭐ بالاترین امتیاز</option>
              </select>
            </div>
          </div>

          {/* ===== PRODUCTS ===== */}
          {loading ? (
            <div className="flex justify-center items-center h-96 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8b9b7e]/20 border-t-[#8b9b7e] mx-auto"></div>
                </div>
                <p className="mt-4 text-gray-500 text-sm">در حال بارگذاری محصولات...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 py-20 text-center">
              <div className="text-7xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">محصول تخفیف‌داری یافت نشد!</h3>
              <p className="text-gray-500">لطفاً فیلترهای خود را تغییر دهید.</p>
              <button 
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2.5 bg-[#8b9b7e] text-white rounded-xl text-sm font-medium hover:bg-[#6b7d5e] transition-colors"
              >
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-1.5 sm:-mx-2.5">
              {paginatedProducts.map((product) => {
                const finalPrice = calculateDiscountPrice(product.price, product.discountPercentage);
                const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
                const isWishlisted = wishlist.includes(product.id);
                
                return (
                  <div 
                    key={product.id} 
                    className="w-1/2 px-1.5 sm:px-2.5 mb-3 sm:mb-5 xl:w-1/3"
                  >
                    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-[#8b9b7e]/20 h-full flex flex-col">
                      <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                        />
                        
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                        >
                          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'
                          }`} />
                        </button>

                        {hasDiscount && (
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                            <span>{product.discountPercentage}%</span>
                            <span className="text-white/80 hidden sm:inline">تخفیف</span>
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2 sm:pb-4">
                          <button className="bg-white text-gray-800 shadow-xl px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-bold hover:bg-[#8b9b7e] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-1 sm:gap-2">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">مشاهده سریع</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-5 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <span className="text-[8px] sm:text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full truncate max-w-[60%]">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-0.5">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-gray-800 text-[11px] sm:text-sm mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] group-hover:text-[#8b9b7e] transition-colors flex-1">
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
                          <div>
                            {hasDiscount ? (
                              <>
                                <span className="text-gray-400 line-through text-[8px] sm:text-[10px] block mb-0.5">
                                  {product.price.toLocaleString('fa-IR')}
                                </span>
                                <span className="text-[#8b9b7e] font-extrabold text-xs sm:text-lg">
                                  {finalPrice.toLocaleString('fa-IR')}
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-800 font-extrabold text-xs sm:text-lg">
                                {product.price.toLocaleString('fa-IR')}
                              </span>
                            )}
                          </div>
                          
                          <button className="p-1.5 sm:p-2.5 bg-[#8b9b7e]/10 rounded-lg sm:rounded-xl hover:bg-[#8b9b7e] hover:text-white transition-all duration-300 group/btn">
                            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8b9b7e] group-hover/btn:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ===== PAGINATION ===== */}
          {!loading && totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              totalPages={totalPages} 
            />
          )}

        </main>
      </div>

      {/* ===== مودال فیلتر برای موبایل ===== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeFilter}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100 p-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#8b9b7e]" />
                فیلترها
              </h2>
              <div className="flex items-center gap-2">
                {(selectedCategories.length > 0 || priceRange.min !== getProductPriceRange.min || searchQuery) && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    حذف همه
                  </button>
                )}
                <button 
                  onClick={closeFilter}
                  className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors shadow-md"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* ===== SEARCH ===== */}
              <div className="mb-4">
                <div className="relative group">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#8b9b7e] transition-colors" />
                  <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pr-10 pl-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#8b9b7e] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* ===== CATEGORIES ===== */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#8b9b7e] rounded-full"></span>
                    دسته‌بندی
                  </h3>
                  <span className="text-[10px] text-gray-400">
                    {selectedCategories.length} انتخاب شده
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {visibleCategories.map(({ id, name, icon, color }) => (
                    <label 
                      key={id} 
                      className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all duration-300 border-2 flex-1 min-w-[calc(50%-0.5rem)] ${
                        selectedCategories.includes(id) 
                          ? 'border-[#8b9b7e] bg-[#8b9b7e]/10 shadow-md' 
                          : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(id)}
                        onChange={() => handleCategoryChange(id)}
                        className="hidden" 
                      />
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white text-[10px] shadow-md flex-shrink-0`}>
                        {icon}
                      </div>
                      <span className="text-[10px] text-gray-700 font-medium truncate">{name}</span>
                    </label>
                  ))}
                </div>

                {hasMoreCategories && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="w-full mt-2 py-1.5 text-[10px] font-medium text-[#8b9b7e] hover:text-[#6b7d5e] transition-colors flex items-center justify-center gap-1 border border-[#8b9b7e]/20 rounded-xl hover:bg-[#8b9b7e]/5"
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronUp className="w-3 h-3" />
                        نمایش کمتر
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        نمایش همه ({allCategories.length} دسته)
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* ===== PRICE RANGE ===== */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 text-sm flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#8b9b7e] rounded-full"></span>
                  محدوده قیمت (تومان)
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl px-2 py-1.5 text-center border-2 border-gray-200">
                    <span className="text-[8px] text-gray-400 block">حداقل</span>
                    <span className="text-xs font-bold text-gray-700">
                      {tempPrice.min.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <span className="text-gray-300 text-xs">تا</span>
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl px-2 py-1.5 text-center border-2 border-gray-200">
                    <span className="text-[8px] text-gray-400 block">حداکثر</span>
                    <span className="text-xs font-bold text-gray-700">
                      {tempPrice.max.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>

                <div className="relative pt-2 pb-6">
                  <div className="relative h-1.5 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-[#8b9b7e] to-[#6b7d5e] rounded-full transition-all duration-200"
                      style={{
                        left: `${getPercentage(tempPrice.min)}%`,
                        right: `${100 - getPercentage(tempPrice.max)}%`
                      }}
                    />
                    
                    <input
                      type="range"
                      min={getProductPriceRange.min}
                      max={getProductPriceRange.max}
                      step={100000}
                      value={tempPrice.min}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= tempPrice.max) {
                          setTempPrice(prev => ({ ...prev, min: val }));
                        }
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                      style={{ zIndex: 10 }}
                    />
                    
                    <input
                      type="range"
                      min={getProductPriceRange.min}
                      max={getProductPriceRange.max}
                      step={100000}
                      value={tempPrice.max}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= tempPrice.min) {
                          setTempPrice(prev => ({ ...prev, max: val }));
                        }
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
                      style={{ zIndex: 10 }}
                    />

                    <style jsx>{`
                      input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #8b9b7e;
                        box-shadow: 0 2px 12px rgba(139, 155, 126, 0.3);
                        cursor: pointer;
                        pointer-events: auto;
                        transition: all 0.2s;
                      }
                      input[type="range"]::-webkit-slider-thumb:hover {
                        transform: scale(1.15);
                        box-shadow: 0 4px 20px rgba(139, 155, 126, 0.4);
                      }
                      input[type="range"]::-moz-range-thumb {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #8b9b7e;
                        box-shadow: 0 2px 12px rgba(139, 155, 126, 0.3);
                        cursor: pointer;
                        pointer-events: auto;
                      }
                    `}</style>

                    <div className="absolute -bottom-5 right-0 text-[8px] text-gray-400">
                      {getProductPriceRange.min.toLocaleString('fa-IR')}
                    </div>
                    <div className="absolute -bottom-5 left-0 text-[8px] text-gray-400">
                      {getProductPriceRange.max.toLocaleString('fa-IR')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {[
                    { label: 'زیر ۲م', min: getProductPriceRange.min, max: 2000000 },
                    { label: '۲-۵م', min: 2000000, max: 5000000 },
                    { label: '۵-۱۰م', min: 5000000, max: 10000000 },
                    { label: 'بالای ۱۰م', min: 10000000, max: getProductPriceRange.max }
                  ].map((preset, index) => {
                    const isActive = tempPrice.min === preset.min && tempPrice.max === preset.max;
                    return (
                      <button
                        key={index}
                        onClick={() => setTempPrice({ min: preset.min, max: preset.max })}
                        className={`flex-1 text-[8px] px-1.5 py-1 rounded-lg transition-all duration-300 font-medium ${
                          isActive
                            ? 'bg-[#8b9b7e] text-white shadow-md shadow-[#8b9b7e]/20'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={applyPriceFilter}
                  className="w-full mt-3 bg-gradient-to-r from-[#8b9b7e] to-[#6b7d5e] text-white py-2 rounded-xl text-xs font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  اعمال قیمت
                </button>
              </div>

              {/* Active Filters Tags */}
              {(selectedCategories.length > 0 || priceRange.min !== getProductPriceRange.min || searchQuery) && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 mb-1.5">فیلترهای فعال:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCategories.map(cat => {
                      const category = allCategories.find(c => c.id === cat);
                      return (
                        <span key={cat} className="bg-[#8b9b7e]/10 text-[#8b9b7e] px-2 py-0.5 rounded-lg text-[8px] font-medium flex items-center gap-0.5 border border-[#8b9b7e]/20">
                          {category?.icon} {category?.name}
                          <button onClick={() => handleCategoryChange(cat)} className="hover:text-red-500">
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      );
                    })}
                    {(priceRange.min !== getProductPriceRange.min || priceRange.max !== getProductPriceRange.max) && (
                      <span className="bg-[#8b9b7e]/10 text-[#8b9b7e] px-2 py-0.5 rounded-lg text-[8px] font-medium flex items-center gap-0.5 border border-[#8b9b7e]/20">
                        {priceRange.min.toLocaleString('fa-IR')} - {priceRange.max.toLocaleString('fa-IR')}
                        <button onClick={() => {
                          setPriceRange(getProductPriceRange);
                          setTempPrice(getProductPriceRange);
                        }}>
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// Pagination Component
// ==========================================
const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const activeRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({ left: '0px', width: '0px', opacity: 0 });

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const getVisiblePages = useMemo(() => {
    if (!isMobile) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const currentIndex = currentPage - 1;
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(totalPages, currentIndex + 2);
    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  }, [isMobile, currentPage, totalPages]);

  const updateLinePosition = useCallback(() => {
    if (!activeRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const activeRect = activeRef.current.getBoundingClientRect();
    setLineStyle({
      left: `${activeRect.left - containerRect.left}px`,
      width: `${activeRect.width}px`,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(updateLinePosition);
    window.addEventListener('resize', updateLinePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateLinePosition);
    };
  }, [currentPage, updateLinePosition]);

  return (
    <div className="w-full mt-12" dir="ltr">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-1 shadow-2xl">
          <div className="relative flex items-center justify-between bg-slate-900/80 rounded-xl p-1.5 backdrop-blur-sm">
            
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">قبلی</span>
            </button>

            <div ref={containerRef} className="relative flex items-center gap-1 px-2">
              {getVisiblePages.map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    ref={isActive ? activeRef : null}
                    onClick={() => setCurrentPage(page)}
                    className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                      isActive 
                        ? 'text-white' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <div
                className="absolute bottom-1 z-0 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all duration-300 ease-out"
                style={{ 
                  left: lineStyle.left, 
                  width: lineStyle.width, 
                  opacity: lineStyle.opacity 
                }}
              />
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">بعدی</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="text-center mt-3 text-xs text-gray-400">
          صفحه {currentPage} از {totalPages}
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;