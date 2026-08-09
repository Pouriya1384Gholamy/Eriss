// src/Pages/CustomerAccount/Components/TabContents.jsx
import React, { useState } from 'react';
import { Edit2, Plus, Heart, Wallet, Award, Headphones } from 'lucide-react';
import { COLORS } from './CustomerAccount.styles';
import OrdersTable from './OrdersTable';
import EditModal from './EditModal';

// ----- تب سفارشات -----
export const OrdersContent = ({ orders, navigate }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold sm:text-xl" style={{ color: COLORS.text }}>سفارشات</h2>
    <OrdersTable orders={orders} onViewDetails={order => order.productId && navigate(`/product/${order.productId}`)} />
  </div>
);

// ----- تب آدرس‌ها (اصلاح‌شده) -----
export const AddressesContent = ({ userInfo, onEdit, isEditing, editData, onSave, onCancel, showAddAddress, setShowAddAddress }) => {
  // لیست آدرس‌ها را خالی شروع می‌کنیم (دیگر آدرس پیش‌فرض userInfo نمایش داده نمی‌شود)
  const [addressList, setAddressList] = useState([]);
  const [newAddress, setNewAddress] = useState({ address: '', postalCode: '', city: '', province: '' });

  const handleAddAddress = () => {
    if (!newAddress.address || !newAddress.city) return alert('لطفاً آدرس و شهر را وارد کنید!');
    setAddressList([...addressList, newAddress]);
    setNewAddress({ address: '', postalCode: '', city: '', province: '' });
    setShowAddAddress(false);
    onSave({ ...userInfo });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold sm:text-xl" style={{ color: COLORS.text }}>آدرس‌ها</h2>
        <button 
          onClick={() => setShowAddAddress(v => !v)} 
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white" 
          style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}
        >
          <Plus className="h-4 w-4" />
          {showAddAddress ? 'بستن فرم' : 'افزودن آدرس جدید'}
        </button>
      </div>

      {/* فرم افزودن آدرس جدید */}
      {showAddAddress && (
        <div className="rounded-xl border p-4" style={{ background: COLORS.cardBg, borderColor: COLORS.border }}>
          <h4 className="mb-3 font-semibold text-sm" style={{ color: COLORS.text }}>فرم ثبت آدرس جدید</h4>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs" style={{ color: COLORS.primaryLight }}>آدرس</label>
              <textarea 
                value={newAddress.address} 
                onChange={e => setNewAddress({ ...newAddress, address: e.target.value })} 
                rows={2} 
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" 
                style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55` }} 
                placeholder="خیابان، پلاک، واحد" 
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs" style={{ color: COLORS.primaryLight }}>استان</label>
                <input 
                  type="text" 
                  value={newAddress.province} 
                  onChange={e => setNewAddress({ ...newAddress, province: e.target.value })} 
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" 
                  style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55` }} 
                  placeholder="مثال: تهران" 
                />
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: COLORS.primaryLight }}>شهر</label>
                <input 
                  type="text" 
                  value={newAddress.city} 
                  onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} 
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" 
                  style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55` }} 
                  placeholder="مثال: تهران" 
                />
              </div>
              <div>
                <label className="mb-1 block text-xs" style={{ color: COLORS.primaryLight }}>کد پستی</label>
                <input 
                  type="text" 
                  value={newAddress.postalCode} 
                  onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })} 
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" 
                  style={{ borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55` }} 
                  placeholder="۱۰ رقمی" 
                />
              </div>
            </div>
            <button 
              onClick={handleAddAddress} 
              className="w-full rounded-lg py-2.5 text-sm font-medium text-white hover:shadow-md" 
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}
            >
              ثبت آدرس
            </button>
          </div>
        </div>
      )}

      {/* نمایش لیست آدرس‌های اضافه شده */}
      {addressList.length > 0 ? (
        addressList.map((addr, idx) => (
          <div key={idx} className="rounded-xl border p-4" style={{ background: COLORS.cardBg, borderColor: COLORS.border }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="font-medium" style={{ color: COLORS.text }}>آدرس {idx + 1}</p>
                <p className="mt-1 break-words text-sm" style={{ color: COLORS.primaryLight }}>{addr.address}</p>
                <p className="text-sm" style={{ color: COLORS.primaryLight }}>کد پستی: {addr.postalCode}</p>
                <p className="text-sm" style={{ color: COLORS.primaryLight }}>{addr.city}، {addr.province}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <button 
                onClick={() => onEdit('address')} 
                className="flex items-center gap-1 text-sm font-medium" 
                style={{ color: COLORS.primary }}
              >
                <Edit2 className="h-4 w-4" />
                ویرایش
              </button>
              <button 
                onClick={() => setAddressList(addressList.filter((_, i) => i !== idx))} 
                className="text-sm font-medium" 
                style={{ color: COLORS.danger }}
              >
                حذف
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8" style={{ color: COLORS.primaryLight }}>
          <p>هنوز آدرسی ثبت نکرده‌اید. برای افزودن آدرس جدید، دکمه "افزودن آدرس جدید" را بزنید.</p>
        </div>
      )}

      {isEditing && <EditModal userInfo={editData || userInfo} onSave={onSave} onCancel={onCancel} section={editData?.section} />}
    </div>
  );
};

// ----- تب علاقه‌مندی‌ها -----
export const WishlistContent = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold sm:text-xl" style={{ color: COLORS.text }}>علاقه‌مندی‌ها</h2>
    <div className="py-12 text-center" style={{ color: COLORS.primaryLight }}>
      <Heart className="mx-auto mb-4 h-12 w-12 opacity-20" />
      <p className="text-sm sm:text-base font-medium">در حال توسعه!</p>
      <p className="text-sm opacity-75 mt-1">این بخش در آپدیت‌های آینده به فروشگاه اضافه خواهد شد تا بتوانید محصولات مورد علاقه خود را ذخیره کنید.</p>
    </div>
  </div>
);

