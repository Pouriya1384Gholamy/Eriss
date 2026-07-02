import React, { useState } from 'react';
import DescriptionTab from './tabs/DescriptionTab';
import SpecsTab from './tabs/SpecsTab';
import HowToBuyTab from './tabs/HowToBuyTab';
import ColorGalleryTab from './tabs/ColorGalleryTab';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'توضیحات محصول' },
    { id: 'specs', label: 'مشخصات فنی' },
    { id: 'howToBuy', label: 'راهنمای خرید' },
    { id: 'colors', label: 'گالری تصاویر' },
    { id: 'reviews', label: 'نظرات' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Headers */}
      <div className="border-b border-[var(--brand-taupe)]/20 mb-8">
        <nav className="flex justify-start gap-6 sm:gap-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 text-[10px] sm:text-[15px] font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[var(--brand-gold)] border-b-2 border-[var(--brand-gold)]'
                  : 'text-[var(--brand-charcoal)]/60 hover:text-[var(--brand-charcoal)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-[30px] shadow-sm p-6 sm:p-8 md:p-10 border border-[var(--brand-taupe)]/10 min-h-[300px]">
        {activeTab === 'description' && (
          <DescriptionTab description={product.description} />
        )}

        {activeTab === 'specs' && (
          <SpecsTab product={product} />
        )}

        {activeTab === 'howToBuy' && (
          <HowToBuyTab product={product} />
        )}

        {activeTab === 'colors' && (
          <ColorGalleryTab colors={product.colors} />
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-12 text-[var(--brand-taupe)]">
            بخش نظرات به زودی اضافه می‌شود
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
