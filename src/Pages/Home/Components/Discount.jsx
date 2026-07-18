import { useState, useEffect, Fragment } from 'react'
import { HiOutlineClock } from 'react-icons/hi'
import img from '../../../assets/img/Discount.jpg'

const TARGET = new Date(
  Date.now() + 4 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000 + 4 * 60 * 1000 + 4 * 1000
)

const pad = (n) => String(n).padStart(2, '0')

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function Discount() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: pad(time.seconds), label: 'ثانیه' },
    { value: pad(time.minutes), label: 'دقیقه' },
    { value: pad(time.hours), label: 'ساعت' },
    { value: pad(time.days), label: 'روز' },
  ]

  const isExpired = time.days + time.hours + time.minutes + time.seconds === 0

  return (
    <section className="mx-auto mt-8 flex max-w-[1006px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm sm:flex-row-reverse">


      {/* ---- بخش عکس ---- */}
      <div className="w-full sm:w-1/2 bg-fiveth flex items-center justify-center overflow-hidden">
        <img
          src={img}
          alt="تخفیف ویژه تابستان"
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          style={{ maxHeight: '380px' }}
        />
      </div>

      {/* ---- بخش محتوا ---- */}
      <div className="flex w-full flex-col items-center justify-center gap-4 px-6 py-8 text-center sm:w-1/2">
        <p className="text-sm font-semibold text-gray-800">تخفیفات ویژه</p>

        <h2 className="text-xl font-bold leading-relaxed">
          تابستان <span className="text-secondary">پیشنهاد عالی برای خرید</span>
        </h2>

        <p className="text-sm text-gray-500">
          ۵۰٪ تخفیف با مدت محدود — فرصت رو از دست نده!
        </p>

        {!isExpired ? (
          <div
            role="timer"
            aria-live="polite"
            className="mt-2 flex items-center gap-2 rounded-[10px] border-2 border-secondary px-6 py-2"
          >
            {units.map((u, i) => (
              <Fragment key={u.label}>
                <div className="flex flex-col items-center">
                  <span className="tabular-nums text-lg font-bold text-gray-800">{u.value}</span>
                  <span className="text-xs text-gray-400">{u.label}</span>
                </div>
                {i < 3 && <span className="mb-3 select-none font-bold text-gray-400">:</span>}
              </Fragment>
            ))}
            <HiOutlineClock size={38} color="#9EAD8C" className="mr-3" />
          </div>
        ) : (
          <p className="mt-2 text-sm font-semibold text-red-500">پیشنهاد به پایان رسید</p>
        )}

        <button
          aria-label="مشاهده محصولات تخفیف‌دار"
          className="mt-3 rounded-lg bg-secondary px-10 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-green-600 active:scale-95 disabled:opacity-50"
          disabled={isExpired}
        >
          {isExpired ? 'پایان یافته' : 'رفتن به کمد تخفیفات چوبی'}
        </button>
      </div>
    </section>
  )
}