// ----- تب کیف پول -----
export const WalletContent = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold sm:text-xl" style={{ color: COLORS.text }}>کیف پول من</h2>
    <div className="py-12 text-center" style={{ color: COLORS.primaryLight }}>
      <Wallet className="mx-auto mb-4 h-12 w-12 opacity-20" />
      <p className="text-sm sm:text-base font-medium">به زودی!</p>
      <p className="text-sm opacity-75 mt-1">ما در حال توسعه سیستم کیف پول هوشمند هستیم. در نسخه‌های بعدی می‌توانید موجودی خود را مدیریت کنید و شارژ نمایید.</p>
    </div>
  </div>
);

// ----- تب بازاریابی -----
export const MarketingContent = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold sm:text-xl" style={{ color: COLORS.text }}>بازاریاب شوید</h2>
    <div className="py-12 text-center" style={{ color: COLORS.primaryLight }}>
      <Award className="mx-auto mb-4 h-12 w-12 opacity-20" />
      <p className="text-sm sm:text-base font-medium">در دست ساخت!</p>
      <p className="text-sm opacity-75 mt-1">سیستم بازاریابی و همکاری در فروش در حال طراحی است. به زودی می‌توانید به عنوان بازاریاب ثبت‌نام کنید و از فروش خود کمیسیون دریافت کنید.</p>
    </div>
  </div>
);

// ----- تب پشتیبانی -----
export const SupportContent = () => (
  <div className="space-y-4 px-2 py-8 text-center sm:px-0">
    <Headphones className="mx-auto h-14 w-14 sm:h-16 sm:w-16" style={{ color: COLORS.primary }} />
    <h2 className="text-lg font-bold sm:text-xl" style={{ color: COLORS.text }}>پشتیبانی</h2>
    <p className="mx-auto max-w-md text-sm" style={{ color: COLORS.primaryLight }}>۲۴ ساعته، ۷ روز هفته در خدمت شما هستیم</p>
    <button 
      className="rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg sm:text-base" 
      style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}
    >
      تماس با پشتیبانی
    </button>
  </div>
);