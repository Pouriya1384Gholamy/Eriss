import React from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, title, price, rating, image }) => {
  const navigate = useNavigate();

  return (
    <div className="m-2 w-[185px] sm:w-[200px] md:w-[210px] bg-white shadow-md border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      
      {/* بخش تصویر - ارتفاع ثابت 125px */}
      <div className="w-full h-[125px] bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* محتوا - بدون تغییر در ارتفاع */}
      <div className="text-center py-2">
        <h3 className="text-base font-bold text-gray-800 px-1 truncate">{title}</h3>

        {/* امتیازدهی */}
        <div className="flex justify-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              size={14}
              className={index < rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>

        {/* قیمت */}
        <p className="mt-1.5 text-sm text-gray-700">
          {price?.toLocaleString("fa-IR")} تومان
        </p>

        {/* دکمه */}
        <button 
          onClick={() => navigate(`/product/${id}`)}
          className="mt-2 mb-1.5 w-[85%] rounded-[5px] bg-[#8B7355] text-white py-2 text-sm hover:bg-[#6d5a42] transition"
        >
          جزئیات محصول
        </button>
      </div>
    </div>
  );
};

export default ProductCard;