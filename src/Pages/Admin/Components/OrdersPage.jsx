import React, { useState, useRef } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  User,
  Package,
  Truck,
  Trash2,
  CheckCircle,
  Calendar,
  Clock,
  X,
  Loader2,
  Eye,
  ShoppingBag
} from 'lucide-react';

const OrdersPage = () => {
  // --- استیت‌ها ---
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState(null);
  const itemsPerPage = 10;
  const searchTimeoutRef = useRef(null);
  const searchDelayTimeoutRef = useRef(null);

  // --- دیتای نمونه (۲۰ سفارش) ---
  const [orders] = useState(() => {
    const data = [];
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    for (let i = 1; i <= 20; i++) {
      data.push({
        id: `#${100 + i}`,
        customer: `مشتری نمونه ${i}`,
        amount: `${(Math.floor(Math.random() * 5) + 1).toLocaleString()},۰۰۰,۰۰۰ تومان`,
        paymentStatus: i % 3 === 0 ? 'در انتظار' : 'پرداخت شده',
        shippingStatus: i % 4 === 0 ? 'در حال پردازش' : i % 5 === 0 ? 'لغو شده' : 'ارسال شده',
        shippingDate: `۱۴۰۶/۰۵/${String(i).padStart(2, '0')}`,
        items: [
          { name: 'استند ۶ قهوه‌ای روشن ۳ طبقه', color: colors[Math.floor(Math.random() * colors.length)], count: 1 },
          { name: 'سینی چوبی گرد طرح دار', color: colors[Math.floor(Math.random() * colors.length)], count: 2 },
          { name: 'جا ادویه چوبی ۳ طبقه', color: colors[Math.floor(Math.random() * colors.length)], count: 1 },
        ]
      });
    }
    return data;
  });

  // --- فیلتر کردن ---
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'processing') return order.shippingStatus === 'در حال پردازش';
    if (activeTab === 'shipped') return order.shippingStatus === 'ارسال شده';
    if (activeTab === 'cancelled') return order.shippingStatus === 'لغو شده';
    return true;
  });

  // --- منطق جستجو (با دباونس و لودینگ) ---
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
        const results = filteredOrders.filter(o => 
          o.id.includes(value.trim()) || 
          o.customer.includes(value.trim())
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
  const currentData = searchTerm.trim() ? searchResults : filteredOrders;
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = currentData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // --- توابع کمکی دیزاین ---
  const getStatusBadge = (status) => {
    const baseClass = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border";
    switch(status) {
      case 'پرداخت شده':
        return <span className={`${baseClass} bg-green-50 text-green-700 border-green-200`}><CheckCircle className="w-3.5 h-3.5 text-green-500" /> {status}</span>;
      case 'در انتظار':
        return <span className={`${baseClass} bg-yellow-50 text-yellow-700 border-yellow-200`}><Clock className="w-3.5 h-3.5 text-yellow-500" /> {status}</span>;
      case 'ارسال شده':
        return <span className={`${baseClass} bg-blue-50 text-blue-700 border-blue-200`}><Truck className="w-3.5 h-3.5 text-blue-500" /> {status}</span>;
      case 'در حال پردازش':
        return <span className={`${baseClass} bg-amber-50 text-amber-700 border-amber-200`}><Clock className="w-3.5 h-3.5 text-amber-500" /> {status}</span>;
      case 'لغو شده':
        return <span className={`${baseClass} bg-red-50 text-red-700 border-red-200`}><X className="w-3.5 h-3.5 text-red-500" /> {status}</span>;
      default:
        return <span className={`${baseClass} bg-gray-100 text-gray-600 border-gray-200`}>-</span>;
    }
  };

  // --- رندر دکمه‌های عملیات (سمت چپ) ---
  const ActionButtons = () => (
    <div className="flex flex-col gap-1.5 w-full min-w-[85px]">
      <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100 transition-colors w-full">
        <CheckCircle className="w-3.5 h-3.5" /> پرداخت
      </button>
      <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors w-full">
        <Truck className="w-3.5 h-3.5" /> ارسال
      </button>
      <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors w-full">
        <Trash2 className="w-3.5 h-3.5" /> حذف
      </button>
    </div>
  );

  // --- اسکلتون لودینگ ---
  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-gray-100">
      <td className="px-6 py-5"><div className="h-5 w-32 bg-gray-200 rounded"></div></td>
      <td className="px-6 py-5 text-center"><div className="h-5 w-16 bg-gray-200 rounded mx-auto"></div></td>
      <td className="px-6 py-5 text-center"><div className="h-5 w-28 bg-gray-200 rounded mx-auto"></div></td>
      <td className="px-6 py-5 text-center"><div className="h-6 w-24 bg-gray-200 rounded mx-auto"></div></td>
      <td className="px-6 py-5 text-center"><div className="h-6 w-24 bg-gray-200 rounded mx-auto"></div></td>
      <td className="px-6 py-5 text-center"><div className="h-5 w-24 bg-gray-200 rounded mx-auto"></div></td>
      <td className="px-6 py-5"><div className="h-5 w-48 bg-gray-200 rounded"></div></td>
      <td className="px-6 py-5 text-center"><div className="h-16 w-16 bg-gray-200 rounded mx-auto"></div></td>
    </tr>
  );

  return (
    <div className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen" dir="rtl">
      
      {/* --- هدر صفحه --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">مدیریت سفارش‌ها</h1>
          <p className="text-sm text-gray-500">سفارش‌های جدید را بررسی و وضعیت ارسال را مدیریت کنید.</p>
        </div>
      </div>

      {/* --- فیلترها و جستجو --- */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
          {[
            { id: 'all', label: 'همه سفارشات' },
            { id: 'processing', label: 'در حال پردازش' },
            { id: 'shipped', label: 'ارسال شده' },
            { id: 'cancelled', label: 'لغو شده' },
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
            placeholder="جستجو بر اساس کد یا نام مشتری..." 
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* --- جدول سفارش‌ها (سبک ساده و تمیز) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-right text-sm font-bold text-gray-600 uppercase tracking-wider">
                <th className="px-6 py-4 text-right min-w-[130px]">مشتری</th>
                <th className="px-6 py-4 text-center min-w-[80px]">سفارش</th>
                <th className="px-6 py-4 text-center min-w-[120px]">مبلغ</th>
                <th className="px-6 py-4 text-center min-w-[120px]">پرداخت</th>
                <th className="px-6 py-4 text-center min-w-[120px]">ارسال</th>
                <th className="px-6 py-4 text-center min-w-[100px]">تاریخ</th>
                <th className="px-6 py-4 text-right min-w-[260px]">آیتم</th>
                <th className="px-6 py-4 text-center min-w-[100px] bg-gray-50 border-r border-gray-200">اقدامات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isSearching ? (
                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
              ) : currentItems.length > 0 ? (
                currentItems.map((order, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors duration-200 group">
                    
                    {/* مشتری (تک خطی) */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{order.customer}</span>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <User className="w-4 h-4" />
                        </div>
                      </div>
                    </td>

                    {/* سفارش */}
                    <td className="px-6 py-4 text-center text-sm font-bold text-blue-600 whitespace-nowrap">
                      {order.id}
                    </td>

                    {/* مبلغ */}
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-800 whitespace-nowrap">
                      {order.amount}
                    </td>

                    {/* وضعیت پرداخت (تک خطی) */}
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(order.paymentStatus)}
                    </td>

                    {/* وضعیت ارسال (تک خطی) */}
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(order.shippingStatus)}
                    </td>

                    {/* تاریخ ارسال */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {order.shippingDate}
                      </div>
                    </td>

                    {/* آیتم (کلیک‌خور، ساده و تمیز) */}
                    <td className="px-6 py-4 text-right cursor-pointer" onClick={() => setSelectedOrderItems(order)}>
                      <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-1.5 -mx-3 transition-colors group/item">
                        <Package className="w-4 h-4 text-gray-400 group-hover/item:text-blue-500 transition-colors" />
                        <span className="text-sm text-gray-700 truncate max-w-[140px] group-hover/item:text-blue-600 transition-colors">
                          {order.items[0].name}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200 whitespace-nowrap">
                          {order.items.length} عدد
                        </span>
                        <Eye className="w-4 h-4 text-gray-300 group-hover/item:text-blue-500 transition-colors" />
                      </div>
                    </td>

                    {/* اقدامات (سمت چپ) */}
                    <td className="px-6 py-4 text-center border-r border-gray-200 bg-gray-50/30">
                      <ActionButtons />
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" className="text-center py-12 text-gray-500 font-medium">سفارشی با این مشخصات یافت نشد.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- فوتر و صفحه‌بندی --- */}
        {!isSearching && totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 gap-4">
            <div className="text-sm text-gray-600 font-medium order-2 sm:order-1">
              نمایش <span className="font-bold text-gray-900">{startIndex + 1}</span> تا <span className="font-bold text-gray-900">{endIndex}</span> عدد از <span className="font-bold text-gray-900">{totalItems}</span> سفارش
            </div>
            <div className="flex items-center gap-2 order-1 sm:order-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
              <button 
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                <button 
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded text-sm font-bold transition-colors ${
                    currentPage === p 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  {p}
                </button>
              ))}
              <button 
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- پنل جزئیات سفارش (Drawer) --- */}
      {selectedOrderItems && (
        <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrderItems(null)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                جزئیات سفارش {selectedOrderItems.id}
              </h3>
              <button onClick={() => setSelectedOrderItems(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
              <p className="text-sm text-gray-500 mb-4">محصولات موجود در این سفارش:</p>
              <div className="space-y-4">
                {selectedOrderItems.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">تعداد: {item.count} عدد</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;