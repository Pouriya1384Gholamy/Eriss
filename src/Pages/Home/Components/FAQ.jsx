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
    <div className="relative max-w-[1100px] w-[95%] mx-auto p-4 bg-white border-1 rounded-2xl border-primary mt-12">

      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <span className="bg-primary text-white text-sm px-5 py-1.5 rounded-full">
          سوالات متداول
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-3 flex-1 mr-2">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-sixeth rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-[10px] md:text-[13px] font-bold text-gray-700 cursor-pointer"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`text-primary text-xl font-light ml-2 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button><div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-4 pb-3 text-xs text-gray-500 leading-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full sm:w-[300px] sm:h-[280px] md:w-[350px] md:h-[280px] flex flex-col justify-center items-center gap-4 shrink-0 rounded-[10px] bg-fiveth m-auto ml-2">
          <div className="text-center">
            <h3 className="text-base font-bold text-gray-800 mb-2">هنوز سوال دارید؟</h3>
            <p className="text-xs text-gray-500 leading-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.
            </p>
          </div>
          <div className="bg-primary w-[70%] rounded-[5px] p-4 flex-1">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="سوالتان را اینجا برای ما بگذارید"
              rows={5}
              className="w-full h-full text-[12px] bg-transparent resize-none text-sm text-third placeholder-third outline-none"
            />
          </div>
          <button className="w-28 h-9 mb-2 bg-primary text-white rounded text-sm font-bold hover:opacity-90 transition-opacity">
            ثبت سوال
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;