import React from 'react'

function UnderHeader() {
  return (
    <div 
      className="font-light hidden lg:flex justify-between items-center w-full h-[50px] border-b"
      style={{ 
        backgroundColor: "rgba(243, 235, 221, 0.3)", // var(--brand-ivory) با اوپاسیتی ۳۰٪
        borderColor: "rgba(160, 143, 122, 0.1)" // var(--brand-taupe) با اوپاسیتی ۱۰٪
      }}
    >
      <article className="flex justify-between items-center">
        {/* دکمه دسته‌بندی */}
        <button 
          className="flex justify-around items-center w-[225px] h-[40px] rounded-[10px] mx-5 transition-all text-white"
          style={{ backgroundColor: "var(--brand-charcoal)" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-gold)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--brand-charcoal)"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <p className="text-[14px]">دسته بندی محصولات</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {/* منو هدر */}
        <ul className="flex gap-5 text-[14px]" style={{ color: "var(--color-text)" }}>
          {["فروشگاه", "خرید سازمانی", "درباره ما", "تماس با ما", "وبلاگ"].map((item) => (
            <li 
              key={item} 
              className="cursor-pointer transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--brand-gold)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text)"}
            >
              {item}
            </li>
          ))}
          <li 
            className="font-bold cursor-pointer transition-colors" 
            style={{ color: "var(--brand-gold)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--brand-charcoal)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--brand-gold)"}
          >
            تخفیفات
          </li>
        </ul>
      </article>

      <article className="flex justify-between items-center ml-5">
        {/* دکمه مشاوره */}
        <button 
          className="text-white px-4 h-[34px] rounded-[7px] text-[12px] transition-all"
          style={{ backgroundColor: "var(--brand-gold)" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-charcoal)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--brand-gold)"}
        >
          سوالی دارید؟ با ما صحبت کنید
        </button>

        {/* شماره تماس */}
        <div className="flex items-center mr-5">
          <p className="text-[15px] font-medium" dir="ltr" style={{ color: "var(--color-text)" }}>
            0993 276 2448
          </p>
          <div 
            className="w-8 h-8 text-white flex justify-center items-center mr-3 rounded-full shadow-lg"
            style={{ backgroundColor: "var(--brand-gold)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67 A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91 a16 16 0 0 0 6 6l.99-1.27 a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        </div>
      </article>
    </div>
  )
}

export default UnderHeader;
