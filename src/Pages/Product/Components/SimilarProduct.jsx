import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { products } from "../../../data/products";
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
      .slice(0, 12);
  }, [currentProduct]);

  if (!currentProduct || similarProducts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-primary rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
            محصولات <span className="text-text1">مرتبط</span>
          </p>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {similarProducts.length} محصول
          </span>
        </div>

        <Swiper
          className="w-full"
          spaceBetween={12}
          slidesPerView={1.2}
          breakpoints={{
            320: { spaceBetween: 10, slidesPerView: 1.3 },
            380: { spaceBetween: 10, slidesPerView: 1.5 },
            460: { spaceBetween: 12, slidesPerView: 2 },
            640: { spaceBetween: 14, slidesPerView: 2.4 },
            768: { spaceBetween: 16, slidesPerView: 3 },
            900: { spaceBetween: 16, slidesPerView: 3.4 },
            1024: { spaceBetween: 18, slidesPerView: 4 },
            1280: { spaceBetween: 20, slidesPerView: 4.8 },
          }}
        >
          {similarProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="h-full py-1">
                <ProductCard {...product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SimilarProduct;