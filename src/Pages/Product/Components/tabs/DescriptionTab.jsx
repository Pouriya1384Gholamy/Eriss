import React from 'react';

const DescriptionTab = ({ description }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[var(--brand-charcoal)]">توضیحات محصول</h2>
      
      <div className="prose prose-sm max-w-none text-[var(--brand-charcoal)]/75 leading-relaxed text-justify">
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