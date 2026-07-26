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
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--color-third)]'}`}
      />
    ));
  };

  const closeFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  // ===== کامپوننت نمایش فیلترهای فعال =====
  const ActiveFilters = () => {
    const hasActiveFilters = selectedCategories.length > 0 || 
                            priceRange.min !== getProductPriceRange.min || 
                            priceRange.max !== getProductPriceRange.max || 
                            searchQuery !== '';

    if (!hasActiveFilters) return null;

    return (
      <div className="bg-[var(--color-sixeth)] rounded-2xl shadow-md border border-[var(--color-border)]/40 p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] sm:text-sm font-medium text-[var(--color-fiveth)] ml-1 sm:ml-2">فیلترهای فعال:</span>
          
          {searchQuery && (
            <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 border border-[var(--color-primary)]/20">
              <Search className="w-3 h-3" />
              <span className="max-w-[60px] sm:max-w-none truncate">{searchQuery}</span>
              <button onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setIsSearching(false);
              }} className="hover:text-red-400 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {selectedCategories.map(cat => {
            const category = allCategories.find(c => c.id === cat);
            return (
              <span key={cat} className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 border border-[var(--color-primary)]/20">
                <span>{category?.icon}</span>
                <span className="hidden xs:inline">{category?.name}</span>
                <button onClick={() => handleCategoryChange(cat)} className="hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          
          {(priceRange.min !== getProductPriceRange.min || priceRange.max !== getProductPriceRange.max) && (
            <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 border border-[var(--color-primary)]/20">
              <span className="hidden xs:inline">💰</span>
              <span className="text-[9px] sm:text-xs">{priceRange.min.toLocaleString('fa-IR')} - {priceRange.max.toLocaleString('fa-IR')}</span>
              <button onClick={() => {
                setPriceRange(getProductPriceRange);
                setTempPrice(getProductPriceRange);
              }} className="hover:text-red-400 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          <button 
            onClick={clearAllFilters}
            className="text-[10px] sm:text-xs text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center gap-1 px-1.5 sm:px-2 py-1 bg-red-500/10 rounded-lg border border-red-500/20"
          >
            <X className="w-3 h-3" />
            <span className="hidden xs:inline">حذف همه</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans" dir="rtl">
      
      {/* ===== HERO SECTION ساده ===== */}
      <div className="bg-[var(--color-sixeth)] border-b border-[var(--color-border)]/40 py-8 sm:py-10 md:py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 border border-[var(--color-border)] rounded-full px-4 py-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="text-xs font-medium text-[var(--color-primary)]">تخفیف‌های ویژه</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)]">
            تخفیفات شگفت‌انگیز
          </h1>
          <p className="text-sm text-[var(--color-fiveth)] mt-1">
            {discountedProducts.length} محصول تخفیف‌دار
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8">
        
        {/* ===== SIDEBAR FILTERS ===== */}
        <aside className={`lg:w-72 xl:w-80 flex-shrink-0 transition-all duration-300 ${
          isFilterOpen ? 'fixed inset-0 z-50 lg:relative lg:bg-transparent lg:p-0' : 'hidden lg:block'
        }`}>
          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-[var(--color-background)]/80 backdrop-blur-md lg:hidden"
              onClick={closeFilter}
            />
          )}
          
          <div 
            className={`bg-[var(--color-sixeth)] border border-[var(--color-border)]/40 shadow-lg shadow-black/5 transition-all duration-300 ${
              isFilterOpen 
                ? 'fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 rounded-none' 
                : 'lg:sticky lg:top-24 rounded-2xl'
            }`}
            style={{
              height: isFilterOpen ? '100vh' : 'auto',
              maxHeight: isFilterOpen ? '100vh' : 'calc(100vh - 120px)',
            }}
            dir="rtl"
          >
            <style>{`
              .custom-scroll::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: var(--color-background);
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb:hover {
                background: var(--color-secondary);
              }
              .custom-scroll {
                scrollbar-width: thin;
                scrollbar-color: var(--color-primary) var(--color-background);
              }
            `}</style>

            <div className="sticky top-0 bg-[var(--color-sixeth)]/95 backdrop-blur-sm z-10 border-b border-[var(--color-border)]/30 p-3 sm:p-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)]" />
                فیلترها
              </h2>
              <div className="flex items-center lg:hidden gap-2">
                {(selectedCategories.length > 0 || priceRange.min !== getProductPriceRange.min || searchQuery) && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-[10px] sm:text-xs text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    حذف همه
                  </button>
                )}
                <button 
                  onClick={closeFilter}
                  className="p-1.5 sm:p-2 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-colors border border-red-500/20"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                </button>
              </div>
            </div>

            <div 
              className="p-3 sm:p-4 md:p-5 lg:p-6 custom-scroll" 
              style={{ 
                maxHeight: isFilterOpen ? 'calc(100vh - 180px)' : 'calc(100vh - 200px)',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              {/* ===== SEARCH ===== */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <div className="relative group">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-fiveth)] w-3.5 h-3.5 sm:w-4 sm:h-4 group-focus-within:text-[var(--color-primary)] transition-colors" />
                  <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pr-8 sm:pr-10 pl-3 sm:pl-4 py-2 sm:py-3 bg-[var(--color-background)] border border-[var(--color-border)]/40 rounded-xl text-xs sm:text-sm text-[var(--color-text)] placeholder:text-[var(--color-fiveth)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                  />
                  {isSearchLoading && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-primary)] animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* ===== CATEGORIES ===== */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="font-semibold text-[var(--color-text)] text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-1 h-3 sm:h-4 bg-[var(--color-primary)] rounded-full"></span>
                    دسته‌بندی
                  </h3>
                  <span className="text-[9px] sm:text-[10px] text-[var(--color-fiveth)]">
                    {selectedCategories.length} انتخاب شده
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {visibleCategories.map(({ id, name, icon, color }) => (
                    <label 
                      key={id} 
                      className={`flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 md:p-2.5 rounded-xl cursor-pointer transition-all duration-300 border-2 flex-1 min-w-[calc(50%-0.5rem)] ${
                        selectedCategories.includes(id) 
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-md shadow-[var(--color-primary)]/10' 
                          : 'border-transparent hover:border-[var(--color-border)]/40 hover:bg-[var(--color-background)]'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(id)}
                        onChange={() => handleCategoryChange(id)}
                        className="hidden" 
                      />
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white text-[10px] sm:text-xs shadow-lg flex-shrink-0`}>
                        {icon}
                      </div>
                      <span className="text-[9px] sm:text-[10px] md:text-[11px] text-[var(--color-text)] font-medium truncate">{name}</span>
                    </label>
                  ))}
                </div>

                {hasMoreCategories && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="w-full mt-2 sm:mt-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors flex items-center justify-center gap-1 border border-[var(--color-border)]/30 rounded-xl hover:bg-[var(--color-primary)]/5"
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        نمایش کمتر
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        نمایش همه ({allCategories.length} دسته)
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* ===== PRICE RANGE ===== */}
              <div className="mb-4">
                <h3 className="font-semibold text-[var(--color-text)] mb-3 sm:mb-4 text-xs sm:text-sm flex items-center gap-2">
                  <span className="w-1 h-3 sm:h-4 bg-[var(--color-primary)] rounded-full"></span>
                  محدوده قیمت (تومان)
                </h3>
                
                <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <div className="flex-1 bg-[var(--color-background)] rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-center border border-[var(--color-border)]/30">
                    <span className="text-[8px] sm:text-[10px] text-[var(--color-fiveth)] block">حداقل</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[var(--color-text)]">
                      {tempPrice.min.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <span className="text-[var(--color-third)] text-[10px] sm:text-xs">تا</span>
                  <div className="flex-1 bg-[var(--color-background)] rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-center border border-[var(--color-border)]/30">
                    <span className="text-[8px] sm:text-[10px] text-[var(--color-fiveth)] block">حداکثر</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[var(--color-text)]">
                      {tempPrice.max.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>

                <div className="relative pt-2 sm:pt-3 pb-6 sm:pb-8">
                  <div className="relative h-1.5 bg-[var(--color-background)] rounded-full border border-[var(--color-border)]/30">
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
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: var(--color-primary);
                        border: 3px solid var(--color-background);
                        box-shadow: 0 0 20px rgba(158, 173, 140, 0.3);
                        cursor: pointer;
                        pointer-events: auto;
                        transition: all 0.2s;
                      }
                      input[type="range"]::-webkit-slider-thumb:hover {
                        transform: scale(1.2);
                        box-shadow: 0 0 30px rgba(158, 173, 140, 0.5);
                      }
                      input[type="range"]::-moz-range-thumb {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: var(--color-primary);
                        border: 3px solid var(--color-background);
                        box-shadow: 0 0 20px rgba(158, 173, 140, 0.3);
                        cursor: pointer;
                        pointer-events: auto;
                      }
                    `}</style>

                    <div className="absolute -bottom-5 sm:-bottom-6 right-0 text-[8px] sm:text-[10px] text-[var(--color-fiveth)]">
                      {getProductPriceRange.min.toLocaleString('fa-IR')}
                    </div>
                    <div className="absolute -bottom-5 sm:-bottom-6 left-0 text-[8px] sm:text-[10px] text-[var(--color-fiveth)]">
                      {getProductPriceRange.max.toLocaleString('fa-IR')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
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
                        className={`flex-1 text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg transition-all duration-300 font-medium ${
                          isActive
                            ? 'bg-[var(--color-primary)] text-[var(--color-background)] shadow-md shadow-[var(--color-primary)]/30'
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
                  className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] py-2 sm:py-3 rounded-xl text-[11px] sm:text-sm font-bold hover:shadow-xl hover:shadow-[var(--color-primary)]/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFilterApplying ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                      در حال اعمال...
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      اعمال قیمت
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 min-w-0">
          
          {/* ===== TOOLBAR ===== */}
          <div className="bg-[var(--color-sixeth)] rounded-2xl shadow-md border border-[var(--color-border)]/40 p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-6 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 bg-[var(--color-background)] rounded-xl hover:bg-[var(--color-primary)]/10 transition-colors border border-[var(--color-border)]/30"
              >
                <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-fiveth)]" />
              </button>
              
              <div className="text-[10px] sm:text-xs md:text-sm text-[var(--color-fiveth)]">
                <span className="font-medium">نمایش</span>
                <span className="font-bold text-[var(--color-primary)] mx-1">
                  {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                </span>
                <span className="font-medium">تا</span>
                <span className="font-bold text-[var(--color-primary)] mx-1">
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                </span>
                <span className="font-medium">از</span>
                <span className="font-bold text-[var(--color-text)] mx-1">{filteredProducts.length}</span>
                <span className="hidden xs:inline font-medium">محصول</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[var(--color-background)] border border-[var(--color-border)]/40 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all appearance-none cursor-pointer max-w-[100px] sm:max-w-none"
              >
                <option value="default">مرتب‌سازی</option>
                <option value="price-low">💰 ارزان‌ترین</option>
                <option value="price-high">💰 گران‌ترین</option>
                <option value="discount">🔥 بیشترین تخفیف</option>
                <option value="rating">⭐ بالاترین امتیاز</option>
              </select>
            </div>
          </div>

          {/* ===== ACTIVE FILTERS ===== */}
          <ActiveFilters />

          {/* ===== PRODUCTS با Flex و 3 ستونه از sm به بالا ===== */}
          {isFilterApplying || isSearchLoading ? (
            <div className="flex justify-center items-center h-64 sm:h-80 md:h-96 bg-[var(--color-sixeth)] rounded-2xl shadow-md border border-[var(--color-border)]/40">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-primary)] animate-spin" />
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-[var(--color-fiveth)] text-xs sm:text-sm">
                  {isSearchLoading ? 'در حال جستجو...' : 'در حال اعمال فیلترها...'}
                </p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-[var(--color-sixeth)] rounded-2xl shadow-md border border-[var(--color-border)]/40 py-12 sm:py-16 md:py-20 text-center px-4">
              <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-2">محصول تخفیف‌داری یافت نشد!</h3>
              <p className="text-sm sm:text-base text-[var(--color-fiveth)]">لطفاً فیلترهای خود را تغییر دهید.</p>
              <button 
                onClick={clearAllFilters}
                className="mt-4 px-4 sm:px-6 py-2 sm:py-2.5 bg-[var(--color-primary)] text-[var(--color-background)] rounded-xl text-xs sm:text-sm font-bold hover:bg-[var(--color-secondary)] transition-all shadow-md shadow-[var(--color-primary)]/30 hover:shadow-lg"
              >
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-1.5 sm:-mx-2 md:-mx-2.5">
              {paginatedProducts.map((product) => {
                const finalPrice = calculateDiscountPrice(product.price, product.discountPercentage);
                const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
                const isWishlisted = wishlist.includes(product.id);
                
                return (
                  <div 
                    key={product.id} 
                    className="w-1/2 sm:w-1/3 px-1.5 sm:px-2 md:px-2.5 mb-3 sm:mb-4 md:mb-5"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="group bg-[var(--color-sixeth)] rounded-2xl border border-[var(--color-border)]/30 overflow-hidden hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[var(--color-primary)]/10 hover:-translate-y-2 flex flex-col cursor-pointer h-full">
                      <div className="relative aspect-square bg-gradient-to-br from-[var(--color-background)] to-[var(--color-background)] overflow-hidden flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 p-1 sm:p-1.5 bg-[var(--color-background)]/90 backdrop-blur-sm rounded-full shadow-md hover:bg-[var(--color-background)] transition-all duration-300 hover:scale-110 border border-[var(--color-border)]/30 z-10"
                        >
                          <Heart className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 transition-colors ${
                            isWishlisted ? 'fill-red-500 text-red-500' : 'text-[var(--color-fiveth)]'
                          }`} />
                        </button>

                        {hasDiscount && (
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[7px] sm:text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-2.5 md:py-1 rounded-full shadow-md flex items-center gap-0.5 sm:gap-1 animate-pulse z-10">
                            <Gift className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                            <span>{product.discountPercentage}%</span>
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 h-10 sm:h-12 md:h-16 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-1 sm:pb-1.5 md:pb-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickView(product.id);
                            }}
                            className="bg-[var(--color-primary)] text-[var(--color-background)] shadow-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 md:px-4 md:py-2 rounded-full text-[7px] sm:text-[8px] md:text-[11px] font-bold hover:bg-[var(--color-secondary)] transition-all duration-300 transform hover:scale-105 flex items-center gap-0.5 sm:gap-1"
                          >
                            <Eye className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5" />
                            <span className="hidden sm:inline text-[8px] md:text-[11px]">مشاهده</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-1.5 sm:p-2 md:p-3 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                          <span className="text-[6px] sm:text-[7px] md:text-[9px] font-medium text-[var(--color-fiveth)] bg-[var(--color-background)] px-1 py-0.5 sm:px-1.5 rounded-full truncate max-w-[50%] sm:max-w-[55%] border border-[var(--color-border)]/20">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-[var(--color-text)] text-[8px] sm:text-[9px] md:text-[12px] mb-0.5 sm:mb-1 line-clamp-2 min-h-[1.2rem] sm:min-h-[1.5rem] md:min-h-[2rem] group-hover:text-[var(--color-primary)] transition-colors flex-1">
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center justify-between pt-1 sm:pt-1.5 md:pt-2 border-t border-[var(--color-border)]/20 mt-auto">
                          <div>
                            {hasDiscount ? (
                              <>
                                <span className="text-[var(--color-third)] line-through text-[5px] sm:text-[6px] md:text-[9px] block">
                                  {product.price.toLocaleString('fa-IR')}
                                </span>
                                <span className="text-[var(--color-primary)] font-extrabold text-[7px] sm:text-[8px] md:text-[13px]">
                                  {finalPrice.toLocaleString('fa-IR')}
                                </span>
                              </>
                            ) : (
                              <span className="text-[var(--color-text)] font-extrabold text-[7px] sm:text-[8px] md:text-[13px]">
                                {product.price.toLocaleString('fa-IR')}
                              </span>
                            )}
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-0.5 sm:p-1 md:p-1.5 bg-[var(--color-primary)]/10 rounded-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 group/btn border border-[var(--color-border)]/20 hover:border-transparent flex-shrink-0"
                          >
                            <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[var(--color-primary)] group-hover/btn:text-[var(--color-background)]" />
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
    <div className="w-full mt-8 sm:mt-10 md:mt-12" dir="ltr">
      <div className="max-w-md mx-auto px-2 sm:px-0">
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl p-1 shadow-md shadow-[var(--color-primary)]/30">
          <div className="relative flex items-center justify-between bg-[var(--color-background)]/95 backdrop-blur-sm rounded-xl p-1 border border-[var(--color-border)]/20">
            
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-0.5 sm:gap-1 rounded-lg px-1.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-secondary)] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">قبلی</span>
            </button>

            <div ref={containerRef} className="relative flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2">
              {getVisiblePages.map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    ref={isActive ? activeRef : null}
                    onClick={() => setCurrentPage(page)}
                    className={`relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-lg text-[10px] sm:text-xs md:text-sm font-semibold transition-all ${
                      isActive 
                        ? 'text-[var(--color-background)] bg-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/30' 
                        : 'text-[var(--color-fiveth)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary)]/10'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <div
                className="absolute bottom-0.5 sm:bottom-1 z-0 h-0.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-[0_0_30px_rgba(158,173,140,0.4)] transition-all duration-300 ease-out"
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
              className="flex items-center gap-0.5 sm:gap-1 rounded-lg px-1.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-secondary)] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            >
              <span className="hidden xs:inline">بعدی</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
     
        <div className="text-center mt-2 sm:mt-3 text-[10px] sm:text-xs text-[var(--color-fiveth)]">
          صفحه {currentPage} از {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Dis;