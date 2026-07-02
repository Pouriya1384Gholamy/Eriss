import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { products, typeLabels } from "../../../data/products";
import ProductCard from "../../../Components/ui/ProductCard";

function SimilarProduct({ currentProduct }) {

  const similarProducts = useMemo(() => {
    if (!currentProduct) return [];

    return products
      .filter(
        (item) =>
          item.type === currentProduct.type &&
          item.id !== currentProduct.id
      )
      .slice(0, 12); // حداکثر 12 تا نمایش بده
  }, [currentProduct]);

  if (!currentProduct || similarProducts.length === 0) return null;

  return (
    <section className="px-4 mb-30">
      <p className="text-2xl font-bold mb-8">
        محصولات{" "}
        <span className="text-primary">
          مرتبط
        </span>
      </p>

      <div className="">
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
          {similarProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SimilarProduct;
