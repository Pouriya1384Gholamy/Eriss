import React from "react";
import { Search, Star, CheckCircle, Clock, Award } from "lucide-react";

const HeroSection = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#8A9A7B] via-[#9EAD8C] to-[#7A8A6B] pt-16 pb-24 px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute hidden sm:block top-20 right-20 w-48 h-48 bg-white rounded-full" />
        <div className="absolute hidden sm:block bottom-20 left-20 w-56 h-56 bg-white rounded-full" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white text-sm mb-6">
          <Star size={16} className="fill-yellow-300 text-yellow-300" />
          راهنما و پشتیبانی
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          چطور می‌توانیم کمکتان کنیم؟
        </h1>
        <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          پاسخ سوالات رایج درباره سفارش، ارسال، پرداخت و محصولات چوبی اریس‌وود را اینجا پیدا کنید.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Search className="text-gray-400" size={22} />
          </div>
          <input 
            type="text" 
            placeholder="جستجو در سوالات متداول..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 pr-14 pl-6 rounded-2xl text-gray-800 outline-none shadow-2xl border-0 focus:ring-2 focus:ring-[#9EAD8C] transition-all bg-white/95 backdrop-blur-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 left-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-300" />
            <span>۵۰۰+ سوال پاسخ داده شده</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-yellow-300" />
            <span>پاسخگویی زیر ۲۴ ساعت</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={18} className="text-amber-300" />
            <span>رضایت ۹۸٪ کاربران</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;