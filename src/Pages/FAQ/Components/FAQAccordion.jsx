import React from 'react';
import { ChevronDown, Search } from 'lucide-react';
import SectionHeader from './SectionHeader';

const FAQAccordion = ({ 
  faqs, 
  openId, 
  setOpenId, 
  activeCategory, 
  categories 
}) => {
  const getCategoryColor = (categoryId) => {
    const colors = {
      security: "border-emerald-200 bg-emerald-50/50",
      payment: "border-blue-200 bg-blue-50/50",
      main: "border-purple-200 bg-purple-50/50",
      account: "border-amber-200 bg-amber-50/50",
    };
    return colors[categoryId] || "border-gray-200 bg-gray-50/50";
  };

  const getCategoryTitle = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.title : '';
  };

  return (
    <section className="max-w-6xl mx-auto mt-16 px-4">
      <SectionHeader 
        badge="سوالات متداول"
        title="پرسش‌های پرتکرار"
        subtitle={activeCategory !== 'all' ? `نمایش سوالات دسته ${getCategoryTitle(activeCategory)}` : ''}
      />

      {faqs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-300" size={32} />
          </div>
          <p className="text-gray-500 font-medium">نتیجه‌ای برای جستجوی شما یافت نشد</p>
          <p className="text-gray-400 text-sm mt-1">سعی کنید با کلمات دیگری جستجو کنید</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                openId === faq.id 
                  ? 'shadow-2xl border-[#9EAD8C]/40 scale-[1.01]' 
                  : 'shadow-md hover:shadow-xl border-gray-100 hover:border-[#9EAD8C]/30 hover:scale-[1.01]'
              } transition-all duration-300 ease-in-out`}
            >
              <button 
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-start gap-3 p-4 md:p-5 text-right transition-all group"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 mt-0.5 ${
                    openId === faq.id 
                      ? 'bg-[#9EAD8C] text-white shadow-lg shadow-[#9EAD8C]/30' 
                      : 'bg-gray-100 text-gray-400 group-hover:bg-[#9EAD8C]/10'
                  }`}>
                    {faq.id}
                  </div>
                  <span className={`text-sm md:text-base font-medium transition-colors leading-relaxed ${
                    openId === faq.id ? 'text-[#8A9A7B]' : 'text-[#4A3728] group-hover:text-[#8A9A7B]'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  openId === faq.id 
                    ? 'bg-[#9EAD8C] text-white rotate-180 shadow-lg shadow-[#9EAD8C]/30' 
                    : 'bg-gray-100 text-[#9EAD8C] group-hover:bg-[#9EAD8C]/10 group-hover:scale-110'
                }`}>
                  <ChevronDown size={18} className="md:w-5 md:h-5" />
                </div>
              </button>
              
              <div className={`transition-all duration-300 overflow-hidden ${
                openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className={`px-4 pb-4 md:px-5 md:pb-5 pt-0 text-sm text-gray-600 leading-relaxed border-t ${getCategoryColor(faq.category)}`}>
                  <div className="flex items-start gap-4 pt-4">
                    <div className="w-1 h-auto min-h-12 bg-gradient-to-b from-[#9EAD8C] to-[#8A9A7B] rounded-full flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FAQAccordion;