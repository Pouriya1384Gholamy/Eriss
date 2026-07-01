import React from 'react';

const DescriptionTab = ({ description }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">توضیحات محصول</h2>
      
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-justify">
        {description.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DescriptionTab;
