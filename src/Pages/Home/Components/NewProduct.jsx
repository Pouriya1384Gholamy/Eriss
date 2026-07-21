import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "../../../Components/ui/ProductCard";
import { products } from "../../../data/products";

const NewProduct = () => {
  const newProducts = products.filter((product) => product.type === "new");

  return (
    <div className="max-w-[1280px] w-[95%] m-auto ">
      {/* green section */}
      <section className="bg-primary h-[120px] sm:h-[180px] rounded-tl-[25px] rounded-tr-[25px] py-2 sm:py-6 flex justify-center items-start">
        <div className="flex justify-center items-center flex-col gap-3 sm:gap-4 w-[80%] sm:w-[55%] md:w-[40%] h-[75px] sm:h-[90px] bg-white rounded-[8px] py-4 sm:py-6 px-4">
          <p className="font-bold text-sm sm:text-base md:text-lg text-center sm:mt-2">
            جدید‌ترین محصولات اریس وود
          </p>
          <button className="bg-secondary rounded-[5px] text-white px-6 py-2 sm:mb-3 text-sm sm:text-base hover:bg-amber-800 transition-colors">
            هر روز سر بزن
          </button>
        </div>
      </section>

      {/* slider wrapper */}
      <div className="-mt-8 sm:-mt-15">
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
