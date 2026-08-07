import React, { useState, useRef } from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Plus,
  MessageCircle,
  HelpCircle,
  Star,
  Search,
  MoreVertical,
  Trash2,
  UserCheck,
  UserX,
  Menu,
  X,
  Settings,
  LogOut,
  Package,
  BarChart3,
  Mail,
  UserCog,
  CheckCircle,
  Shield,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Loader2
} from 'lucide-react';

const Admin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('customers');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const itemsPerPage = 10;
  const searchTimeoutRef = useRef(null);
  const searchDelayTimeoutRef = useRef(null);

  // نمونه داده مشتریان با فیلدهای جدید
  const [customers] = useState([
    { 
      id: 1, 
      name: 'محمد رضا ملازاده', 
      email: 'mohammdreza.mollazade@gmail.com', 
      orders: 42, 
      isAdmin: false,
      status: 'active', 
      category: 'regular',
      avatar: 'MR',
      joinDate: '1402/03/15'
    },
    { 
      id: 2, 
      name: 'سارا احمدی', 
      email: 'sara.ahmadi@gmail.com', 
      orders: 15, 
      isAdmin: true,
      status: 'active', 
      category: 'vip',
      avatar: 'SA',
      joinDate: '1401/08/22'
    },
    { 
      id: 3, 
      name: 'علی کریمی', 
      email: 'ali.karimi@gmail.com', 
      orders: 7, 
      isAdmin: false,
      status: 'inactive', 
      category: 'regular',
      avatar: 'AK',
      joinDate: '1402/11/03'
    },
    { 
      id: 4, 
      name: 'مریم حسینی', 
      email: 'maryam.hosseini@gmail.com', 
      orders: 28, 
      isAdmin: true,
      status: 'active', 
      category: 'vip',
      avatar: 'MH',
      joinDate: '1401/05/18'
    },
    { 
      id: 5, 
      name: 'رضا نوروزی', 
      email: 'reza.norouzi@gmail.com', 
      orders: 3, 
      isAdmin: false,
      status: 'active', 
      category: 'new',
      avatar: 'RN',
      joinDate: '1403/01/09'
    },
    { 
      id: 6, 
      name: 'فاطمه زهرایی', 
      email: 'fatemeh.zahraei@gmail.com', 
      orders: 9, 
      isAdmin: false,
      status: 'active', 
      category: 'regular',
      avatar: 'FZ',
      joinDate: '1402/07/14'
    },
    { 
      id: 7, 
      name: 'حسین محمدی', 
      email: 'hossein.mohammadi@gmail.com', 
      orders: 0, 
      isAdmin: false,
      status: 'inactive', 
      category: 'new',
      avatar: 'HM',
      joinDate: '1403/02/28'
    },
    { 
      id: 8, 
      name: 'زهرا علوی', 
      email: 'zahra.alavi@gmail.com', 
      orders: 21, 
      isAdmin: false,
      status: 'active', 
      category: 'vip',
      avatar: 'ZA',
      joinDate: '1401/12/05'
    },
    { 
      id: 9, 
      name: 'امیر قاسمی', 
      email: 'amir.ghasemi@gmail.com', 
      orders: 12, 
      isAdmin: true,
      status: 'active', 
      category: 'regular',
      avatar: 'AG',
      joinDate: '1402/04/19'
    },
    { 
      id: 10, 
      name: 'نرگس رضایی', 
      email: 'narges.rezaei@gmail.com', 
      orders: 33, 
      isAdmin: true,
      status: 'active', 
      category: 'vip',
      avatar: 'NR',
      joinDate: '1401/09/30'
    },
    { 
      id: 11, 
      name: 'مهدی طاهری', 
      email: 'mahdi.taheri@gmail.com', 
      orders: 2, 
      isAdmin: false,
      status: 'inactive', 
      category: 'new',
      avatar: 'MT',
      joinDate: '1403/03/12'
    },
    { 
      id: 12, 
      name: 'پریسا صمدی', 
      email: 'parisa.samadi@gmail.com', 
      orders: 18, 
      isAdmin: false,
      status: 'active', 
      category: 'regular',
      avatar: 'PS',
      joinDate: '1402/06/07'
    },
    { 
      id: 13, 
      name: 'علیرضا حقیقی', 
      email: 'alireza.haghighi@gmail.com', 
      orders: 25, 
      isAdmin: false,
      status: 'active', 
      category: 'vip',
      avatar: 'AH',
      joinDate: '1402/01/24'
    },
    { 
      id: 14, 
      name: 'سمیه کاظمی', 
      email: 'somayeh.kazemi@gmail.com', 
      orders: 4, 
      isAdmin: false,
      status: 'active', 
      category: 'new',
      avatar: 'SK',
      joinDate: '1403/02/15'
    },
    { 
      id: 15, 
      name: 'پویا جعفری', 
      email: 'pouya.jafari@gmail.com', 
      orders: 6, 
      isAdmin: false,
      status: 'inactive', 
      category: 'regular',
      avatar: 'PJ',
      joinDate: '1402/10/08'
    },
    { 
      id: 16, 
      name: 'الهه مرادی', 
      email: 'elaheh.moradi@gmail.com', 
      orders: 19, 
      isAdmin: true,
      status: 'active', 
      category: 'vip',
      avatar: 'EM',
      joinDate: '1401/11/14'
    },
    { 
      id: 17, 
      name: 'حامد نیکبخت', 
      email: 'hamed.nikbakht@gmail.com', 
      orders: 11, 
      isAdmin: false,
      status: 'active', 
      category: 'regular',
      avatar: 'HN',
      joinDate: '1402/08/21'
    },
    { 
      id: 18, 
      name: 'راحله سعیدی', 
      email: 'raheleh.saeedi@gmail.com', 
      orders: 8, 
      isAdmin: false,
      status: 'active', 
      category: 'regular',
      avatar: 'RS',
      joinDate: '1402/12/03'
    },
    { 
      id: 19, 
      name: 'بهزاد شاهینی', 
      email: 'behzad.shahini@gmail.com', 
      orders: 1, 
      isAdmin: false,
      status: 'inactive', 
      category: 'new',
      avatar: 'BS',
      joinDate: '1403/01/17'
    },
    { 
      id: 20, 
      name: 'نگار موسوی', 
      email: 'negar.mousavi@gmail.com', 
      orders: 30, 
      isAdmin: true,
      status: 'active', 
      category: 'vip',
      avatar: 'NM',
      joinDate: '1401/07/26'
    },
  ]);

  // منوهای سایدبار
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'customers', label: 'مشتریان', icon: Users },
    { id: 'products', label: 'محصولات', icon: Package },
    { id: 'orders', label: 'سفارشات', icon: ShoppingBag },
    { id: 'analytics', label: 'آمار', icon: BarChart3 },
    { id: 'messages', label: 'پیام‌ها', icon: MessageCircle },
    { id: 'faq', label: 'سوالات متداول', icon: HelpCircle },
  ];

  // فیلتر کردن مشتریان
  const filteredCustomers = customers.filter(customer => {
    const matchesFilter = 
      activeFilter === 'all' ? true :
      activeFilter === 'active' ? customer.status === 'active' :
      activeFilter === 'inactive' ? customer.status === 'inactive' :
      activeFilter === 'vip' ? customer.category === 'vip' : true;
    
    return matchesFilter;
  });

  // تابع جستجو
  const handleSearch = (value) => {
    // پاک کردن تایمرهای قبلی
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    if (searchDelayTimeoutRef.current) {
      clearTimeout(searchDelayTimeoutRef.current);
      searchDelayTimeoutRef.current = null;
    }

    // تنظیم مقدار جستجو
    setSearchTerm(value);

    // اگر خالی بود، نتایج رو پاک کن
    if (!value.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setCurrentPage(1);
      return;
    }

    // شروع لودینگ با تاخیر 300ms برای دباونس
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);
      
      // شبیه‌سازی جستجو با تاخیر 1.5 ثانیه
      searchDelayTimeoutRef.current = setTimeout(() => {
        const results = customers.filter(customer => 
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

  // پاک کردن جستجو
  const clearSearch = () => {
    // پاک کردن همه تایمرها
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    if (searchDelayTimeoutRef.current) {
      clearTimeout(searchDelayTimeoutRef.current);
      searchDelayTimeoutRef.current = null;
    }
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
    setCurrentPage(1);
  };

  // محاسبه پیجینیشن
  const currentData = searchTerm.trim() ? searchResults : filteredCustomers;
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  // تغییر صفحه
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // تولید دکمه‌های صفحه‌بندی
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = 4;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        buttons.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        buttons.push(i);
      }
      
      if (end < totalPages - 1) {
        buttons.push('...');
      }
      
      buttons.push(totalPages);
    }
    
    return buttons;
  };

  // آمار
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
  const vipCustomers = customers.filter(c => c.category === 'vip').length;
  const adminCount = customers.filter(c => c.isAdmin).length;

  // کامپوننت اسکلتون لودینگ برای جدول
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="h-6 w-16 bg-gray-200 rounded-full mx-auto"></div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="h-6 w-16 bg-gray-200 rounded-full mx-auto"></div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-14 h-7 bg-gray-200 rounded-lg"></div>
          <div className="w-14 h-7 bg-gray-200 rounded-lg"></div>
          <div className="w-14 h-7 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );

  // کامپوننت سایدبار
  const Sidebar = () => (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">فروشگاه</h1>
            <p className="text-xs text-gray-400">پنل مدیریت</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <div className="mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-3">منوی اصلی</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-3">سایر</p>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">تنظیمات</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">خروج</span>
          </button>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium">مشتریان وفادار</p>
              <p className="text-xs text-gray-400">با مدیریت بهتر</p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );

  // محتوای اصلی - بخش مشتریان
  const CustomersContent = () => (
    <div className="flex-1 min-w-0">
      {/* هدر */}
      <div className="mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" />
              مشتریان
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              لیست کامل کاربران فروشگاه، برای مشاهده جزئیات، ویرایش یا حذف هر کاربر.
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus className="w-4 h-4" />
            <span>افزودن مشتری</span>
          </button>
        </div>
      </div>

      {/* کارت آمار */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">تعداد کل</p>
              <p className="text-2xl font-bold text-gray-800">{totalCustomers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">فعال</p>
              <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ویژه</p>
              <p className="text-2xl font-bold text-yellow-600">{vipCustomers}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">سفارشات</p>
              <p className="text-2xl font-bold text-purple-600">{totalOrders}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ادمین‌ها</p>
              <p className="text-2xl font-bold text-red-600">{adminCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* جستجو و فیلتر */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isSearching ? (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              ) : (
                <Search className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <input
              type="text"
              placeholder="جستجو بر اساس نام، ایمیل یا شماره سفارش..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pr-10 pl-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              dir="rtl"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'همه مشتریان', icon: Users },
              { id: 'vip', label: 'ویژه', icon: Star },
              { id: 'active', label: 'فعال', icon: CheckCircle },
              { id: 'inactive', label: 'غیرفعال', icon: UserX },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentPage(1);
                  clearSearch();
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* نمایش وضعیت جستجو */}
        {searchTerm.trim() && !isSearching && searchResults.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            <span className="font-medium text-blue-600">{searchResults.length}</span>
            <span> نتیجه برای "</span>
            <span className="font-medium">{searchTerm}</span>
            <span>" پیدا شد</span>
          </div>
        )}
        {searchTerm.trim() && !isSearching && searchResults.length === 0 && (
          <div className="mt-2 text-sm text-gray-500">
            <span>نتیجه‌ای برای "</span>
            <span className="font-medium">{searchTerm}</span>
            <span>" پیدا نشد</span>
          </div>
        )}
      </div>

      {/* جدول */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-right text-sm text-gray-600 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">مشتری</th>
                <th className="px-4 py-3 font-medium text-center">سفارش</th>
                <th className="px-4 py-3 font-medium">ایمیل</th>
                <th className="px-4 py-3 font-medium text-center">ادمین</th>
                <th className="px-4 py-3 font-medium text-center">اقدامات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isSearching ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : currentItems.length > 0 ? (
                currentItems.map((customer) => (
                  <tr key={customer.id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 ${
                          customer.category === 'vip' 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                            : customer.status === 'active'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                            : 'bg-gradient-to-r from-gray-500 to-gray-600'
                        }`}>
                          {customer.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{customer.name}</p>
                          <p className="text-xs text-gray-400">{customer.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                        <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-sm font-semibold text-blue-600">#{customer.orders}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 truncate max-w-[180px]">{customer.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {customer.isAdmin ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                          <Shield className="w-3.5 h-3.5" />
                          ادمین
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">کاربر</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors" title="ادمین">
                          <BadgeCheck className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-green-100 transition-colors" title="فعال">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-100 transition-colors" title="حذف">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-purple-100 transition-colors" title="بیشتر">
                          <MoreVertical className="w-4 h-4 text-purple-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    {searchTerm.trim() ? (
                      <>
                        <Search className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p>نتیجه‌ای برای "{searchTerm}" یافت نشد</p>
                        <button
                          onClick={clearSearch}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          پاک کردن جستجو
                        </button>
                      </>
                    ) : (
                      <>
                        <Users className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p>هیچ مشتری‌ای با این مشخصات یافت نشد</p>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* فوتر جدول با پیجینیشن */}
        {!isSearching && totalItems > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-gray-50 border-t border-gray-100 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-blue-600">{totalItems}</span>
              <span>نفر از</span>
              <span className="font-medium">{searchTerm.trim() ? searchResults.length : totalCustomers}</span>
              <span>مشتری</span>
              {activeFilter !== 'all' && !searchTerm.trim() && (
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                  {activeFilter === 'vip' ? 'ویژه' : activeFilter === 'active' ? 'فعال' : 'غیرفعال'}
                </span>
              )}
              {searchTerm.trim() && (
                <span className="text-xs text-gray-400 bg-blue-50 px-2 py-0.5 rounded-full">
                  نتیجه جستجو
                </span>
              )}
              <span className="text-xs text-gray-400 mr-2">
                صفحه {currentPage} از {totalPages}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                قبلی
              </button>
              
              {getPaginationButtons().map((btn, index) => (
                <button
                  key={index}
                  onClick={() => typeof btn === 'number' && goToPage(btn)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    btn === currentPage
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : btn === '...'
                      ? 'bg-transparent text-gray-400 cursor-default'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                  disabled={btn === '...'}
                >
                  {btn}
                </button>
              ))}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                بعدی
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* فوتر */}
      <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-200 pt-4">
        <p>ارسال گالری | هنر در چوب و دکور</p>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 font-iransans">
      {/* سایدبار دسکتاپ */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* سایدبار موبایل */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl animate-slide-in">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">فروشگاه</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* محتوای اصلی */}
      <div className="flex-1 min-w-0 p-4 md:p-6">
        {/* هدر موبایل */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">فروشگاه</span>
          </div>
          <div className="w-10" />
        </div>

        {/* نمایش محتوای مناسب */}
        {activeTab === 'customers' ? <CustomersContent /> : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <LayoutDashboard className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-700">{menuItems.find(m => m.id === activeTab)?.label}</h2>
              <p className="text-gray-500 mt-2">این بخش در حال توسعه است</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;