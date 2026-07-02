import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import img from "../../../assets/img/wood.jpg";

const categories = [
  { label: "حراجی اریس", img },
  { label: "سفارش شخصی", img },
  { label: "CNC", img },
  { label: "خرید عمده", img },
  { label: "لیزر", img },
  { label: "پرفروش‌ترین‌ها", img },
];

function CategoryItem() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const check = () => setIsMobile(mq.matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="mt-8 text-center" dir="rtl">
      <h2 className="text-2xl font-bold my-4" style={{ color: "var(--color-text)" }}>
        خدمات
      </h2>

      {/* موبایل */}
      {isMobile ? (
        <Swiper
          slidesPerView={1.5}
          spaceBetween={15}
          freeMode
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper !pb-8"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.label} className="max-w-[110px]">
              <div
                className="relative w-full h-[90px] rounded-2xl overflow-hidden group shadow-md"
                style={{ backgroundColor: "var(--color-sixeth)" }}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                <div className="absolute inset-0 transition"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                />

                <span className="absolute bottom-2 inset-x-0 text-white text-sm font-bold drop-shadow">
                  {cat.label}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // دسکتاپ
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="relative w-[110px] h-[90px] rounded-2xl overflow-hidden group shadow-md cursor-pointer"
              style={{ backgroundColor: "var(--color-sixeth)" }}
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 transition"
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              />
              <span className="absolute bottom-2 inset-x-0 text-white text-sm font-bold drop-shadow">
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
