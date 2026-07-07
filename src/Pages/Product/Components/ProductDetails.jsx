import React from 'react';
import DescriptionTab from './tabs/DescriptionTab';
import SpecsTab from './tabs/SpecsTab';
import HowToBuyTab from './tabs/HowToBuyTab';
import ColorGalleryTab from './tabs/ColorGalleryTab';

// ====== دریافت activeTab و setActiveTab از props ======
const ProductDetails = ({ product, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'description', label: 'توضیحات' },
    { id: 'specs', label: 'مشخصات' },
    { id: 'howToBuy', label: 'نحوه خرید' },
    { id: 'colors', label: 'گالری رنگی' },
    { id: 'reviews', label: 'نظرات' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 mb-4">
        <nav
          className="flex justify-start gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} // <-- اینجا setActiveTab استفاده میشه
              className={`pb-3 px-1 whitespace-nowrap text-xs sm:text-sm font-medium transition-colors relative ${
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
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="min-h-[120px]">
          {activeTab === 'description' && (
            <DescriptionTab description={product.description} />
          )}

          {activeTab === 'specs' && <SpecsTab product={product} />}

          {activeTab === 'howToBuy' && <HowToBuyTab product={product} />}

          {activeTab === 'colors' && (
            <ColorGalleryTab colors={product.colors} />
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-gray-500">
              بخش نظرات به زودی اضافه می‌شود
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;