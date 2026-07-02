import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "../../../Components/ui/ProductCard";
import { products } from "../../../data/products";

const tabs = [
  { label: "شلف", value: "best" },
  { label: "کتابخانه", value: "popular" },
  { label: "میز آرایش", value: "makeup" },
  { label: "میز سرو", value: "serving" },
];

const CreativleyProduct = () => {
  const [activeTab, setActiveTab] = useState("best");

  const filteredProducts = products.filter((p) => p.type === activeTab);

  return (
    <div className="max-w-[1280px] w-[95%] m-auto mt-10">

      <section className="bg-primary h-[120px] sm:h-[180px] rounded-tl-[25px] rounded-tr-[25px] py-2">
        <h2 className="text-sm md:text-lg font-bold text-center mb-4">
          <span className="text-third">محصولات خلاقانه</span> اریس وود
        </h2>

        <div className="flex justify-center items-center text-[12px] sm:text-[15px] font-light gap-6">
          {tabs.map((tab) => (
            <p
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`cursor-pointer pb-1 transition ${
                activeTab === tab.value
                  ? "border-b-2 border-black text-black font-bold"
                  : "text-white/60"
              }`}
            >
              {tab.label}
            </p>
          ))}
        </div>
      </section>

      <div className="-mt-10 sm:-mt-20">
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
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default CreativleyProduct;
