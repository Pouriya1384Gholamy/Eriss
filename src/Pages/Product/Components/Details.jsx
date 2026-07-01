import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, typeLabels } from '../../../data/products';

function Details() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-3">
          <p className="text-lg text-gray-500">محصول مورد نظر یافت نشد.</p>
          <Link to="/" className="text-[#8fa876] hover:underline text-sm">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = typeLabels[product.type] ?? 'محصولات';

  const breadcrumbItems = [
    { label: 'خانه',        href: '/'                              },
    { label: 'محصولات',     href: '/products'                      },
    { label: categoryLabel, href: `/products?type=${product.type}` },
    { label: product.title                                         },
  ];

  return (
    <div className="w-[95%] mx-auto my-4" dir="rtl">
      <nav
        aria-label="مسیر ناوبری"
        className="
          flex flex-wrap items-center gap-x-1.5 gap-y-1
          bg-secondary
          rounded-xl px-4 py-2.5
          text-sm
        "
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <React.Fragment key={index}>

              {isLast ? (
                <span
                  aria-current="page"
                  className="text-third truncate max-w-[120px] sm:max-w-[200px] md:max-w-xs"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-white hover:text-[#5d8c5a] transition-colors duration-200 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <span className="text-gray-300 select-none text-xs">›</span>
              )}

            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}

export default Details;
