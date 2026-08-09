// src/Pages/CustomerAccount/Components/Sidebar.jsx
import React from 'react';
import { X, User, ShoppingBag, Heart, MapPin, Wallet, LogOut, Settings, Award, Headphones } from 'lucide-react';
import { COLORS } from './CustomerAccount.styles';

export const menuItems = [
  { id: 'dashboard', label: 'پیشخوان', icon: User, color: COLORS.primary },
  { id: 'orders', label: 'سفارشات', icon: ShoppingBag, color: COLORS.warm },
  { id: 'addresses', label: 'آدرس‌ها', icon: MapPin, color: COLORS.primaryLight },
  // { id: 'account', label: 'جزئیات حساب', icon: Settings, color: COLORS.accent }, // <--- حذف شد
  { id: 'wishlist', label: 'علاقه‌مندی‌ها', icon: Heart, color: COLORS.danger },
  { id: 'wallet', label: 'کیف پول من', icon: Wallet, color: COLORS.warm },
  { id: 'marketing', label: 'بازاریاب شوید', icon: Award, color: COLORS.primary },
  { id: 'support', label: 'پشتیبانی', icon: Headphones, color: COLORS.accentLight },
  { id: 'logout', label: 'خروج', icon: LogOut, color: COLORS.danger },
];

const Sidebar = ({ userInfo, activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  return (
    <aside className={`fixed inset-y-0 right-0 z-50 w-[min(300px,86vw)] transform bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-72 lg:sticky lg:top-[88px] lg:z-10 lg:h-[calc(100vh-110px)] lg:w-64 lg:max-w-none lg:translate-x-0 lg:rounded-2xl lg:border lg:bg-white/70 lg:shadow-sm lg:backdrop-blur-sm ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ borderColor: COLORS.border }}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4 lg:hidden" style={{ borderColor: COLORS.border }}>
          <span className="text-base font-bold sm:text-lg" style={{ color: COLORS.text }}>منوی کاربری</span>
          <button onClick={() => setSidebarOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#f0f3ec] active:scale-95"><X className="h-5 w-5" style={{ color: COLORS.text }} /></button>
        </div>
        <div className="m-3 rounded-2xl border p-3 lg:hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primaryBg}, #fff)`, borderColor: COLORS.border }}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}>{userInfo.firstName?.[0] || 'U'}</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold" style={{ color: COLORS.text }}>{userInfo.firstName} {userInfo.lastName}</p><p className="truncate text-xs" style={{ color: COLORS.primaryLight }}>{userInfo.email}</p></div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-3">
          {menuItems.map(item => {
            const Icon = item.icon, isActive = activeTab === item.id, isLogout = item.id === 'logout';
            return <button key={item.id} onClick={() => { if (isLogout) { console.log('خروج'); setSidebarOpen(false); return; } setActiveTab(item.id); setSidebarOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm font-medium transition-all active:scale-[0.99]" style={{ background: isActive ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` : 'transparent', color: isActive ? '#fff' : isLogout ? COLORS.danger : COLORS.text, boxShadow: isActive ? `0 6px 16px ${COLORS.primary}35` : 'none' }}><Icon className="h-4 w-4 shrink-0" style={{ color: isActive ? '#fff' : item.color }} /><span className="min-w-0 flex-1 truncate">{item.label}</span>{isActive && <span className="h-5 w-1 shrink-0 rounded-full bg-white" />}</button>;
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;