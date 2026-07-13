import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  { id: 1, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 2, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 3, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 4, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
];

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/faq"); // به صفحه سوالات متداول برو
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
          {faqs.map((faq) => {
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
                  className="w-full flex justify-between items-center px-4 py-3 text-[8.5px] md:text-[13px] font-bold cursor-pointer transition-colors"
                  style={{ color: "var(--color-fourth)" }}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <span
                    className="text-xl font-light ml-2 transition-transform duration-300"
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
                    className="px-4 pb-3 text-xs leading-6"
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
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.
            </p>
          </div>
          
          <div 
            className="w-[70%] rounded-[5px] p-4 flex-1"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="سوالتان را اینجا برای ما بگذارید"
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