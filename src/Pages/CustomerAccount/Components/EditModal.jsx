// src/Pages/CustomerAccount/Components/EditModal.jsx
import React, { useState, useEffect } from 'react';
import { Save, X as XIcon } from 'lucide-react';
import { COLORS } from './CustomerAccount.styles';

const EditModal = ({ userInfo, onSave, onCancel, section }) => {
  // با ۲۰ سال تجربه: همیشه state را با مقدار اولیه دقیق مقداردهی کن
  const [formData, setFormData] = useState(userInfo);
  
  // با ۲۰ سال تجربه: اگر userInfo تغییر کرد، فرم را به‌روز کن
  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // با ۲۰ سال تجربه: فیلدها را با مقدار اولیه صحیح تعریف کن
  const fields = section === 'profile' ? [
    { label: 'نام', name: 'firstName', type: 'text', value: formData.firstName, colSpan: 'col-span-1' },
    { label: 'نام خانوادگی', name: 'lastName', type: 'text', value: formData.lastName, colSpan: 'col-span-1' },
    { label: 'ایمیل', name: 'email', type: 'email', value: formData.email, colSpan: 'col-span-2' },
    { label: 'تلفن', name: 'phone', type: 'text', value: formData.phone, colSpan: 'col-span-2' },
    { label: 'تاریخ تولد', name: 'birthDate', type: 'text', value: formData.birthDate, colSpan: 'col-span-1' },
    { label: 'جنسیت', name: 'gender', type: 'select', value: formData.gender, options: ['مرد', 'زن', 'سایر'], colSpan: 'col-span-1' },
    { label: 'درباره من', name: 'about', type: 'textarea', value: formData.about, colSpan: 'col-span-2', rows: 3 },
  ] : section === 'address' ? [
    { label: 'آدرس', name: 'address', type: 'textarea', value: formData.address, colSpan: 'col-span-2', rows: 3, placeholder: 'خیابان، پلاک، واحد' },
    { label: 'کد پستی', name: 'postalCode', type: 'text', value: formData.postalCode, colSpan: 'col-span-1', placeholder: '۱۰ رقمی' },
    { label: 'شهر', name: 'city', type: 'text', value: formData.city, colSpan: 'col-span-1', placeholder: 'مثال: تهران' },
    { label: 'استان', name: 'province', type: 'text', value: formData.province, colSpan: 'col-span-2', placeholder: 'مثال: تهران' },
  ] : [];

  const inputClass = "w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-opacity-50";
  const inputStyle = { borderColor: COLORS.border, '--tw-ring-color': `${COLORS.primary}55`, color: COLORS.text };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {/* 
        با ۲۰ سال تجربه: 
        - items-center فرم را دقیقاً در مرکز صفحه قرار می‌دهد.
        - max-h-[85vh] و overflow-y-auto باعث می‌شود فرم اگر بلند بود، اسکرول بخورد.
        - این روش در تمام صفحات و دستگاه‌ها بهترین عملکرد را دارد.
      */}
      <div
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        style={{ borderColor: COLORS.border }}
      >
        {/* هدر مودال */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4"
          style={{ borderColor: COLORS.border }}
        >
          <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>
            ویرایش {section === 'profile' ? 'اطلاعات کاربری' : 'آدرس'}
          </h3>
          <button
            onClick={onCancel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 active:scale-95"
          >
            <XIcon className="h-5 w-5" style={{ color: COLORS.text }} />
          </button>
        </div>

        {/* بدنه فرم */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {fields.map(field => (
              <div key={field.name} className={field.colSpan || 'col-span-1'}>
                <label className="mb-1.5 block text-sm font-semibold" style={{ color: COLORS.textLight }}>
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select name={field.name} value={field.value} onChange={handleChange} className={inputClass} style={inputStyle}>
                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea 
                    name={field.name} 
                    value={field.value} 
                    onChange={handleChange} 
                    rows={field.rows || 3} 
                    placeholder={field.placeholder || ''} 
                    className={inputClass} 
                    style={inputStyle} 
                  />
                ) : (
                  <input 
                    type={field.type} 
                    name={field.name} 
                    value={field.value} 
                    onChange={handleChange} 
                    placeholder={field.placeholder || ''} 
                    className={inputClass} 
                    style={inputStyle} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* فوتر مودال */}
        <div
          className="sticky bottom-0 flex flex-col-reverse gap-3 border-t bg-white px-6 py-4 sm:flex-row"
          style={{ borderColor: COLORS.border }}
        >
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border bg-white py-2.5 font-medium transition-all hover:bg-gray-50 active:scale-95"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            انصراف
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-medium text-white transition-all hover:shadow-lg active:scale-95"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}
          >
            <Save className="h-4 w-4" />
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;