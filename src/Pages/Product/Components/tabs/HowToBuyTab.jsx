import { useState } from "react";

const faqs = [
  { id: 1, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 2, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 3, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 4, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 5, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
  { id: 6, question: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟", answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است." },
];

const HowToBuyTab = () => {
  const [question, setQuestion] = useState("");
  const [openId, setOpenId] = useState(null);

  return (
    <div className="relative w-full max-w-[1100px] mx-auto px-3 sm:px-4 md:px-6 bg-white">

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex flex-col gap-3 flex-1">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="shadow-2xl rounded-2xl shadow-sm border border-[var(--brand-taupe)]/20 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-[13px] font-bold text-[var(--brand-charcoal)] cursor-pointer gap-2"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span className="text-right flex-1">{faq.question}</span>
                  <span
                    className={`text-[var(--brand-gold)] text-base sm:text-xl font-light flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-3 sm:px-4 pb-3 text-[10px] sm:text-xs text-[var(--brand-taupe)] leading-5 sm:leading-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowToBuyTab;
