import React, { useMemo, useState } from "react";
import { products } from "../../data/products";
import { useNavigate } from "react-router-dom";

function UnderHeader() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // استخراج داینامیک دسته‌بندی‌ها و محصولات هر دسته
  const menuData = useMemo(() => {
    if (!products) return [];
    const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
    return categories.map(cat => ({
      name: cat,
      products: products.filter(p => p.category === cat),
      subs: [...new Set(products.filter(p => p.category === cat).map(p => p.type))].filter(Boolean)
    }));
  }, [products]);

  // محصولات بر اساس تایپ انتخاب شده
  const getProductsByType = (categoryName, type) => {
    return products.filter(p => p.category === categoryName && p.type === type);
  };

  return (
    <div className="font-light hidden lg:flex justify-between items-center w-full h-[50px] bg-white/5 shadow-xl rounded-b-[7px]">
      <article className="flex justify-between items-center">
        {/* منوی دسته‌بندی */}
        <div 
          className="relative" 
          onMouseEnter={() => setIsOpen(true)} 
          onMouseLeave={() => {
            setIsOpen(false); 
            setActiveCat(null);
            setHoveredProduct(null);
          }}
        >
          <button className="flex justify-around items-center bg-primary w-[225px] h-[50px] rounded-[10px] mx-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>

            <p className="text-white">دسته بندی محصولات</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 text-white transition ${isOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-[52px] z-[120] flex animate-in fade-in slide-in-from-top-2 duration-200">
              {/* لیست اصلی دسته‌ها */}
              <div className="w-[250px] overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-2xl">
                {menuData.map((item, i) => (
                  <div 
                    key={i} 
                    onMouseEnter={() => {
                      setActiveCat(item);
                      setHoveredProduct(null);
                    }} 
                    className={`flex cursor-pointer items-center justify-between px-4 py-3 text-[13px] transition ${activeCat?.name === item.name ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>{item.name}</span>
                    {item.subs.length > 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              {/* نمایش محصولات دسته‌بندی یا زیرمجموعه */}
              {activeCat && (
                <div className="mr-2 w-[350px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl animate-in slide-in-from-right-1">
                  {/* عنوان دسته‌بندی */}
                  <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-sm font-bold text-gray-800">{activeCat.name}</span>
                    <span className="text-[10px] text-gray-400">{activeCat.products.length} محصول</span>
                  </div>

                  {/* نمایش زیرمجموعه‌ها (تایپ‌ها) */}
                  {activeCat.subs.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {activeCat.subs.map((sub, idx) => {
                        const subProducts = getProductsByType(activeCat.name, sub);
                        return (
                          <div 
                            key={idx}
                            onMouseEnter={() => setHoveredProduct({ type: sub, products: subProducts })}
                            className="cursor-pointer rounded-lg bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-gray-600 transition hover:bg-primary/10 hover:text-primary"
                          >
                            {sub} ({subProducts.length})
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* نمایش محصولات */}
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {(hoveredProduct ? hoveredProduct.products : activeCat.products).slice(0, 8).map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-gray-50"
                      >
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-[12px] font-medium text-gray-800 line-clamp-1">{product.title}</div>
                          <div className="text-[11px] text-gray-500">{product.price.toLocaleString()} تومان</div>
                        </div>
                        {product.rating && (
                          <div className="flex items-center gap-0.5 text-[10px] text-yellow-500">
                            {"★".repeat(product.rating)}
                            {"☆".repeat(5 - product.rating)}
                          </div>
                        )}
                      </div>
                    ))}
                    {activeCat.products.length > 8 && (
                      <div className="mt-2 text-center text-[11px] text-primary hover:underline cursor-pointer">
                        مشاهده همه {activeCat.products.length} محصول
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <ul className="flex justify-between items-center text-[12px] xl:text-[15px] gap-5 text-[#363434]">
          <li className="">فروشگاه</li>
          <li>خرید سازمانی</li>
          <li>درباره ما</li>
          <li>تماس با ما</li>
          <li>وبلاگ</li>
          <li>تخفیفات</li>
        </ul>
      </article>

      <article className="flex justify-between items-center">
        <button className="ml-5 text-white w-[183px] h-[26px] bg-secondary rounded-[7px] h-14 text-[12px]">سوالی دارید؟ با ما صحبت کنید</button>
        <div className="flex justify-between items-center">
          <p className="text-[15px]">09932762448</p>
          <div className="w-7 h-7 bg-white rounded-[7px] flex justify-center items-center mx-3 rounded-[50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91 a16 16 0 0 0 6 6l.99-1.27 a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        </div>
      </article>
    </div>
  );
}

export default UnderHeader;