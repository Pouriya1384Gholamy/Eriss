import React, { useState } from 'react';
import {
  X,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  CheckCircle,
  Save,
  Ruler,
  Maximize2,
} from 'lucide-react';

const initialFormData = {
  name: '',
  price: '',
  weight: '',
  warranty: '',
  brand: '',
  category: '',
  subCategory: '',
  status: '',
  color: '',
  width: '',
  length: '',
  height: '',
};

const inputClassName =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10';

const selectClassName =
  'w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10';

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  isSelect = false,
  options = [],
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-bold text-slate-700">
        {label}
      </label>

      {isSelect ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={selectClassName}
        >
          <option value="">انتخاب کنید</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClassName}
        />
      )}
    </div>
  );
};

// کامپوننت اسلات تصویر با قابلیت کلیک برای بزرگنمایی
const ImageSlot = ({
  image,
  label,
  onUpload,
  onRemove,
  isMain = false,
  onImageClick,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${
        isMain ? 'h-[220px] w-[220px]' : 'h-[105px] w-[105px]'
      } border-slate-200 bg-slate-50 group`}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={label}
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => onImageClick(image)}
          />
          
          {/* دکمه‌های روی عکس */}
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              type="button"
              onClick={() => onImageClick(image)}
              aria-label="بزرگنمایی"
              className="rounded-full bg-white/95 p-1.5 text-slate-600 shadow-md transition hover:scale-110 hover:bg-blue-50"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={onRemove}
              aria-label={`حذف ${label}`}
              className="rounded-full bg-white/95 p-1.5 text-red-500 shadow-md transition hover:scale-110 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </>
      ) : (
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center px-2 text-center transition hover:bg-blue-50">
          <UploadCloud
            className={`mb-2 ${
              isMain ? 'h-8 w-8' : 'h-6 w-6'
            } text-blue-400`}
          />

          <span
            className={`font-bold text-slate-600 ${
              isMain ? 'text-sm' : 'text-[10px]'
            }`}
          >
            {label}
          </span>

          {isMain && (
            <span className="mt-1 text-[10px] text-slate-400">
              حداکثر ۵ مگابایت
            </span>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

const SectionTitle = ({ icon: Icon, children }) => {
  return (
    <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
      <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="text-lg font-extrabold text-slate-800">{children}</h2>
    </div>
  );
};

const AddProductPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // استیت جدید برای نمایش عکس بزرگ شده
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const readImageFile = (file, callback) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('لطفاً فقط فایل تصویری انتخاب کنید.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('حجم تصویر نباید بیشتر از ۵ مگابایت باشد.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleMainImageUpload = (event) => {
    readImageFile(event.target.files?.[0], setMainImage);
  };

  const handleGalleryUpload = (event, index) => {
    readImageFile(event.target.files?.[0], (image) => {
      setGalleryImages((previous) => {
        const updatedImages = [...previous];
        updatedImages[index] = image;
        return updatedImages;
      });
    });
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((previous) => {
      const updatedImages = [...previous];
      updatedImages[index] = null;
      return updatedImages;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert('لطفاً نام محصول را وارد کنید.');
      return;
    }

    if (!mainImage) {
      alert('لطفاً تصویر اصلی محصول را انتخاب کنید.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('اطلاعات محصول:', {
        ...formData,
        mainImage,
        galleryImages,
      });

      alert('محصول با موفقیت ثبت شد!');
      setIsSubmitting(false);
    }, 1200);
  };

  // تابع باز کردن لایت‌باکس
  const openLightbox = (imageSrc) => {
    if (imageSrc) {
      setLightboxImage(imageSrc);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <div className="rounded-3xl bg-gradient-to-l from-blue-700 to-blue-500 px-6 py-8 text-white shadow-xl shadow-blue-200">
            <p className="mb-2 text-sm font-medium text-blue-100">
              مدیریت فروشگاه
            </p>

            <h1 className="text-2xl font-black md:text-3xl">
              افزودن محصول جدید
            </h1>

            <p className="mt-3 text-sm text-blue-100">
              اطلاعات محصول، تصاویر و مشخصات آن را وارد کنید.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* تصاویر */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <SectionTitle icon={ImageIcon}>تصاویر محصول</SectionTitle>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-10">
              <div className="flex flex-col items-center gap-3">
                <ImageSlot
                  image={mainImage}
                  label="تصویر اصلی"
                  isMain
                  onUpload={handleMainImageUpload}
                  onRemove={() => setMainImage(null)}
                  onImageClick={openLightbox}
                />

                <span className="text-xs font-medium text-slate-400">
                  تصویر اصلی محصول
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((image, index) => (
                  <ImageSlot
                    key={index}
                    image={image}
                    label={`گالری ${index + 1}`}
                    onUpload={(event) => handleGalleryUpload(event, index)}
                    onRemove={() => removeGalleryImage(index)}
                    onImageClick={openLightbox}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* اطلاعات محصول */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <SectionTitle icon={CheckCircle}>اطلاعات محصول</SectionTitle>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="نام محصول"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="نام محصول را وارد کنید"
              />

              <FormInput
                label="قیمت تومان"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="850000"
              />

              <FormInput
                label="وزن کیلوگرم"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                placeholder="0.500"
              />

              <FormInput
                label="گارانتی ماه"
                name="warranty"
                type="number"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="12"
              />

              <FormInput
                label="برند / جنس"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="مثلاً چوب گردو"
              />

              <FormInput
                label="وضعیت موجودی"
                name="status"
                value={formData.status}
                onChange={handleChange}
                isSelect
                options={[
                  { value: 'active', label: 'موجود' },
                  { value: 'almost-finished', label: 'رو به اتمام' },
                  { value: 'inactive', label: 'ناموجود' },
                ]}
              />

              <FormInput
                label="دسته‌بندی اصلی"
                name="category"
                value={formData.category}
                onChange={handleChange}
                isSelect
                options={[
                  { value: 'wall-shelves', label: 'طبقات دیواری' },
                  { value: 'wooden-tray', label: 'سینی چوبی' },
                  { value: 'serving-board', label: 'تخته سرو' },
                  { value: 'kitchen', label: 'آشپزخانه' },
                ]}
              />

              <FormInput
                label="دسته‌بندی فرعی"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                isSelect
                options={[
                  { value: 'decorative', label: 'دکوراتیو' },
                  { value: 'functional', label: 'کاربردی' },
                  { value: 'luxury', label: 'لوکس' },
                ]}
              />

              <FormInput
                label="رنگ‌ها"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="قهوه‌ای، سفید"
              />
            </div>
          </section>

          {/* ابعاد */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <SectionTitle icon={Ruler}>ابعاد محصول</SectionTitle>

            <p className="mb-5 text-xs text-slate-400">
              اندازه‌ها را بر اساس سانتی‌متر وارد کنید.
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <FormInput
                label="عرض"
                name="width"
                value={formData.width}
                onChange={handleChange}
                placeholder="20"
              />

              <FormInput
                label="طول"
                name="length"
                value={formData.length}
                onChange={handleChange}
                placeholder="30"
              />

              <FormInput
                label="ارتفاع"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="10"
              />
            </div>
          </section>

          {/* دکمه‌ها */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-7 py-3 font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  در حال ثبت...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  ثبت محصول
                </>
              )}
            </button>
          </div>
        </form>

        {/* --- مودال بزرگنمایی تصویر (Lightbox) --- */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-6 top-6 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/40"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن با کلیک روی خود عکس
            >
              <img
                src={lightboxImage}
                alt="تصویر بزرگ شده"
                className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AddProductPage;