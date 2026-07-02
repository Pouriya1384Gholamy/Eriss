import { useState, useEffect, Fragment } from "react";
import { HiOutlineClock } from "react-icons/hi";

const TARGET = new Date(Date.now() + 4 * 24 * 3600 * 1000 + 4 * 3600 * 1000 + 4 * 60 * 1000 + 4 * 1000);

const pad = (n) => String(n).padStart(2, "0");

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Discount() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: pad(time.seconds), label: "ثانیه" },
    { value: pad(time.minutes), label: "دقیقه" },
    { value: pad(time.hours), label: "ساعت" },
    { value: pad(time.days), label: "روز" },
  ];

  const isExpired = time.days + time.hours + time.minutes + time.seconds === 0;

  return (
    <section className="mx-auto mt-8 flex max-w-[1006px] sm:h-[300px] flex-col items-center overflow-hidden rounded-2xl shadow-sm sm:flex-row-reverse bg-[var(--brand-ivory)] border-2 border-[var(--brand-charcoal)]">
      {/* بنر */}
      <div className="h-[200px] w-full flex-shrink-0 sm:h-full sm:w-1/2 bg-[var(--brand-ivory)]" />

      {/* محتوا */}
      <div className="flex w-full flex-col justify-center items-center gap-3 px-6 py-8 text-center sm:w-1/2">
        <p className="text-sm font-semibold text-[var(--brand-charcoal)]">
          تخفیفات ویژه
        </p>

        <h2 className="text-xl font-bold leading-relaxed text-[var(--brand-charcoal)]">
          تابستان{" "}
          <span className="text-[var(--brand-taupe)]">
            پیشنهاد عالی برای خرید
          </span>
        </h2>

        <p className="text-sm text-[var(--color-text-muted)]">
          ۵۰٪ تخفیف با مدت محدود — فرصت رو از دست نده!
        </p>

        {!isExpired ? (
          <div
            role="timer"
            aria-live="polite"
            className="mt-2 flex items-center gap-2 rounded-[10px] px-6 py-2 border-2 border-[var(--brand-taupe)]"
          >
            {units.map((u, i) => (
              <Fragment key={u.label}>
                <div className="flex flex-col items-center">
                  <span className="tabular-nums text-lg font-bold text-[var(--brand-charcoal)]">
                    {u.value}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {u.label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="mb-3 select-none font-bold text-[var(--color-text-muted)]">
                    :
                  </span>
                )}
              </Fragment>
            ))}
            <HiOutlineClock size={38} className="items-center mr-3 text-[var(--brand-gold)]" />
          </div>
        ) : (
          <p className="mt-2 text-sm font-semibold text-red-600">
            پیشنهاد به پایان رسید
          </p>
        )}

        <button
          className="mt-3 rounded-lg px-10 py-2.5 text-sm font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 bg-[var(--brand-gold)] hover:bg-[var(--brand-charcoal)] text-white"
          disabled={isExpired}
        >
          {isExpired ? "پایان یافته" : "رفتن به کمد تخفیفات چوبی"}
        </button>
      </div>
    </section>
  );
}
