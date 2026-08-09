// src/Components/DashboardContent.jsx
import React, { useState } from 'react';
import { User, Info, Percent, Save, Truck, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS } from './CustomerAccount.styles';
import OrdersTable from './OrdersTable';
import EditModal from './EditModal';
import productImg from '../../../assets/img/wood.jpg';
import { calculateDiscountPrice } from '../../../data/products';

const DashboardContent = ({ userInfo, setUserInfo, recentOrders, onEdit, isEditing, editData, onSave, onCancel, slideIndex, nextSlide, prevSlide, getCurrentProducts, totalSlides, onViewAllOrders, navigate, successMessage }) => {
  const [passwordForm, setPasswordForm] = useState({ fullName: `${userInfo.firstName} ${userInfo.lastName}`, email: userInfo.email, password: '', confirmPassword: '' });
  const currentProducts = getCurrentProducts();

  const handlePasswordUpdate = () => {
    if (passwordForm.password !== passwordForm.confirmPassword) return alert('رمز عبور و تایید آن مطابقت ندارند!');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passwordForm.email)) return alert('لطفاً یک ایمیل معتبر وارد کنید!');
    const nameParts = passwordForm.fullName.trim().split(/\s+/);
    setUserInfo({ ...userInfo, firstName: nameParts[0] || '', lastName: nameParts.slice(1).join(' ') || '', email: passwordForm.email });
    onSave({ ...userInfo, firstName: nameParts[0] || '', lastName: nameParts.slice(1).join(' ') || '', email: passwordForm.email });
  };

  const handleViewDetails = (order) => { if (order.productId) navigate(`/product/${order.productId}`); else onViewAllOrders(); };

  return <div className="space-y-4 sm:space-y-5">
    {successMessage && <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-medium text-green-700 border border-green-200">{successMessage}</div>}
    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: COLORS.border }}>
      <h2 className="flex items-center gap-2 text-base font-bold sm:text-xl" style={{ color: COLORS.text }}><Info className="h-5 w-5 shrink-0" style={{ color: COLORS.primary }} />اطلاعات بیشتر</h2>
      <span className="text-xs" style={{ color: COLORS.primaryLight }}>{userInfo.memberSince}</span>
    </div>
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="w-full overflow-hidden rounded-xl border p-3 sm:p-4" style={{ background: COLORS.cardBg, borderColor: COLORS.border }}>
        <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
          <h3 className="flex min-w-0 items-center gap-2 text-sm font-semibold" style={{ color: COLORS.text }}><Percent className="h-4 w-4 shrink-0" style={{ color: COLORS.danger }} /><span className="truncate">تخفیف‌های ویژه</span></h3>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button onClick={prevSlide} disabled={totalSlides <= 1} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#f0f3ec] disabled:opacity-30" style={{ color: COLORS.primary }}><ChevronRight className="h-5 w-5" /></button>
            <span className="min-w-[2.5rem] text-center text-xs" style={{ color: COLORS.primaryLight }}>{slideIndex + 1} / {totalSlides}</span>
            <button onClick={nextSlide} disabled={totalSlides <= 1} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#f0f3ec] disabled:opacity-30" style={{ color: COLORS.primary }}><ChevronLeft className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="w-full space-y-2">{currentProducts.map(product => {
          const discountPrice = calculateDiscountPrice(product.price, product.discountPercentage);
          return <div key={product.id} className="flex w-full items-center gap-2 rounded-lg border bg-white p-2 transition-shadow hover:shadow-sm sm:gap-3" style={{ borderColor: COLORS.border }}>
            <div className="relative shrink-0"><img src={product.image || productImg} alt={product.title} className="h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-16" />{product.discountPercentage && <span className="absolute -right-1 -top-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${COLORS.danger}, ${COLORS.warm})` }}>{product.discountPercentage}%</span>}</div>
            <div className="min-w-0 flex-1"><h4 className="truncate text-xs font-medium" style={{ color: COLORS.text }}>{product.title}</h4><div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5"><span className="text-[10px] line-through" style={{ color: COLORS.primaryLight }}>{product.price.toLocaleString()} تومان</span><span className="text-xs font-bold" style={{ color: COLORS.danger }}>{discountPrice.toLocaleString()} تومان</span></div></div>
            <button onClick={() => navigate(`/product/${product.id}`)} className="flex shrink-0 items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium text-white transition-all hover:shadow-md sm:px-2.5" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}><Eye className="h-3 w-3" /><span className="hidden xs:inline sm:inline">جزئیات</span></button>
          </div>;
        })}</div>
      </div>
      <div className="h-full w-full rounded-xl border p-3 sm:p-4" style={{ background: `linear-gradient(135deg, ${COLORS.primaryBg}, white)`, borderColor: COLORS.border }}>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.text }}><User className="h-4 w-4 shrink-0" style={{ color: COLORS.primary }} />اطلاعات کاربری</h3>
        <div className="w-full space-y-1.5">
          <div><label className="mb-0.5 block text-[10px]" style={{ color: COLORS.primaryLight }}>نام و نام خانوادگی</label><input type="text" value={passwordForm.fullName} onChange={e => setPasswordForm({ ...passwordForm, fullName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55`, backgroundColor: 'white', color: COLORS.text }} placeholder="مثال: پوریا غلامی" /></div>
          <div><label className="mb-0.5 block text-[10px]" style={{ color: COLORS.primaryLight }}>ایمیل</label><input type="email" value={passwordForm.email} onChange={e => setPasswordForm({ ...passwordForm, email: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55`, backgroundColor: 'white', color: COLORS.text }} placeholder="مثال: pouria@gmail.com" /></div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div><label className="mb-0.5 block text-[10px]" style={{ color: COLORS.primaryLight }}>رمز عبور</label><input type="password" value={passwordForm.password} onChange={e => setPasswordForm({ ...passwordForm, password: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55`, backgroundColor: 'white', color: COLORS.text }} placeholder="رمز عبور جدید" /></div>
            <div><label className="mb-0.5 block text-[10px]" style={{ color: COLORS.primaryLight }}>تایید رمز</label><input type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55`, backgroundColor: 'white', color: COLORS.text }} placeholder="تایید رمز عبور" /></div>
          </div>
          <button onClick={handlePasswordUpdate} className="mt-2 w-full rounded-lg bg-gradient-to-r py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:shadow-md active:scale-[0.98]" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}><span className="flex items-center justify-center gap-1.5"><Save className="h-3.5 w-3.5" />به‌روزرسانی اطلاعات</span></button>
        </div>
      </div>
    </div>
    <div className="rounded-xl border p-3 sm:p-4" style={{ background: COLORS.cardBg, borderColor: COLORS.border }}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.text }}><Truck className="h-4 w-4 shrink-0" style={{ color: COLORS.primaryLight }} />سفارشات اخیر</h3><button onClick={onViewAllOrders} className="text-xs font-medium hover:underline" style={{ color: COLORS.primary }}>مشاهده همه</button></div>
      <OrdersTable orders={recentOrders} onViewDetails={handleViewDetails} />
    </div>
    {isEditing && <EditModal userInfo={editData || userInfo} onSave={onSave} onCancel={onCancel} section={editData?.section} />}
  </div>;
};

export default DashboardContent;