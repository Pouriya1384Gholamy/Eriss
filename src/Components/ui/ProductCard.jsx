import React from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, title, price, rating, image }) => {
  const navigate = useNavigate();

  return (
    <div className="m-2 w-[185px] sm:w-[200px] md:w-[210px] rounded-lg overflow-hidden shadow-md bg-[var(--color-first)] border border-[var(--color-sixeth)]">
      {/* تصویر */}
      <div className="w-[calc(100%-8px)] h-[125px] m-1 aspect-square rounded-md overflow-hidden bg-[var(--brand-ivory)]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* محتوا */}
      <div className="text-center px-2 pb-3">
        <h3 className="text-base font-bold text-[var(--color-text)]">
          {title}
        </h3>

        {/* امتیاز */}
        <div className="flex justify-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              size={14}
              className={index < rating ? "text-[var(--brand-gold)]" : "text-[var(--color-sixeth)]"}
            />
          ))}
        </div>

        {/* قیمت */}
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {price?.toLocaleString("fa-IR")} تومان
        </p>

        {/* دکمه جزئیات */}
        <button
          onClick={() => navigate(`/product/${id}`)}
          className="m-1.5 w-[85%] rounded-[6px] py-2 text-sm font-medium transition bg-[var(--brand-gold)] hover:bg-[var(--brand-charcoal)] text-white"
        >
          جزئیات محصول
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
