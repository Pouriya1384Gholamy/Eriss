import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "../../../Components/ui/ProductCard";
import { products } from "../../../data/products";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("best");

  const tabs = [
    { id: "best", label: "پرفروش ترین محصولات" },
    { id: "popular", label: "محبوب ترین محصولات" },
  ];

  const filteredProducts = products.filter(
    (product) => product.type === activeTab
  );

  return (
    // overflow-hidden اینجا حیاتیه تا اون اسلاید تیکه شده باعث اسکرول کل صفحه نشه
    <div className="max-w-[1280px] w-[95%] mx-auto mt-10 overflow-hidden">
      
      {/* هدر با چیدمان ثابت و محکم */}
      <section className="bg-[var(--color-primary)] rounded-t-[25px] pt-8 pb-24 flex flex-col items-center">
        
        <h2 className="text-sm md:text-lg font-bold text-center text-[var(--color-p-text)] mb-8">
          <span className="text-[var(--color-accent)]">محصولات خلاقانه</span> اریس وود
        </h2>

        {/* تب‌ها با فاصله ایمن از اسلایدر */}
        <div className="flex justify-center items-center gap-6 sm:gap-10 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-[12px] sm:text-[15px] font-bold transition-all duration-300 border-b-2
                ${
                  activeTab === tab.id
                    ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "border-transparent text-[var(--color-p-text)] opacity-60 hover:opacity-100"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* بخش اسلایدر با کنترل دقیق سرریز */}
      <div className="-mt-22 relative px-2">
        <Swiper
          className="w-full !overflow-hidden" // اینجا overflow رو بستم تا اسکرول افقی صفحه حذف بشه
          spaceBetween={15}
          slidesPerView={1.2} // پیش‌فرض موبایل
          breakpoints={{
            181: { spaceBetween: 10, slidesPerView: 1.1 },
            268: { spaceBetween: 10, slidesPerView: 1.4 },
            330: { spaceBetween: 10, slidesPerView: 1.7 },
            396: { spaceBetween: 10, slidesPerView: 2 },
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
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id} className="py-2">
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProducts;
