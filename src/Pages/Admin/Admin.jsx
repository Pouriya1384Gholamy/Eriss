import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import ProductsPage from './Components/ProductsPage';
import OrdersPage from './Components/OrdersPage';
import CustomersPage from './Components/CustomersPage'; // <--- ایمپورت مشتریان
import AddProductPage from './Components/AddProductPage'; // <--- ایمپورت افزودن محصول
import { Menu, ShoppingBag, LayoutDashboard } from 'lucide-react';

const PlaceholderPage = ({ title }) => (
  <div className="flex-1 min-w-0 p-12 text-center">
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-12 border border-gray-100">
      <div className="text-gray-300 text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
      <p className="text-gray-500 mt-2">این بخش در حال توسعه است</p>
    </div>
  </div>
);

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'products': return <ProductsPage />;
      case 'add-product': return <AddProductPage />; // <--- این صفحه اضافه شد
      case 'orders': return <OrdersPage />;
      case 'customers': return <CustomersPage />; // <--- این صفحه اضافه شد
      case 'dashboard': return <PlaceholderPage title="داشبورد" />;
      case 'analytics': return <PlaceholderPage title="آمار و تحلیل" />;
      case 'messages': return <PlaceholderPage title="پیام‌ها" />;
      case 'faq': return <PlaceholderPage title="سوالات متداول" />;
      default: return <ProductsPage />;
    }
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 font-iransans">
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* هدر موبایل */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800">فروشگاه</span>
          </div>
          <div className="w-10" />
        </div>

        {/* رندر محتوا */}
        <div className="flex-1 p-4 md:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;