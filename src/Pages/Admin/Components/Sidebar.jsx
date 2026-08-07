import React from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
  Star,
  Menu,
  X,
  Settings,
  LogOut,
  Package,
  BarChart3,
  Plus // برای افزودن محصول
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  
  // منوهای سایدبار (افزودن محصول هم اضافه شد)
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'products', label: 'محصولات', icon: Package },
    { id: 'add-product', label: 'افزودن محصول', icon: Plus }, // <--- این خط اضافه شد
    { id: 'orders', label: 'سفارشات', icon: ShoppingBag },
    { id: 'customers', label: 'مشتریان', icon: Users },
    { id: 'analytics', label: 'آمار', icon: BarChart3 },
    { id: 'messages', label: 'پیام‌ها', icon: MessageCircle },
    { id: 'faq', label: 'سوالات متداول', icon: HelpCircle },
  ];

  return (
    <>
      {/* سایدبار دسکتاپ */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0 h-screen sticky top-0 overflow-y-auto hidden lg:block">
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
                  // اگر در حالت موبایل بود، منو را ببند
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
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

      {/* سایدبار موبایل (Overlay) - دقیقاً مثل کد شما با پس‌زمینه سفید */}
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
    </>
  );
};

export default Sidebar;