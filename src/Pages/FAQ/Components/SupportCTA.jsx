import React from 'react';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const SupportCTA = () => {
  return (
    <section className="max-w-5xl mx-auto mt-20 px-4">
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-[#F8F5F0] rounded-3xl p-12 border border-[#9EAD8C]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#9EAD8C]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#8A9A7B]/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9EAD8C]/5 rounded-full blur-3xl" />
        
        <div className="relative text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#9EAD8C]/20 to-[#8A9A7B]/20 px-8 py-2.5 rounded-full mb-6 border border-[#9EAD8C]/20">
            <MessageCircle size={20} className="text-[#9EAD8C]" />
            <span className="text-[#8A9A7B] font-semibold text-sm tracking-wide">پشتیبانی ۲۴ ساعته</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#4A3728] mb-4">
            پاسخ خود را پیدا نکردید؟
          </h3>
          <p className="text-gray-500 text-base md:text-lg mb-10 max-w-md mx-auto">
            تیم پشتیبانی اریس‌وود آماده کمک به شماست
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group bg-gradient-to-r from-[#9EAD8C] to-[#8A9A7B] hover:from-[#8A9A7B] hover:to-[#7A8A6B] text-white px-12 py-4 rounded-full font-bold transition-all duration-300 shadow-xl shadow-[#9EAD8C]/30 hover:shadow-2xl hover:scale-105 flex items-center gap-3">
              <Phone size={20} className="group-hover:animate-pulse" />
              تماس با پشتیبانی
            </button>
            <button className="group bg-white hover:bg-gray-50 text-[#4A3728] px-10 py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-[#9EAD8C]/40 flex items-center gap-3">
              <Mail size={20} className="text-[#9EAD8C] group-hover:rotate-12 transition-transform" />
              ایمیل بزنید
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-gray-200/50">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-10 h-10 bg-[#9EAD8C]/10 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-[#9EAD8C]" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">شماره تماس</p>
                <p className="font-medium text-gray-700">۰۲۱-۱۲۳۴۵۶۷۸</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-10 h-10 bg-[#9EAD8C]/10 rounded-full flex items-center justify-center">
                <Mail size={18} className="text-[#9EAD8C]" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">ایمیل</p>
                <p className="font-medium text-gray-700">support@erisswood.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-10 h-10 bg-[#9EAD8C]/10 rounded-full flex items-center justify-center">
                <Clock size={18} className="text-[#9EAD8C]" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">ساعت کاری</p>
                <p className="font-medium text-gray-700">شنبه تا پنجشنبه ۹-۲۰</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportCTA;