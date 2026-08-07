import React, { useState, useRef } from 'react';
import {
  Package,
  Search,
  Plus,
  X,
  Loader2,
  MoreVertical,
  Star,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Image as ImageIcon
} from 'lucide-react';

const ProductsPage = () => {
  // --- استیت‌ها ---
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const itemsPerPage = 9; // طبق عکس در هر ردیف ۳ تا و در کل ۹ تا در صفحه
  const searchTimeoutRef = useRef(null);
  const searchDelayTimeoutRef = useRef(null);

  // --- دیتای نمونه (۲۰ محصول) ---
  const [products] = useState(() => {
    const data = [];
    const categories = ['طبقات دیواری چوب', 'سینی و تخته سرو', 'سینی چوبی مستطیل', 'جاشقانی چوبی', 'سینی گرد چوبی', 'جا ادویه چوبی'];
    const names = ['طبقه دیواری چوب طبیعی', 'تخته سرو چوب گردو', 'سینی چوبی مستطیل', 'جاشقانی چوبی', 'سینی گرد چوبی', 'جا ادویه چوبی', 'سینی چوبی میوه خوری', 'باکس چوبی لوازم', 'میز تلویزیون چوبی', 'سینی سرو چوبی بزرگ'];
    const images = [
      'https://images.unsplash.com/photo-1540932239986-302280d2f752?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4e4d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1587648664848-3b2c13db0d32?auto=format&fit=crop&q=80&w=400'
    ];

    for (let i = 1; i <= 20; i++) {
      const price = (Math.floor(Math.random() * 5) + 3) * 100000;
      const img = images[Math.floor(Math.random() * images.length)];
      const salesCount = Math.floor(Math.random() * 300) + 5; // تعداد فروش تصادفی بین ۵ تا ۳۰۵
      
      // منطق موجودی برای تست فیلترها:
      // ۵ محصول اول: موجودی ۰ (ناموجود)
      // ۵ محصول دوم: موجودی ۱ تا ۵ (رو به اتمام)
      // مابقی: موجودی بالای ۱۰ (موجود)
      let stock;
      if (i <= 5) {
        stock = 0; // ناموجود
      } else if (i <= 10) {
        stock = Math.floor(Math.random() * 5) + 1; // رو به اتمام (۱ تا ۵)
      } else {
        stock = Math.floor(Math.random() * 40) + 10; // موجود (۱۰ تا ۵۰)
      }

      data.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        price: price,
        stock: stock,
        sales: salesCount, // <--- تعداد فروش جایگزین تعداد عکس شد
        image: img
      });
    }
    return data;
  });

  // --- فیلتر کردن (بر اساس منطق موجودی که گفتی) ---
  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return product.stock > 5; // موجود: بیشتر از ۵
    if (activeTab === 'low') return product.stock > 0 && product.stock <= 5; // رو به اتمام: ۱ تا ۵
    if (activeTab === 'out') return product.stock === 0; // ناموجود: صفر
    return true;
  });

  // --- منطق جستجو (دقیقاً مثل کد مشتریان و سفارشات) ---
  const handleSearch = (value) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (searchDelayTimeoutRef.current) clearTimeout(searchDelayTimeoutRef.current);
    setSearchTerm(value);
    if (!value.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setCurrentPage(1);
      return;
    }
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);
      searchDelayTimeoutRef.current = setTimeout(() => {
        // جستجو روی لیست فیلتر شده
        const results = filteredProducts.filter(p => 
          p.name.includes(value.trim()) || 
          p.category.includes(value.trim())
        );
        setSearchResults(results);
        setIsSearching(false);
        setCurrentPage(1);
      }, 500);
    }, 300);
  };

  const clearSearch = () => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (searchDelayTimeoutRef.current) clearTimeout(searchDelayTimeoutRef.current);
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
    setCurrentPage(1);
  };

  // --- محاسبات پیجینیشن ---
  const currentData = searchTerm.trim() ? searchResults : filteredProducts;
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = currentData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // --- توابع کمکی پیجینیشن ---
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      buttons.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;
      if (start > 2) buttons.push('...');
      for (let i = start; i <= end; i++) buttons.push(i);
      if (end < totalPages - 1) buttons.push('...');
      buttons.push(totalPages);
    }
    return buttons;
  };

  // --- آمار ---
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  // --- اسکلتون لودینگ (برای کارت‌ها) ---
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen" dir="rtl">
      
      {/* --- هدر صفحه --- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">محصولات</h1>
        <p className="text-sm text-gray-500">محصولات فروشگاه، موجودی و قیمت‌ها را مدیریت کنید.</p>
      </div>

      {/* --- فیلترها و جستجو --- */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="flex bg-blue-100 rounded-sm p-2 flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
          {[
            { id: 'all', label: 'همه محصولات' },
            { id: 'active', label: 'موجود' },
            { id: 'low', label: 'رو به اتمام' },
            { id: 'out', label: 'ناموجود' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => { setActiveTab(filter.id); setCurrentPage(1); clearSearch(); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeTab === filter.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isSearching ? <Loader2 className="w-5 h-5 text-blue-500 animate-spin" /> : <Search className="w-5 h-5 text-gray-400" />}
          </div>
          <input 
            type="text" 
            placeholder="جستجو بر اساس نام یا دسته بندی..." 
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            dir="rtl"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* نمایش وضعیت جستجو */}
      {searchTerm.trim() && !isSearching && searchResults.length > 0 && (
        <div className="mb-4 text-sm text-gray-500">
          <span className="font-medium text-blue-600">{searchResults.length}</span>
          <span> نتیجه برای "</span>
          <span className="font-medium">{searchTerm}</span>
          <span>" پیدا شد</span>
        </div>
      )}
      {searchTerm.trim() && !isSearching && searchResults.length === 0 && (
        <div className="mb-4 text-sm text-gray-500">
          <span>نتیجه‌ای برای "</span>
          <span className="font-medium">{searchTerm}</span>
          <span>" پیدا نشد</span>
        </div>
      )}

      {/* --- گرید محصولات --- */}
      {isSearching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
              
              {/* بخش تصویر */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* بخش اطلاعات */}
              <div className="p-5 text-right">
                <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-800 text-base mb-2">{product.name}</h3>
                
                <p className="text-[#c89f5e] font-bold text-base mb-4">
                  {product.price.toLocaleString()} تومان
                </p>
                
                {/* بخش پایین کارت (تعداد فروش جایگزین تعداد عکس شد) */}
                <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                    تعداد فروش: {product.sales}
                  </span>
                  <span className={`flex items-center gap-1.5 ${
                    product.stock > 5 ? 'text-green-600' :
                    product.stock > 0 && product.stock <= 5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      product.stock > 5 ? 'bg-green-500' :
                      product.stock > 0 && product.stock <= 5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    تعداد موجود: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 font-medium bg-white rounded-xl shadow-sm border border-gray-100">
          <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          محصولی با این مشخصات یافت نشد.
        </div>
      )}

      {/* --- فوتر و صفحه‌بندی --- */}
      {!isSearching && totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 bg-white rounded-xl shadow-sm border border-gray-100 gap-4">
          <div className="text-sm text-gray-600 font-medium order-2 sm:order-1">
            نمایش <span className="font-bold text-gray-900">{startIndex + 1}</span> تا <span className="font-bold text-gray-900">{endIndex}</span> عدد از <span className="font-bold text-gray-900">{totalItems}</span> محصول
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button 
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {getPaginationButtons().map((btn, index) => (
              <button 
                key={index}
                onClick={() => typeof btn === 'number' && goToPage(btn)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-colors shadow-sm ${
                  btn === currentPage
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : btn === '...'
                    ? 'bg-transparent text-gray-400 cursor-default'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                disabled={btn === '...'}
              >
                {btn}
              </button>
            ))}
            
            <button 
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsPage;