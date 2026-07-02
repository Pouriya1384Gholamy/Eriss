import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, typeLabels } from '../../../data/products';
import ProductHero from './ProductHero';
import ProductTabs from './ProductTabs';
import SimilarProduct from './SimilarProduct';

function Details() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--brand-ivory)]" dir="rtl">
        <p className="text-xl font-bold text-[var(--brand-charcoal)] mb-4">محصول مورد نظر یافت نشد.</p>
        <Link to="/" className="px-6 py-2 bg-[var(--brand-gold)] text-white rounded-lg hover:bg-[var(--brand-charcoal)] transition-all">
          بازگشت به خانه
        </Link>
      </div>
    );
  }

  const categoryLabel = typeLabels[product.type] ?? 'محصولات';

  const breadcrumbItems = [
    { label: 'خانه', href: '/' },
    { label: 'محصولات', href: '/products' },
    { label: categoryLabel, href: `/products?type=${product.type}` },
    { label: product.title },
  ];

  return (
    <div className="min-h-screen bg-[var(--brand-ivory)] pb-12" dir="rtl">
      {/* Breadcrumb مدرن */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav aria-label="Breadcrumb" className="bg-white/50 backdrop-blur-sm rounded-2xl px-5 py-3 flex flex-wrap items-center gap-2 text-sm shadow-sm border border-[var(--brand-taupe)]/20">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <React.Fragment key={index}>
                {isLast ? (
                  <span className="text-[var(--brand-gold)] font-bold truncate max-w-[150px]">{item.label}</span>
                ) : (
                  <>
                    <Link to={item.href} className="text-[var(--brand-charcoal)] opacity-70 hover:opacity-100 hover:text-[var(--brand-gold)] transition-colors">
                      {item.label}
                    </Link>
                    <span className="text-[var(--brand-tau)pe] opacity-40">/</span>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* بخش اصلی محتوا */}
      <ProductHero product={product} />
      
      <div className="mt-12">
        <ProductTabs product={product} />
      </div>

      <div className="mt-16">
        <SimilarProduct currentProduct={product} />
      </div>
    </div>
  );
}

export default Details;
