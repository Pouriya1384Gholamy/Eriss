import React from 'react';
import { Zap } from 'lucide-react';

const SectionHeader = ({ 
  title, 
  subtitle, 
  badge, 
  centered = true,
  className = '' 
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 bg-[#9EAD8C]/10 px-4 py-1.5 rounded-full ${centered ? '' : 'mb-4'} ${centered ? 'mx-auto' : ''}`}>
          <Zap size={16} className="text-[#9EAD8C]" />
          <span className="text-[#8A9A7B] text-sm font-medium">{badge}</span>
        </div>
      )}
      <h2 className="text-4xl font-bold text-[#4A3728]">{title}</h2>
      <div className={`w-24 h-1 bg-gradient-to-r from-[#9EAD8C] to-[#8A9A7B] mt-4 rounded-full ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="text-gray-500 mt-4 text-sm">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;