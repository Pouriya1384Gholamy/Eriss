import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { colorNames } from '../../../../data/products';

const ColorGalleryTab = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  if (!colors || colors.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        اطلاعات رنگ‌بندی برای این محصول موجود نیست
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">گالری رنگ‌ها</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {colors.map((color, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            onClick={() => setSelectedColor(color)}
          >
            <div
              className="w-full h-32 transition-transform group-hover:scale-110"
              style={{ backgroundColor: color }}
            />
            <div className="bg-white px-3 py-2 text-center">
              <p className="text-sm font-semibold text-gray-800">
                {colorNames[color] ?? color}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{color}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedColor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedColor(null)}
        >
          <div className="relative max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedColor(null)}
              className="absolute -top-12 left-0 text-white hover:text-gray-300 transition-colors"
            >
              <IoClose className="w-8 h-8" />
            </button>
            <div
              className="w-full h-64 rounded-lg shadow-2xl"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="bg-white rounded-b-lg px-4 py-3 text-center">
              <p className="text-lg font-bold text-gray-800">
                {colorNames[selectedColor] ?? selectedColor}
              </p>
              <p className="text-sm text-gray-400">{selectedColor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorGalleryTab;
