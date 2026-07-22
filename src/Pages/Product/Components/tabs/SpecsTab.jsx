import React from 'react';
import { TbRulerMeasure, TbWeight, TbPalette, TbShieldCheck, TbBox } from 'react-icons/tb';

const SpecsTab = ({ product }) => {
  const specs = [
    {
      icon: TbRulerMeasure,
      label: 'ابعاد',
      value: `${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height} سانتی‌متر`,
    },
    {
      icon: TbWeight,
      label: 'وزن',
      value: `${product.weight} کیلوگرم`,
    },
    {
      icon: TbPalette,
      label: 'رنگ‌های موجود',
      value: product.colors.length > 0 ? `${product.colors.length} رنگ` : 'اطلاعاتی موجود نیست',
    },
    {
      icon: TbShieldCheck,
      label: 'گارانتی',
      value: '6 ماهه',
    },
    {
      icon: TbBox,
      label: 'جنس',
      value: `${product.material}`,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--brand-charcoal)] mb-6">مشخصات فنی</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {specs.map((spec, index) => {
          const Icon = spec.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-[var(--brand-ivory)] hover:bg-[var(--brand-ivory)]/70 transition-colors"
            >
              <div className="flex-shrink-0">
                <Icon className="w-6 h-6 text-[var(--brand-gold)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--brand-charcoal)] mb-1">{spec.label}</h3>
                <p className="text-[var(--brand-charcoal)]/70">{spec.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-[var(--brand-ivory)] rounded-lg">
        <h3 className="font-bold text-[var(--brand-charcoal)] mb-2">اطلاعات بیشتر:</h3>
        <ul className="space-y-1 text-sm text-[var(--brand-charcoal)]/75">
          <li><strong>مدل:</strong> {product.model}</li>
          <li><strong>برند:</strong> {product.brand}</li>
          <li><strong>زمان آماده‌سازی:</strong> {product.prepTime}</li>
          <li><strong>موجودی انبار:</strong> {product.countInStock} عدد</li>
        </ul>
      </div>
    </div>
  );
};

export default SpecsTab;