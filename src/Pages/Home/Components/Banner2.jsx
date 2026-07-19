import React from "react";
import img from "../../../assets/img/image.png";

function Banner2() {
  return (
    <section className="w-full bg-transparent py-4 md:py-6 lg:py-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative w-full max-w-[1072px] mx-auto group">
          {/* نسبت تصویر با ارتفاع کمتر در دسکتاپ */}
          <div className="relative w-full pt-[39.88%] sm:pt-[40.13%] lg:pt-[32%]">
            <img
              src={img}
              alt="بنر تبلیغاتی"
              className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-md lg:shadow-lg transition-all duration-500 ease-in-out group-hover:shadow-2xl group-hover:scale-[1.01]"
              loading="lazy"
            />
            
            {/* حاشیه‌ی نرم دور بنر در دسکتاپ */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-0 lg:ring-1 ring-primary transition-all duration-500 group-hover:border-primary" />
            
            {/* نقطه‌های تزیینی در گوشه‌ها (فقط دسکتاپ) */}
            <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl-lg opacity-0 lg:opacity-100 transition-all duration-500 group-hover:border-primary" />
            <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr-lg opacity-0 lg:opacity-100 transition-all duration-500 group-hover:border-primary" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl-lg opacity-0 lg:opacity-100 transition-all duration-500 group-hover:border-primary" />
            <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br-lg opacity-0 lg:opacity-100 transition-all duration-500 group-hover:border-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner2;