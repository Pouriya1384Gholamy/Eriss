import React from 'react';
import DescriptionTab from './tabs/DescriptionTab';
import SpecsTab from './tabs/SpecsTab';
import HowToBuyTab from './tabs/HowToBuyTab';
import ColorGalleryTab from './tabs/ColorGalleryTab';

const ProductTabs = ({ product, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'description', label: 'توضیحات' },
    { id: 'specs', label: 'مشخصات' },
    { id: 'howToBuy', label: 'نحوه خرید' },
    { id: 'colors', label: 'گالری رنگی' },
    { id: 'reviews', label: 'نظرات' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex justify-start gap-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 text-[10px] sm:text-15px font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {activeTab === 'description' && <DescriptionTab description={product.description} />}
        {activeTab === 'specs' && <SpecsTab product={product} />}
        {activeTab === 'howToBuy' && <HowToBuyTab product={product} />}
        {activeTab === 'colors' && <ColorGalleryTab colors={product.colors} />}
        {activeTab === 'reviews' && (
          <div className="text-center py-12 text-gray-500">
            بخش نظرات به زودی اضافه می‌شود
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
