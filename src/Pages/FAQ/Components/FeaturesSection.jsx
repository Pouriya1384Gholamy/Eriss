import React from 'react';
import * as Icons from 'lucide-react';
import SectionHeader from './SectionHeader';

const FeaturesSection = ({ features }) => {
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={32} /> : null;
  };

  return (
    <section className="max-w-6xl mx-auto my-20 px-4">
      <SectionHeader 
        title="چرا اریس‌وود؟"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feat, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-[#9EAD8C]/30 relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#9EAD8C]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                <span className="text-white">{getIcon(feat.icon)}</span>
              </div>
              <h4 className="font-bold text-[#4A3728] mb-2 text-lg">{feat.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;