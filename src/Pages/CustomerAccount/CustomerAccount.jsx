// src/Pages/CustomerAccount/CustomerAccount.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Info } from 'lucide-react'; // Settings حذف شد

import { COLORS } from './Components/CustomerAccount.styles';
import Sidebar, { menuItems } from './Components/Sidebar';
import DashboardContent from './Components/DashboardContent';
import { 
  OrdersContent, 
  // AccountDetailsContent, // <--- حذف شد
  AddressesContent, 
  WishlistContent, 
  WalletContent, 
  MarketingContent, 
  SupportContent 
} from './Components/TabContents';
import { products } from '../../data/products';

const discountedProducts = products.filter(p => p.isDiscounted).slice(0, 9);

function CustomerAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [userInfo, setUserInfo] = useState({
    firstName: 'پوریا', lastName: 'غلامی', email: 'pouria@gmail.com',
    phone: '+98 912 345 6789', password: '********', confirmPassword: '********',
    birthDate: '۱۳۷۰/۰۳/۱۵', gender: 'مرد', balance: '۱۲,۵۰۰,۰۰۰ تومان',
    memberSince: 'عضو از ۱۴۰۰', orders: 24, wishlist: 12,
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳، واحد ۵', postalCode: '۱۵۶۸۷۴۳۲۱',
    city: 'تهران', province: 'تهران', cardNumber: '**** **** **** ۱۲۳۴',
    cardHolder: 'پوریا غلامی', expire: '۱۲/۳۱', bankName: 'بانک ملت',
    about: 'علاقه‌مند به طراحی داخلی و دکوراسیون منزل'
  });

  const recentOrders = [
    { id: '#۱۲۳۴', date: '۱۴۰۲/۰۸/۱۵', total: '۱,۲۴۴,۰۰۰ تومان', paid: 'بله', delivered: 'تحویل شده', status: 'delivered', items: 3, productId: 1 },
    { id: '#۱۲۳۵', date: '۱۴۰۲/۰۸/۱۲', total: '۸۵۰,۰۰۰ تومان', paid: 'بله', delivered: 'در حال ارسال', status: 'processing', items: 2, productId: 2 },
    { id: '#۱۲۳۶', date: '۱۴۰۲/۰۸/۱۰', total: '۲,۱۰۰,۰۰۰ تومان', paid: 'خیر', delivered: 'در انتظار', status: 'pending', items: 4, productId: 3 },
  ];

  useEffect(() => {
    const updateItemsPerPage = () => {
      const w = window.innerWidth;
      if (w < 480) setItemsPerPage(1);
      else if (w < 768) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [sidebarOpen]);

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => { setSlideIndex(0); }, [itemsPerPage]);

  const handleEdit = (section) => { setIsEditing(true); setEditData({ ...userInfo, section }); };
  const handleSave = (updatedData) => {
    if (updatedData) setUserInfo(updatedData);
    setIsEditing(false); setEditData(null);
    setSuccessMessage('✅ اطلاعات با موفقیت ویرایش شد!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  const handleCancel = () => { setIsEditing(false); setEditData(null); };

  const totalSlides = Math.max(1, Math.ceil(discountedProducts.length / itemsPerPage));
  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const getCurrentProducts = () => discountedProducts.slice(slideIndex * itemsPerPage, (slideIndex * itemsPerPage) + itemsPerPage);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent userInfo={userInfo} setUserInfo={setUserInfo} recentOrders={recentOrders} onEdit={handleEdit} isEditing={isEditing} editData={editData} onSave={handleSave} onCancel={handleCancel} slideIndex={slideIndex} nextSlide={nextSlide} prevSlide={prevSlide} getCurrentProducts={getCurrentProducts} totalSlides={totalSlides} onViewAllOrders={() => setActiveTab('orders')} navigate={navigate} successMessage={successMessage} />;
      case 'orders': return <OrdersContent orders={recentOrders} navigate={navigate} />;
      // case 'account': return <AccountDetailsContent userInfo={userInfo} onEdit={handleEdit} isEditing={isEditing} editData={editData} onSave={handleSave} onCancel={handleCancel} />; // <--- حذف شد
      case 'addresses': return <AddressesContent userInfo={userInfo} onEdit={handleEdit} isEditing={isEditing} editData={editData} onSave={handleSave} onCancel={handleCancel} showAddAddress={showAddAddress} setShowAddAddress={setShowAddAddress} />;
      case 'wishlist': return <WishlistContent />;
      case 'wallet': return <WalletContent />;
      case 'marketing': return <MarketingContent />;
      case 'support': return <SupportContent />;
      default: return <DashboardContent userInfo={userInfo} setUserInfo={setUserInfo} recentOrders={recentOrders} onEdit={handleEdit} isEditing={isEditing} editData={editData} onSave={handleSave} onCancel={handleCancel} slideIndex={slideIndex} nextSlide={nextSlide} prevSlide={prevSlide} getCurrentProducts={getCurrentProducts} totalSlides={totalSlides} onViewAllOrders={() => setActiveTab('orders')} navigate={navigate} successMessage={successMessage} />;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden" style={{ backgroundColor: COLORS.primaryBg }}>
      <header className="sticky top-0 z-30 border-b bg-white/95 shadow-sm backdrop-blur-md" style={{ borderColor: COLORS.border }}>
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-2 sm:h-16 sm:gap-3">
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
              <button onClick={() => setSidebarOpen(v => !v)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#f0f3ec] active:scale-95 lg:hidden">{sidebarOpen ? <X className="h-5 w-5" style={{ color: COLORS.text }} /> : <Menu className="h-5 w-5" style={{ color: COLORS.text }} />}</button>
              <div className="flex min-w-0 shrink-0 items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl sm:h-9 sm:w-9" style={{ backgroundColor: COLORS.primary }}><span className="text-sm font-bold text-white">A</span></div>
                <span className="truncate text-base font-bold sm:text-xl" style={{ color: COLORS.primary }}>arion</span>
              </div>
            </div>
            <div className="mx-2 hidden min-w-0 max-w-md flex-1 md:block lg:max-w-lg">
              <div className="relative">
                <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: COLORS.primaryLight }} />
                <input type="search" placeholder="جستجو در محصولات و سفارش‌ها..." className="w-full rounded-xl border bg-white/60 py-2.5 pl-4 pr-10 text-sm outline-none transition placeholder:opacity-70 focus:ring-2" style={{ borderColor: COLORS.border, color: COLORS.text, '--tw-ring-color': `${COLORS.primary}55` }} />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 border-r pr-2 sm:gap-3 sm:pr-3" style={{ borderColor: COLORS.border }}>
              <div className="hidden min-w-0 text-right sm:block">
                <p className="max-w-[110px] truncate text-sm font-semibold md:max-w-[140px] lg:max-w-[180px]" style={{ color: COLORS.text }}>{userInfo.firstName} {userInfo.lastName}</p>
                <p className="max-w-[120px] truncate text-xs md:max-w-[150px] lg:max-w-[200px]" style={{ color: COLORS.primaryLight }}>{userInfo.email}</p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md sm:h-10 sm:w-10" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}>{userInfo.firstName?.[0] || 'U'}</div>
            </div>
          </div>
          <div className="pb-3 md:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: COLORS.primaryLight }} />
              <input type="search" placeholder="جستجو..." className="w-full rounded-xl border bg-white/70 py-2.5 pl-3 pr-10 text-sm outline-none transition placeholder:opacity-70 focus:ring-2" style={{ borderColor: COLORS.border, color: COLORS.text, '--tw-ring-color': `${COLORS.primary}55` }} />
            </div>
          </div>
        </div>
      </header>

      {sidebarOpen && <button onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden" />}

      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
        <div className="flex items-start gap-0 lg:gap-6">
          <Sidebar userInfo={userInfo} activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="min-w-0 w-full flex-1">
            <div className="rounded-xl border bg-white/80 p-3 shadow-lg backdrop-blur-sm sm:rounded-2xl sm:p-5 lg:p-6" style={{ boxShadow: `0 8px 32px ${COLORS.primary}15`, borderColor: COLORS.border }}>{renderContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccount;