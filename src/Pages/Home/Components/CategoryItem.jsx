import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

// استایل‌های Swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import img from '../../../assets/img/wood.jpg'; // مطمئن شو مسیر درست باشه

const categories = [
  { label: "حراجی اریس", img: img },
  { label: "سفارش شخصی", img: img },
  { label: "CNC", img: img },
  { label: "خرید عمده", img: img },
  { label: "لیزر", img: img },
  { label: "پرفروش‌ترین‌ها", img: img },
];

function CategoryItem() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // تابع چک کردن سایز صفحه
    const checkSize = () => {
      // breakpoint "sm" در Tailwind معمولا 640px است
      const mediaQuery = window.matchMedia('(max-width: 639px)'); // max-width یعنی تا قبل از sm
      setIsMobile(mediaQuery.matches);
    };

    // چک کردن اولیه
    checkSize();

    // گوش دادن به تغییر سایز پنجره
    window.addEventListener('resize', checkSize);

    // پاک کردن listener موقع unmount شدن کامپوننت
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <section className="mt-8 text-center" dir="rtl">
      <h2 className="text-2xl font-bold my-4 text-black">خدمات</h2>
      
      {isMobile ? (
        // ✅ وقتی در حالت موبایل هستیم: Swiper فعال است
        <div className="swiper-container relative">
          <Swiper
            slidesPerView={1.5}
            spaceBetween={15}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            className="mySwiper !pb-8"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.label} className="max-w-[110px]"> {/* max-width فقط برای موبایل */}
                <div className="relative w-full h-[90px] rounded-2xl overflow-hidden cursor-pointer group shadow-md">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300" />
                  <span className="absolute bottom-2 right-0 left-0 text-white text-sm font-bold drop-shadow">
                    {cat.label}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        // ✅ وقتی در حالت موبایل نیستیم (sm به بالا): آیتم‌ها عادی نمایش داده می‌شوند
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="relative w-[110px] h-[90px] rounded-2xl overflow-hidden cursor-pointer group shadow-md"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300" />
              <span className="absolute bottom-2 right-0 left-0 text-white text-sm font-bold drop-shadow">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryItem;
