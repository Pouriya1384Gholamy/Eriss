import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { products } from "../../../data/products";
import ProductCard from "../../../Components/ui/ProductCard";

function SimilarProduct({ currentProduct }) {
  const similarProducts = useMemo(() => {
    if (!currentProduct) return [];
    return products
      .filter((item) => item.type === currentProduct.type && item.id !== currentProduct.id)
      .slice(0, 10);
  }, [currentProduct]);

  if (similarProducts.length === 0) return null;

  return (
    // حذف relative از سکشن اصلی و اضافه کردن z-0 برای ایجاد یک stacking context جدید
    <section className="max-w-7xl h-[200px] mx-auto px-4 mb-46 relative z-0">
      
      {/* لایه پس‌زمینه اصلی - به جای -z-10 از z-[-1] استفاده کن و مطمئن شو inset0 هست */}
      <div 
        className="absolute inset-0  bg-[var(--brand-charcoal)] rounded-[40px] border border-[var(--brand-taupe)]/10 shadow-2xl" 
        style={{ zIndex: -1 }} // این باعث میشه حتما پشت محتوا ولی روی پس‌زمینه صفحه بمونه
      />
      
      {/* دایره‌های نوری برای جذابیت بیشتر روی مشکی */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand-gold)]/10 blur-[100px] rounded-full" style={{ zIndex: -1 }} />

      <div className="py-12 px-6 sm:px-10 overflow-hidden">
        {/* هدر بخش - تغییر رنگ متن به سفید/طلایی برای خوانایی روی مشکی */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-10 w-1.5 bg-[var(--brand-gold)] rounded-full shadow-[0_0_20px_rgba(196,160,103,0.6)]" />
          <h2 className="text-2xl font-black text-white tracking-tight">
            محصولات <span className="text-[var(--brand-gold)]">مرتبط</span>
          </h2>
        </div>

        {/* اسلایدر */}
        <div className="-my-5">
          <Swiper
            className="!overflow-visible"
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
            181: { spaceBetween: 10, slidesPerView: 1.1 },
            268: { spaceBetween: 10, slidesPerView: 1.4 },
            330: { spaceBetween: 10, slidesPerView: 1.7 },
            396: { spaceBetween: 10, slidesPerView: 1.7 },
            462: { spaceBetween: 10, slidesPerView: 2.3 },
            484: { spaceBetween: 10, slidesPerView: 2.5 },
            586: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3.3 },
            948: { slidesPerView: 4.2 },
            1024: { slidesPerView: 4.4 },
            1226: { slidesPerView: 5.3 },
            1280: { slidesPerView: 5.5 },
          }}
          >
            {similarProducts.map((product) => (
              <SwiperSlide key={product.id} className="pb-10">
                <div className="transition-transform duration-300 hover:-translate-y-2">
                  <ProductCard {...product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default SimilarProduct;
