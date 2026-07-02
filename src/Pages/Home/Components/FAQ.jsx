import { useState } from "react";

const faqs = [
  { id: 1, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 2, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 3, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 4, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 5, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 6, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
];

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [openId, setOpenId] = useState(null);

  return (
    <div className="relative max-w-[1100px] w-[95%] mx-auto p-6 bg-[var(--color-first)] border border-[var(--color-border)] rounded-2xl mt-12">

      {/* بج بالای کامپوننت */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <span className="bg-[var(--color-primary)] text-[var(--color-p-text)] text-sm px-6 py-2 rounded-full font-bold">
          سوالات متداول
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* لیست سوالات */}
        <div className="flex flex-col gap-3 flex-1">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[var(--color-sixeth)] rounded-2xl border border-[var(--color-border)] overflow-hidden transition-all duration-200"
              >
                <button
                  className="w-full flex justify-between items-center px-4 py-4 text-xs md:text-sm font-bold text-[var(--color-text)] cursor-pointer"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span className="text-right">{faq.question}</span>
                  <span
                    className={`text-[var(--color-primary)] text-xl font-light ml-2 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-4 pb-4 text-xs text-[var(--color-text-muted)] leading-6 border-t border-[rgba(0,0,0,0.05)] pt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* باکس ارسال سوال */}
        <div className="w-full md:w-[320px] lg:w-[350px] flex flex-col justify-center items-center gap-4 shrink-0 rounded-2xl bg-[var(--color-sixeth)] p-5 border border-[var(--color-border)]">
          <div className="text-center">
            <h3 className="text-base font-bold text-[var(--color-text)] mb-2">هنوز سوال دارید؟</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.
            </p>
          </div>
          
          <div className="bg-[var(--color-first)] w-full rounded-xl p-3 border border-[var(--color-border)] flex-1">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="سوالتان را اینجا برای ما بگذارید..."
              rows={4}
              className="w-full h-full text-xs bg-transparent resize-none text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none"
            />
          </div>

          <button className="w-full h-10 bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white rounded-xl text-xs font-bold transition-all duration-300">
            ثبت سوال
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
