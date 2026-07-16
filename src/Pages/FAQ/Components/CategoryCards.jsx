import React, { useState } from 'react';
import { 
  Filter, ShieldCheck, CreditCard, User, Rocket 
} from 'lucide-react';

const CategoryCards = ({ categories, activeCategory, setActiveCategory, getCategoryCount }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const iconMap = {
    Filter: Filter,
    ShieldCheck: ShieldCheck,
    CreditCard: CreditCard,
    User: User,
    Rocket: Rocket
  };

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={22} /> : null;
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <section className="max-w-7xl mx-auto -mt-8 px-4 relative z-20">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {categories.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div 
              onClick={() => handleCategoryClick(item.id)}
              className={`group relative bg-white rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer w-full ${
                activeCategory === item.id 
                  ? 'shadow-2xl -translate-y-2 ring-2 ring-[#9EAD8C] ring-offset-2' 
                  : 'shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col items-center text-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <div className="text-white">{getIcon(item.icon)}</div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-700 leading-5">{item.title}</span>
                <span className={`text-xs font-semibold mt-1 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${
                  activeCategory === item.id 
                    ? 'bg-[#9EAD8C] text-white' 
                    : 'bg-gray-100 text-gray-500'
                } transition-all duration-300`}>
                  {getCategoryCount(item.id)}
                </span>
              </div>
            </div>

            {/* لوزی با خط اتصال */}
            {selectedCategory === item.id && (
              <div className="relative -mt-1 z-10 flex flex-col items-center">
                {/* خط اتصال */}
                <div className="w-0.5 h-3 bg-gradient-to-b from-[#9EAD8C] to-[#8A9A7B]" />
                {/* لوزی */}
                <div className="w-4 h-4 bg-gradient-to-br from-[#9EAD8C] to-[#8A9A7B] rotate-45 transform mx-auto shadow-md rounded-sm animate-bounce-once" />
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes bounceOnce {
          0% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.3) rotate(45deg);
          }
          100% {
            transform: scale(1) rotate(45deg);
            opacity: 1;
          }
        }
        .animate-bounce-once {
          animation: bounceOnce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </section>
  );
};

export default CategoryCards;