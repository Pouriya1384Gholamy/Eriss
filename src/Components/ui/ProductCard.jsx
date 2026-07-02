import React from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // استفاده از هوک useNavigate

const ProductCard = ({ id, title, price, rating, image }) => {
  const navigate = useNavigate(); // تعریف تابع نویگیت

  return (
    <div className="m-2 w-[185px] sm:w-[200px] md:w-[210px] bg-white shadow-md border border-gray-100 rounded-lg overflow-hidden">
      {/* بخش تصویر */}
      <div className="w-full h-[125px] m-1 aspect-square bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* محتوا */}
      <div className="text-center">
        <h3 className="text-base font-bold text-gray-800">{title}</h3>

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
        <p className="mt-2 text-sm text-gray-700">
          {price?.toLocaleString("fa-IR")} تومان
        </p>

        {/* دکمه انتقال به صفحه جزئیات */}
        <button 
          onClick={() => navigate(`/product/${id}`)} // ارسال به صفحه محصول با ID مشخص
          className="m-1.5 w-[85%] rounded-[5px] bg-secondary text-white py-2 text-sm hover:bg-[#4a5826] transition"
        >
          جزئیات محصول
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
