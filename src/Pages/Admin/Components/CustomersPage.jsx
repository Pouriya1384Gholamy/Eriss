import React, { useState, useRef } from 'react';
import {
  Users,
  ShoppingBag,
  Plus,
  Search,
  MoreVertical,
  Trash2,
  UserCheck,
  UserX,
  X,
  Mail,
  CheckCircle,
  Shield,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Loader2,
  Star
} from 'lucide-react';

const CustomersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const itemsPerPage = 10;
  const searchTimeoutRef = useRef(null);
  const searchDelayTimeoutRef = useRef(null);

  const [customers] = useState([
    { id: 1, name: 'محمد رضا ملازاده', email: 'mohammdreza.mollazade@gmail.com', orders: 42, isAdmin: false, status: 'active', category: 'regular', avatar: 'MR', joinDate: '1402/03/15' },
    { id: 2, name: 'سارا احمدی', email: 'sara.ahmadi@gmail.com', orders: 15, isAdmin: true, status: 'active', category: 'vip', avatar: 'SA', joinDate: '1401/08/22' },
    { id: 3, name: 'علی کریمی', email: 'ali.karimi@gmail.com', orders: 7, isAdmin: false, status: 'inactive', category: 'regular', avatar: 'AK', joinDate: '1402/11/03' },
    { id: 4, name: 'مریم حسینی', email: 'maryam.hosseini@gmail.com', orders: 28, isAdmin: true, status: 'active', category: 'vip', avatar: 'MH', joinDate: '1401/05/18' },
    { id: 5, name: 'رضا نوروزی', email: 'reza.norouzi@gmail.com', orders: 3, isAdmin: false, status: 'active', category: 'new', avatar: 'RN', joinDate: '1403/01/09' },
    { id: 6, name: 'فاطمه زهرایی', email: 'fatemeh.zahraei@gmail.com', orders: 9, isAdmin: false, status: 'active', category: 'regular', avatar: 'FZ', joinDate: '1402/07/14' },
    { id: 7, name: 'حسین محمدی', email: 'hossein.mohammadi@gmail.com', orders: 0, isAdmin: false, status: 'inactive', category: 'new', avatar: 'HM', joinDate: '1403/02/28' },
    { id: 8, name: 'زهرا علوی', email: 'zahra.alavi@gmail.com', orders: 21, isAdmin: false, status: 'active', category: 'vip', avatar: 'ZA', joinDate: '1401/12/05' },
    { id: 9, name: 'امیر قاسمی', email: 'amir.ghasemi@gmail.com', orders: 12, isAdmin: true, status: 'active', category: 'regular', avatar: 'AG', joinDate: '1402/04/19' },
    { id: 10, name: 'نرگس رضایی', email: 'narges.rezaei@gmail.com', orders: 33, isAdmin: true, status: 'active', category: 'vip', avatar: 'NR', joinDate: '1401/09/30' },
    { id: 11, name: 'مهدی طاهری', email: 'mahdi.taheri@gmail.com', orders: 2, isAdmin: false, status: 'inactive', category: 'new', avatar: 'MT', joinDate: '1403/03/12' },
    { id: 12, name: 'پریسا صمدی', email: 'parisa.samadi@gmail.com', orders: 18, isAdmin: false, status: 'active', category: 'regular', avatar: 'PS', joinDate: '1402/06/07' },
    { id: 13, name: 'علیرضا حقیقی', email: 'alireza.haghighi@gmail.com', orders: 25, isAdmin: false, status: 'active', category: 'vip', avatar: 'AH', joinDate: '1402/01/24' },
    { id: 14, name: 'سمیه کاظمی', email: 'somayeh.kazemi@gmail.com', orders: 4, isAdmin: false, status: 'active', category: 'new', avatar: 'SK', joinDate: '1403/02/15' },
    { id: 15, name: 'پویا جعفری', email: 'pouya.jafari@gmail.com', orders: 6, isAdmin: false, status: 'inactive', category: 'regular', avatar: 'PJ', joinDate: '1402/10/08' },
    { id: 16, name: 'الهه مرادی', email: 'elaheh.moradi@gmail.com', orders: 19, isAdmin: true, status: 'active', category: 'vip', avatar: 'EM', joinDate: '1401/11/14' },
    { id: 17, name: 'حامد نیکبخت', email: 'hamed.nikbakht@gmail.com', orders: 11, isAdmin: false, status: 'active', category: 'regular', avatar: 'HN', joinDate: '1402/08/21' },
    { id: 18, name: 'راحله سعیدی', email: 'raheleh.saeedi@gmail.com', orders: 8, isAdmin: false, status: 'active', category: 'regular', avatar: 'RS', joinDate: '1402/12/03' },
    { id: 19, name: 'بهزاد شاهینی', email: 'behzad.shahini@gmail.com', orders: 1, isAdmin: false, status: 'inactive', category: 'new', avatar: 'BS', joinDate: '1403/01/17' },
    { id: 20, name: 'نگار موسوی', email: 'negar.mousavi@gmail.com', orders: 30, isAdmin: true, status: 'active', category: 'vip', avatar: 'NM', joinDate: '1401/07/26' },
  ]);

  // --- گام ۱: فیلتر کردن بر اساس دکمه‌های بالای صفحه ---
  const filteredCustomers = customers.filter(customer => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return customer.status === 'active';
    if (activeFilter === 'inactive') return customer.status === 'inactive';
    if (activeFilter === 'vip') return customer.category === 'vip';
    return true;
  });

  // --- گام ۲: منطق جستجو (با دباونس و لودینگ) ---
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
        // *** اصلاح مهم اینجاست: ما روی filteredCustomers جستجو می‌کنیم نه customers کل ***
        const results = filteredCustomers.filter(customer => 
          customer.name.includes(value.trim()) || 
          customer.email.includes(value.trim()) ||
          customer.orders.toString().includes(value.trim())
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

  // --- گام ۳: محاسبات پیجینیشن ترکیبی ---
  // اگر سرچ داریم از searchResults استفاده می‌کنیم، در غیر این صورت از filteredCustomers
  const currentData = searchTerm.trim() ? searchResults : filteredCustomers;
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

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

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
  const vipCustomers = customers.filter(c => c.category === 'vip').length;
  const adminCount = customers.filter(c => c.isAdmin).length;

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-200"></div><div><div className="h-4 w-32 bg-gray-200 rounded mb-2"></div><div className="h-3 w-20 bg-gray-200 rounded"></div></div></div></td>
      <td className="px-4 py-3 text-center"><div className="h-6 w-16 bg-gray-200 rounded-full mx-auto"></div></td>
      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-200 rounded"></div><div className="h-4 w-40 bg-gray-200 rounded"></div></div></td>
      <td className="px-4 py-3 text-center"><div className="h-6 w-16 bg-gray-200 rounded-full mx-auto"></div></td>
      <td className="px-4 py-3"><div className="flex items-center justify-center gap-2"><div className="w-14 h-7 bg-gray-200 rounded-lg"></div><div className="w-14 h-7 bg-gray-200 rounded-lg"></div><div className="w-14 h-7 bg-gray-200 rounded-lg"></div></div></td>
    </tr>
  );

  return (
    <div className="flex-1 min-w-0 p-4 md:p-6">
      {/* هدر */}
      <div className="mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" />
              مشتریان
            </h1>
            <p className="text-gray-600 mt-1 text-sm">لیست کامل کاربران فروشگاه، برای مشاهده جزئیات، ویرایش یا حذف هر کاربر.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus className="w-4 h-4" />
            <span>افزودن مشتری</span>
          </button>
        </div>
      </div>

      {/* کارت آمار */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">تعداد کل</p><p className="text-2xl font-bold text-gray-800">{totalCustomers}</p></div><div className="bg-blue-100 p-3 rounded-full"><Users className="w-5 h-5 text-blue-600" /></div></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">فعال</p><p className="text-2xl font-bold text-green-600">{activeCustomers}</p></div><div className="bg-green-100 p-3 rounded-full"><UserCheck className="w-5 h-5 text-green-600" /></div></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">ویژه</p><p className="text-2xl font-bold text-yellow-600">{vipCustomers}</p></div><div className="bg-yellow-100 p-3 rounded-full"><Star className="w-5 h-5 text-yellow-600" /></div></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">سفارشات</p><p className="text-2xl font-bold text-purple-600">{totalOrders}</p></div><div className="bg-purple-100 p-3 rounded-full"><ShoppingBag className="w-5 h-5 text-purple-600" /></div></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">ادمین‌ها</p><p className="text-2xl font-bold text-red-600">{adminCount}</p></div><div className="bg-red-100 p-3 rounded-full"><Shield className="w-5 h-5 text-red-600" /></div></div>
        </div>
      </div>

      {/* جستجو و فیلتر */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isSearching ? <Loader2 className="w-5 h-5 text-blue-500 animate-spin" /> : <Search className="w-5 h-5 text-gray-400" />}
            </div>
            <input type="text" placeholder="جستجو بر اساس نام، ایمیل یا شماره سفارش..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} className="w-full pr-10 pl-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" dir="rtl" />
            {searchTerm && <button onClick={clearSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-4 h-4" /></button>}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'همه مشتریان', icon: Users },
              { id: 'vip', label: 'ویژه', icon: Star },
              { id: 'active', label: 'فعال', icon: CheckCircle },
              { id: 'inactive', label: 'غیرفعال', icon: UserX },
            ].map((filter) => (
              <button key={filter.id} onClick={() => { setActiveFilter(filter.id); setCurrentPage(1); clearSearch(); }} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter.id ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        {searchTerm.trim() && !isSearching && searchResults.length > 0 && (
          <div className="mt-2 text-sm text-gray-500"><span className="font-medium text-blue-600">{searchResults.length}</span><span> نتیجه برای "</span><span className="font-medium">{searchTerm}</span><span>" پیدا شد</span></div>
        )}
        {searchTerm.trim() && !isSearching && searchResults.length === 0 && (
          <div className="mt-2 text-sm text-gray-500"><span>نتیجه‌ای برای "</span><span className="font-medium">{searchTerm}</span><span>" پیدا نشد</span></div>
        )}
      </div>

      {/* جدول */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-right text-sm text-gray-600 border-b border-gray-200"><th className="px-4 py-3 font-medium">مشتری</th><th className="px-4 py-3 font-medium text-center">سفارش</th><th className="px-4 py-3 font-medium">ایمیل</th><th className="px-4 py-3 font-medium text-center">ادمین</th><th className="px-4 py-3 font-medium text-center">اقدامات</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isSearching ? (
                <><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /></>
              ) : currentItems.length > 0 ? (
                currentItems.map((customer) => (
                  <tr key={customer.id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 ${customer.category === 'vip' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : customer.status === 'active' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`}>
                          {customer.avatar}
                        </div>
                        <div><p className="font-medium text-gray-800">{customer.name}</p><p className="text-xs text-gray-400">{customer.joinDate}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center"><div className="inline-flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full"><ShoppingBag className="w-3.5 h-3.5 text-blue-500" /><span className="text-sm font-semibold text-blue-600">#{customer.orders}</span></div></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-600 truncate max-w-[180px]">{customer.email}</span></div></td>
                    <td className="px-4 py-3 text-center">{customer.isAdmin ? <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium"><Shield className="w-3.5 h-3.5" />ادمین</span> : <span className="text-xs text-gray-400">کاربر</span>}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors" title="ادمین"><BadgeCheck className="w-4 h-4 text-blue-600" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-green-100 transition-colors" title="فعال"><CheckCircle className="w-4 h-4 text-green-600" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-100 transition-colors" title="حذف"><Trash2 className="w-4 h-4 text-red-500" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-purple-100 transition-colors" title="بیشتر"><MoreVertical className="w-4 h-4 text-purple-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">{searchTerm.trim() ? <><Search className="w-12 h-12 mx-auto text-gray-300 mb-2" /><p>نتیجه‌ای برای "{searchTerm}" یافت نشد</p><button onClick={clearSearch} className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">پاک کردن جستجو</button></> : <><Users className="w-12 h-12 mx-auto text-gray-300 mb-2" /><p>هیچ مشتری‌ای با این مشخصات یافت نشد</p></>}</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* فوتر جدول با پیجینیشن */}
        {!isSearching && totalItems > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-gray-50 border-t border-gray-100 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-blue-600">{totalItems}</span><span>نفر از</span><span className="font-medium">{searchTerm.trim() ? searchResults.length : totalCustomers}</span><span>مشتری</span>
              {activeFilter !== 'all' && !searchTerm.trim() && <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">{activeFilter === 'vip' ? 'ویژه' : activeFilter === 'active' ? 'فعال' : 'غیرفعال'}</span>}
              {searchTerm.trim() && <span className="text-xs text-gray-400 bg-blue-50 px-2 py-0.5 rounded-full">نتیجه جستجو</span>}
              <span className="text-xs text-gray-400 mr-2">صفحه {currentPage} از {totalPages}</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'}`}><ChevronRight className="w-4 h-4" />قبلی</button>
              {getPaginationButtons().map((btn, index) => (
                <button key={index} onClick={() => typeof btn === 'number' && goToPage(btn)} className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${btn === currentPage ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : btn === '...' ? 'bg-transparent text-gray-400 cursor-default' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'}`} disabled={btn === '...'}>{btn}</button>
              ))}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'}`}>بعدی<ChevronLeft className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;