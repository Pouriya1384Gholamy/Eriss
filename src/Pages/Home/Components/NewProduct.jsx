import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "../../../Components/ui/ProductCard";
import { products } from "../../../data/products";

const NewProduct = () => {
  const newProducts = products.filter((product) => product.type === "new");

  return (
    <div className="max-w-[1280px] w-[95%] m-auto mt-10">
      
      {/* هدر بخش - ذغالی برند */}
      <section className="bg-[var(--color-primary)] h-[130px] sm:h-[180px] rounded-tl-[25px] rounded-tr-[25px] py-4 flex justify-center items-start border-b border-[var(--color-border)]">
        
        {/* باکس کارت سفید/شیری مرکزی */}
        <div className="flex justify-center items-center flex-col gap-3 w-[85%] sm:w-[55%] md:w-[40%] h-[85px] sm:h-[100px] bg-[var(--color-first)] border border-[var(--color-border)] rounded-xl py-3 px-4 shadow-md">
          <p className="font-bold text-xs sm:text-sm md:text-base text-[var(--color-text)] text-center">
            جدید‌ترین محصولات اریس وود
          </p>
          <button className="bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white px-5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300">
            هر روز سر بزن
          </button>
        </div>

      </section>

      {/* اسلایدر با افکت همپوشانی بالا */}
      <div className="-mt-5 sm:-mt-12">
        <Swiper
          className="w-[98%]"
          spaceBetween={20}
          slidesPerView={5}
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
          {newProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewProduct;
