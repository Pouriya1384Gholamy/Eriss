import React from 'react';
import { 
  Filter, ShieldCheck, CreditCard, User, Rocket 
} from 'lucide-react'; // ← آیکون‌ها رو مستقیم import کنید

const CategoryCards = ({ categories, activeCategory, setActiveCategory, getCategoryCount }) => {
  // Map آیکون‌ها
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

  return (
    <section className="max-w-6xl mx-auto -mt-8 px-4 relative z-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            className={`group relative bg-white rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
              activeCategory === item.id 
                ? 'shadow-2xl -translate-y-2 ring-2 ring-[#9EAD8C] ring-offset-2' 
                : 'shadow-lg hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                <div className="text-white">{getIcon(item.icon)}</div>
              </div>
              <span className="text-sm font-bold text-gray-700 leading-5">{item.title}</span>
              <span className={`text-xs font-semibold mt-2 px-3 py-1 rounded-full ${
                activeCategory === item.id 
                  ? 'bg-[#9EAD8C] text-white' 
                  : 'bg-gray-100 text-gray-500'
              } transition-all duration-300`}>
                {getCategoryCount(item.id)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;