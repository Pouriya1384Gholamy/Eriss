import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  { 
    id: 1, 
    question: "چگونه می‌توانم سفارش خود را ثبت کنم؟", 
    answer: "برای ثبت سفارش کافی است محصول مورد نظر خود را به سبد خرید اضافه کرده و سپس مراحل ثبت سفارش را طی کنید. پس از تکمیل اطلاعات و انتخاب روش ارسال، سفارش شما ثبت خواهد شد." 
  },
  { 
    id: 5, 
    question: "چگونه از تخفیف‌ها و پیشنهادات ویژه مطلع شوم؟", 
    answer: "با عضویت در خبرنامه فروشگاه و دنبال کردن ما در شبکه‌های اجتماعی (اینستاگرام، تلگرام و واتساپ)، از آخرین تخفیف‌ها و پیشنهادات ویژه با خبر شوید." 
  },
  { 
    id: 6, 
    question: "آیا امکان تغییر یا لغو سفارش وجود دارد؟", 
    answer: "بله، تا قبل از ارسال سفارش می‌توانید با تماس با پشتیبانی، سفارش خود را تغییر داده یا لغو کنید. پس از ارسال سفارش، امکان لغو وجود ندارد و باید مراحل بازگشت کالا را طی کنید." 
  },
  { 
    id: 7, 
    question: "آیا محصولات با رنگ‌های مختلف موجود هستند؟", 
    answer: "بله، بسیاری از محصولات ما در رنگ‌های متنوع موجود هستند. شما می‌توانید در صفحه هر محصول، رنگ‌های موجود را مشاهده و انتخاب کنید." 
  },
  { 
    id: 8, 
    question: "آیا امکان سفارش محصولات به صورت عمده وجود دارد؟", 
    answer: "بله، برای سفارشات عمده و پروژه‌های خاص، با تیم فروش ما تماس بگیرید تا بهترین قیمت و شرایط را برای شما فراهم کنیم." 
  },
];

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/faq");
  };

  return (
    <div 
      className="relative max-w-[1100px] w-[95%] mx-auto p-4 mt-12 rounded-2xl border"
      style={{
        backgroundColor: "var(--color-first)",
        borderColor: "var(--color-border)",
        borderWidth: "1px",
      }}
    >
      {/* برچسب بالایی */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <span 
          className="text-white text-sm px-5 py-1.5 rounded-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          سوالات متداول
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 p-2">
        {/* لیست سوالات */}
        <div className="flex flex-col gap-3 flex-1 mr-2">
          {faqs.slice(0, 4).map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl shadow-sm border overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-sixeth)",
                  borderColor: "var(--color-third)",
                }}
              >
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-[8.5px] md:text-[13px] font-bold cursor-pointer transition-colors text-right"
                  style={{ color: "var(--color-fourth)" }}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span className="flex-1">{faq.question}</span>
                  <span
                    className="text-xl font-light mr-2 transition-transform duration-300 flex-shrink-0"
                    style={{ 
                      color: "var(--color-primary)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p 
                    className="px-4 pb-3 text-xs leading-6 text-right"
                    style={{ color: "var(--color-fiveth)" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* دکمه مشاهده همه - با useNavigate */}
          <button
            onClick={handleViewAll}
            className="flex justify-center items-center gap-2 p-3 mt-2 text-sm font-medium transition-all duration-300 rounded-xl hover:scale-[1.02] active:scale-95 group"
            style={{
              color: "var(--color-primary)",
              backgroundColor: "var(--color-sixeth)",
              border: "1px solid var(--color-third)",
            }}
          >
            <span>مشاهده همه سوالات</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "var(--color-primary)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        {/* کارت پشتیبانی */}
        <div 
          className="w-full sm:w-[300px] sm:h-[280px] md:w-[350px] md:h-[280px] flex flex-col justify-center items-center gap-4 shrink-0 rounded-[10px] m-auto ml-2"
          style={{ backgroundColor: "var(--color-text-muted)" }}
        >
          <div className="text-center px-4">
            <h3 
              className="text-base font-bold mb-2"
              style={{ color: "var(--color-fourth)" }}
            >
              هنوز سوال دارید؟
            </h3>
            <p 
              className="text-xs leading-6"
              style={{ color: "var(--color-fiveth)" }}
            >
              تیم پشتیبانی ما آماده پاسخگویی به شماست
            </p>
          </div>
          
          <div 
            className="w-[70%] rounded-[5px] p-4 flex-1"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="سوالتان را اینجا برای ما بگذارید..."
              rows={5}
              className="w-full h-full text-[12px] bg-transparent resize-none outline-none"
              style={{
                color: "var(--color-text1)",
              }}
            />
          </div>
          
          <button 
            className="w-28 h-9 mb-2 text-sm font-bold rounded transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text1)",
            }}
          >
            ثبت سوال
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;