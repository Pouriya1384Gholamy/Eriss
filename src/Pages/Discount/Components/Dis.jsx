import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, calculateDiscountPrice } from '../../../data/products';
import { 
  ChevronLeft, ChevronRight, X, Filter, Search, Star, 
  TrendingDown, ShoppingBag, Heart, Eye, SlidersHorizontal,
  ChevronDown, ChevronUp, Loader2, Sparkles, Gift
} from 'lucide-react';

const Dis = () => {
  const navigate = useNavigate();

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
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isFilterApplying, setIsFilterApplying] = useState(false);
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
      'میز ناهارخوری': { icon: '🍽️', color: 'from-amber-600 to-orange-600' },
      'صندلی': { icon: '🪑', color: 'from-blue-500 to-indigo-600' },
      'کنسول': { icon: '🪞', color: 'from-purple-500 to-pink-600' },
      'میز جلو مبلی': { icon: '🪵', color: 'from-emerald-500 to-teal-600' },
      'کتابخانه': { icon: '📚', color: 'from-rose-500 to-red-600' },
      'میز تحریر': { icon: '✏️', color: 'from-cyan-500 to-blue-600' },
      'میز آرایش': { icon: '💄', color: 'from-pink-500 to-rose-600' },
      'میز سرو': { icon: '🧁', color: 'from-yellow-500 to-amber-600' },
      'میز تلویزیون': { icon: '📺', color: 'from-gray-500 to-gray-700' },
      'کمد': { icon: '🚪', color: 'from-amber-600 to-yellow-700' },
      'تخت': { icon: '🛏️', color: 'from-indigo-500 to-purple-600' },
      'میز کار': { icon: '💼', color: 'from-slate-500 to-slate-700' },
      'میز عسلی': { icon: '🍯', color: 'from-orange-500 to-amber-600' },
      'میز پذیرایی': { icon: '🍷', color: 'from-red-500 to-rose-600' },
      'ویترین': { icon: '🪟', color: 'from-cyan-500 to-sky-600' },
      'میز بار': { icon: '🍸', color: 'from-violet-500 to-purple-600' },
      'میز کنار تخت': { icon: '🌙', color: 'from-indigo-400 to-purple-500' },
      'نیمکت': { icon: '🪑', color: 'from-amber-700 to-orange-700' },
      'پارتیشن': { icon: '🧱', color: 'from-stone-500 to-stone-700' },
      'وایت‌بورد': { icon: '📋', color: 'from-emerald-500 to-green-600' },
      'جزیره آشپزخانه': { icon: '🏠', color: 'from-amber-500 to-orange-500' },
      'میز اتو': { icon: '👕', color: 'from-blue-400 to-indigo-500' },
      'میز لپتاپ': { icon: '💻', color: 'from-slate-600 to-gray-700' },
      'میز مینیمال': { icon: '⬜', color: 'from-gray-400 to-gray-500' },
      'میز چوبی': { icon: '🪵', color: 'from-amber-600 to-orange-700' },
    };
    
    return Array.from(categorySet).map(cat => ({
      id: cat,
      name: cat,
      icon: categoryIcons[cat]?.icon || '📦',
      color: categoryIcons[cat]?.color || 'from-gray-500 to-gray-600'
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
    setIsFilterApplying(true);
    setTimeout(() => {
      setSelectedCategories(prev => 
        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
      );
      setCurrentPage(1);
      setIsFilterApplying(false);
    }, 500);
  }, []);

  const applyPriceFilter = useCallback(() => {
    setIsFilterApplying(true);
    setTimeout(() => {
      setPriceRange(tempPrice);
      setCurrentPage(1);
      setIsFilterApplying(false);
    }, 500);
  }, [tempPrice]);

  const clearAllFilters = useCallback(() => {
    setIsFilterApplying(true);
    setTimeout(() => {
      setSelectedCategories([]);
      setPriceRange(getProductPriceRange);
      setTempPrice(getProductPriceRange);
      setSearchQuery('');
      setSortBy('default');
      setCurrentPage(1);
      setIsFilterApplying(false);
    }, 500);
  }, [getProductPriceRange]);

  // ===== جستجو با لودینگ =====
  const handleSearch = useCallback((query) => {
    setIsSearchLoading(true);
    setSearchQuery(query);
    setCurrentPage(1);
    setTimeout(() => {
      setIsSearchLoading(false);
    }, 400);
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // ===== تابع هدایت به صفحه محصول =====
  const handleQuickView = useCallback((productId) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  // ===== جلوگیری از اسکرول صفحه پشت و مخفی کردن هدر =====
  useEffect(() => {
    const header = document.querySelector('header');
    
    if (isFilterOpen) {
      if (header) {
        header.style.display = 'none';
      }
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      if (header) {
        header.style.display = 'flex';
      }
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    
    return () => {
      const headerCleanup = document.querySelector('header');
      if (headerCleanup) {
        headerCleanup.style.display = 'flex';
      }
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [isFilterOpen]);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--color-third)]'}`}
      />
    ));
  };

  const closeFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans" dir="rtl">
      
      {/* ===== HERO SECTION با طراحی لوکس تیره ===== */}
      <div className="relative bg-gradient-to-br from-[var(--color-background)] via-[var(--color-sixeth)] to-[var(--color-background)] text-[var(--color-text)] py-20 px-4 overflow-hidden border-b border-[var(--color-border)]/30">
        {/* حلقه‌های تزئینی */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* خطوط تزئینی */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-30"></div>
        
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 backdrop-blur-sm border border-[var(--color-border)] rounded-full px-6 py-2.5 mb-6">
            <Sparkles className="w-4 h-4 text-[var(--color-primary)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--color-primary)]">تخفیف‌های ویژه زمستانی</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-primary)] to-[var(--color-text)] bg-clip-text text-transparent">
            تخفیفات شگفت‌انگیز
          </h1>
          <p className="text-lg text-[var(--color-fiveth)] max-w-2xl mx-auto leading-relaxed">
            بهترین محصولات با کیفیت بالا و قیمت‌های استثنایی
          </p>
          
          <div className="flex justify-center gap-12 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)]">{discountedProducts.length}</div>
              <div className="text-xs text-[var(--color-fiveth)] mt-1">محصول تخفیف‌دار</div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]/50"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)]">{allCategories.length}</div>
              <div className="text-xs text-[var(--color-fiveth)] mt-1">دسته‌بندی</div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]/50"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary)]">۵⭐</div>
              <div className="text-xs text-[var(--color-fiveth)] mt-1">امتیاز کاربران</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-6">
        
        {/* ===== SIDEBAR FILTERS با طراحی تیره ===== */}
        <aside className={`lg:w-80 flex-shrink-0 transition-all duration-300 ${
          isFilterOpen ? 'fixed inset-0 z-50 lg:relative lg:bg-transparent lg:p-0' : 'hidden lg:block'
        }`}>
          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-[var(--color-background)]/80 backdrop-blur-md lg:hidden"
              onClick={closeFilter}
            />
          )}
          
          <div 
            className={`bg-[var(--color-sixeth)] border border-[var(--color-border)]/40 shadow-2xl shadow-black/50 overflow-y-auto transition-all duration-300 ${
              isFilterOpen 
                ? 'fixed top-0 right-0 bottom-0 w-full max-w-md z-50 rounded-none' 
                : 'lg:sticky lg:top-24 rounded-2xl'
            }`}
            style={{
              maxHeight: isFilterOpen ? '100vh' : '80vh',
            }}
            dir="rtl"
          >
            
            <style>{`
              div::-webkit-scrollbar {
                width: 4px;
              }
              div::-webkit-scrollbar-track {
                background: var(--color-background);
                border-radius: 10px;
              }
              div::-webkit-scrollbar-thumb {
                background: var(--color-primary);
                border-radius: 10px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: var(--color-secondary);
              }
            `}</style>

            <div className="sticky top-0 bg-[var(--color-sixeth)]/95 backdrop-blur-sm z-10 border-b border-[var(--color-border)]/30 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
                <Filter className="w-5 h-5 text-[var(--color-primary)]" />
                فیلترها
              </h2>
              <div className="flex items-center lg:hidden gap-2">
                {(selectedCategories.length > 0 || priceRange.min !== getProductPriceRange.min || searchQuery) && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    حذف همه
                  </button>
                )}
                <button 
                  onClick={closeFilter}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-colors border border-red-500/20"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* ===== SEARCH ===== */}
              <div className="mb-6">
                <div className="relative group">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-fiveth)] w-4 h-4 group-focus-within:text-[var(--color-primary)] transition-colors" />
                  <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)]/40 rounded-xl text-sm text-[var(--color-text)] placeholder:text-[var(--color-fiveth)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                  />
                  {isSearchLoading && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-4 h-4 text-[var(--color-primary)] animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* ===== CATEGORIES ===== */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[var(--color-text)] text-sm flex items-center gap-2">
                    <span className="w-1 h-4 bg-[var(--color-primary)] rounded-full"></span>
                    دسته‌بندی
                  </h3>
                  <span className="text-[10px] text-[var(--color-fiveth)]">
                    {selectedCategories.length} انتخاب شده
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {visibleCategories.map(({ id, name, icon, color }) => (
                    <label 
                      key={id} 
                      className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all duration-300 border-2 flex-1 min-w-[calc(50%-0.5rem)] ${
                        selectedCategories.includes(id) 
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-lg shadow-[var(--color-primary)]/10' 
                          : 'border-transparent hover:border-[var(--color-border)]/40 hover:bg-[var(--color-background)]'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(id)}
                        onChange={() => handleCategoryChange(id)}
                        className="hidden" 
                      />
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs shadow-lg flex-shrink-0`}>
                        {icon}
                      </div>
                      <span className="text-[11px] text-[var(--color-text)] font-medium truncate">{name}</span>
                    </label>
                  ))}
                </div>

                {hasMoreCategories && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="w-full mt-3 py-2 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors flex items-center justify-center gap-1 border border-[var(--color-border)]/30 rounded-xl hover:bg-[var(--color-primary)]/5"
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        نمایش کمتر
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" />
                        نمایش همه ({allCategories.length} دسته)
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* ===== PRICE RANGE ===== */}
              <div className="mb-4">
                <h3 className="font-semibold text-[var(--color-text)] mb-4 text-sm flex items-center gap-2">
                  <span className="w-1 h-4 bg-[var(--color-primary)] rounded-full"></span>
                  محدوده قیمت (تومان)
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 bg-[var(--color-background)] rounded-xl px-3 py-2 text-center border border-[var(--color-border)]/30">
                    <span className="text-[10px] text-[var(--color-fiveth)] block">حداقل</span>
                    <span className="text-sm font-bold text-[var(--color-text)]">
                      {tempPrice.min.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <span className="text-[var(--color-third)] text-xs">تا</span>
                  <div className="flex-1 bg-[var(--color-background)] rounded-xl px-3 py-2 text-center border border-[var(--color-border)]/30">
                    <span className="text-[10px] text-[var(--color-fiveth)] block">حداکثر</span>
                    <span className="text-sm font-bold text-[var(--color-text)]">
                      {tempPrice.max.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>

                <div className="relative pt-3 pb-8">
                  <div className="relative h-1.5 bg-[var(--color-background)] rounded-full border border-[var(--color-border)]/30">
                    {/* Min Handle */}
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
                      className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent"
                      style={{ zIndex: 10 }}
                    />
                    
                    {/* Max Handle */}
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
                      className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent"
                      style={{ zIndex: 10 }}
                    />

                    <style>{`
                      input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: var(--color-primary);
                        border: 3px solid var(--color-background);
                        box-shadow: 0 0 20px rgba(105, 116, 72, 0.4), 0 0 60px rgba(105, 116, 72, 0.2);
                        cursor: pointer;
                        pointer-events: auto;
                        transition: all 0.2s;
                      }
                      input[type="range"]::-webkit-slider-thumb:hover {
                        transform: scale(1.2);
                        box-shadow: 0 0 30px rgba(105, 116, 72, 0.6), 0 0 80px rgba(105, 116, 72, 0.3);
                      }
                      input[type="range"]::-moz-range-thumb {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: var(--color-primary);
                        border: 3px solid var(--color-background);
                        box-shadow: 0 0 20px rgba(105, 116, 72, 0.4);
                        cursor: pointer;
                        pointer-events: auto;
                      }
                    `}</style>

                    <div className="absolute -bottom-6 right-0 text-[10px] text-[var(--color-fiveth)]">
                      {getProductPriceRange.min.toLocaleString('fa-IR')}
                    </div>
                    <div className="absolute -bottom-6 left-0 text-[10px] text-[var(--color-fiveth)]">
                      {getProductPriceRange.max.toLocaleString('fa-IR')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
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
                        className={`flex-1 text-[10px] px-2 py-1.5 rounded-lg transition-all duration-300 font-medium ${
                          isActive
                            ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-lg shadow-[var(--color-primary)]/30'
                            : 'bg-[var(--color-background)] text-[var(--color-fiveth)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-text)] border border-[var(--color-border)]/30'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={applyPriceFilter}
                  disabled={isFilterApplying}
                  className="w-full mt-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] py-3 rounded-xl text-sm font-bold hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFilterApplying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      در حال اعمال...
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4" />
                      اعمال قیمت
                    </>
                  )}
                </button>
              </div>

              {(selectedCategories.length > 0 || priceRange.min !== getProductPriceRange.min || searchQuery) && (
                <div className="pt-4 border-t border-[var(--color-border)]/30">
                  <p className="text-xs text-[var(--color-fiveth)] mb-2">فیلترهای فعال:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCategories.map(cat => {
                      const category = allCategories.find(c => c.id === cat);
                      return (
                        <span key={cat} className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1 border border-[var(--color-primary)]/20">
                          {category?.icon} {category?.name}
                          <button onClick={() => handleCategoryChange(cat)} className="hover:text-red-400 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                    {(priceRange.min !== getProductPriceRange.min || priceRange.max !== getProductPriceRange.max) && (
                      <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1 border border-[var(--color-primary)]/20">
                        {priceRange.min.toLocaleString('fa-IR')} - {priceRange.max.toLocaleString('fa-IR')}
                        <button onClick={() => {
                          setPriceRange(getProductPriceRange);
                          setTempPrice(getProductPriceRange);
                        }} className="hover:text-red-400 transition-colors">
                          <X className="w-3 h-3" />
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
          <div className="bg-[var(--color-sixeth)] rounded-2xl shadow-2xl shadow-black/30 border border-[var(--color-border)]/40 p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden p-2.5 bg-[var(--color-background)] rounded-xl hover:bg-[var(--color-primary)]/10 transition-colors border border-[var(--color-border)]/30"
              >
                <SlidersHorizontal className="w-5 h-5 text-[var(--color-fiveth)]" />
              </button>
              
              <div className="text-sm text-[var(--color-fiveth)]">
                <span className="font-medium">نمایش</span>
                <span className="font-bold text-[var(--color-primary)] mx-1.5">
                  {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                </span>
                <span className="font-medium">تا</span>
                <span className="font-bold text-[var(--color-primary)] mx-1.5">
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                </span>
                <span className="font-medium">از</span>
                <span className="font-bold text-[var(--color-text)] mx-1.5">{filteredProducts.length}</span>
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
                className="bg-[var(--color-background)] border border-[var(--color-border)]/40 rounded-xl px-3 py-2 text-sm text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
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
          {isFilterApplying || isSearchLoading ? (
            <div className="flex justify-center items-center h-96 bg-[var(--color-sixeth)] rounded-2xl shadow-2xl shadow-black/30 border border-[var(--color-border)]/40">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
                  </div>
                </div>
                <p className="mt-4 text-[var(--color-fiveth)] text-sm">
                  {isSearchLoading ? 'در حال جستجو...' : 'در حال اعمال فیلترها...'}
                </p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-[var(--color-sixeth)] rounded-2xl shadow-2xl shadow-black/30 border border-[var(--color-border)]/40 py-20 text-center">
              <div className="text-7xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">محصول تخفیف‌داری یافت نشد!</h3>
              <p className="text-[var(--color-fiveth)]">لطفاً فیلترهای خود را تغییر دهید.</p>
              <button 
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-background)] rounded-xl text-sm font-bold hover:bg-[var(--color-secondary)] transition-all shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-xl"
              >
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {paginatedProducts.map((product) => {
                const finalPrice = calculateDiscountPrice(product.price, product.discountPercentage);
                const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
                const isWishlisted = wishlist.includes(product.id);
                
                return (
                  <div 
                    key={product.id} 
                    className="group bg-[var(--color-sixeth)] rounded-2xl border border-[var(--color-border)]/30 overflow-hidden hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:-translate-y-2 hover:scale-[1.02] flex flex-col"
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-background)] overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 bg-[var(--color-background)]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[var(--color-background)] transition-all duration-300 hover:scale-110 border border-[var(--color-border)]/30"
                      >
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                          isWishlisted ? 'fill-red-500 text-red-500' : 'text-[var(--color-fiveth)]'
                        }`} />
                      </button>

                      {hasDiscount && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                          <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{product.discountPercentage}%</span>
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2 sm:pb-4">
                        <button 
                          onClick={() => handleQuickView(product.id)}
                          className="bg-[var(--color-primary)] text-[var(--color-background)] shadow-xl px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-bold hover:bg-[var(--color-secondary)] transition-all duration-300 transform hover:scale-105 flex items-center gap-1 sm:gap-2"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">مشاهده سریع</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-[8px] sm:text-[10px] font-medium text-[var(--color-fiveth)] bg-[var(--color-background)] px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full truncate max-w-[60%] border border-[var(--color-border)]/20">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {renderStars(product.rating)}
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-[var(--color-text)] text-[11px] sm:text-sm mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] group-hover:text-[var(--color-primary)] transition-colors flex-1">
                        {product.title}
                      </h3>
                      
                      {/* ===== نمایش هر دو قیمت ===== */}
                      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-[var(--color-border)]/20 mt-auto">
                        <div>
                          {hasDiscount ? (
                            <>
                              <span className="text-[var(--color-third)] line-through text-[8px] sm:text-[10px] block mb-0.5">
                                {product.price.toLocaleString('fa-IR')} تومان
                              </span>
                              <span className="text-[var(--color-primary)] font-extrabold text-xs sm:text-lg">
                                {finalPrice.toLocaleString('fa-IR')} تومان
                              </span>
                            </>
                          ) : (
                            <span className="text-[var(--color-text)] font-extrabold text-xs sm:text-lg">
                              {product.price.toLocaleString('fa-IR')} تومان
                            </span>
                          )}
                        </div>
                        
                        <button className="p-1.5 sm:p-2.5 bg-[var(--color-primary)]/10 rounded-lg sm:rounded-xl hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 group/btn border border-[var(--color-border)]/20 hover:border-transparent">
                          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-primary)] group-hover/btn:text-[var(--color-background)]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ===== PAGINATION ===== */}
          {!isFilterApplying && !isSearchLoading && totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              totalPages={totalPages} 
            />
          )}

        </main>
      </div>
    </div>
  );
};

// ==========================================
// Pagination Component با طراحی تیره
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
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl p-1 shadow-2xl shadow-[var(--color-primary)]/30">
          <div className="relative flex items-center justify-between bg-[var(--color-background)]/95 backdrop-blur-sm rounded-xl p-1.5 border border-[var(--color-border)]/20">
            
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-secondary)] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
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
                        ? 'text-[var(--color-background)] bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/30' 
                        : 'text-[var(--color-fiveth)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary)]/10'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <div
                className="absolute bottom-1 z-0 h-0.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-[0_0_30px_rgba(105,116,72,0.5)] transition-all duration-300 ease-out"
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
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-secondary)] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">بعدی</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="text-center mt-3 text-xs text-[var(--color-fiveth)]">
          صفحه {currentPage} از {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Dis;