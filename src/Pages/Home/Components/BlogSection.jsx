// components/BlogSection.jsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import img1 from '../../../assets/img/Blog1.jpg';
import img2 from '../../../assets/img/Blog2.jpg';
import img3 from '../../../assets/img/Blog3.jpg';
import img4 from '../../../assets/img/Blog4.jpg';

const blogs = [
  { id: 1, day: "۰۱", month: "خرداد", title: "راهنمای انتخاب چوب مناسب برای مبلمان", image: img1 },
  { id: 2, day: "۰۳", month: "خرداد", title: "تکنیک‌های پرداخت سطح چوب", image: img2 },
  { id: 3, day: "۰۵", month: "خرداد", title: "نگهداری از وسایل چوبی در خانه", image: img4 },
  { id: 4, day: "۰۸", month: "خرداد", title: "معرفی بهترین رنگ‌های چوب", image: img3 },
  { id: 5, day: "۱۲", month: "خرداد", title: "طراحی فضای داخلی با مبلمان چوبی", image: img1 },
  { id: 6, day: "۱۵", month: "خرداد", title: "چوب‌های بومی ایران", image: img2 },
];

const BlogCard = ({ blog }) => (
  <div className="relative bg-gray-200 rounded-2xl overflow-hidden w-full aspect-[4/3] cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300">
    <img
      src={blog.image}
      alt={blog.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* تاریخ */}
    <div className="absolute top-3 right-3 bg-white text-white text-center px-2.5 py-1.5 rounded-xl text-xs font-bold leading-snug shadow-md">
      <div className="text-[#7a9e6f] text-sm font-extrabold">{blog.day}</div>
      <div className="text-[#7a9e6f] text-sm font-bold">{blog.month}</div>
    </div>

    {/* عنوان */}
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-3">
      <p className="text-white text-sm font-bold text-center line-clamp-2">
        {blog.title}
      </p>
    </div>
  </div>
);

const BlogSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 my-10 font-vazir"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 whitespace-nowrap">
            آخرین <span className="text-[#7a9e6f]">مقالات</span>
          </h2>
          <div className="flex-1 border-t-2 border-dashed border-gray-300" />
          <button
            onClick={() => setShowModal(true)}
            className="whitespace-nowrap flex items-center gap-1.5 bg-[#7a9e6f] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg hover:bg-[#6a8e5f] transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <span>←</span>
            <span>مقالات بیشتر</span>
          </button>
        </div>

        {/* Slider */}
        <Swiper
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.15 },
            412: { slidesPerView: 1.3 },
            640: { slidesPerView: 2.1 },
            768: { slidesPerView: 2.7 },
            1024: { slidesPerView: 3.5 },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Navigation]}
          className="pb-12"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* استایل‌های سفارشی برای pagination */}
        <style>{`
          .swiper-pagination-bullet {
            background: #7a9e6f !important;
            opacity: 0.5 !important;
          }
          .swiper-pagination-bullet-active {
            background: #7a9e6f !important;
            opacity: 1 !important;
            width: 20px !important;
            border-radius: 10px !important;
          }
        `}</style>
      </section>

      {/* ====== MODAL ====== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn px-4">
          <div className="bg-white rounded-3xl max-w-md w-full mx-auto p-6 sm:p-8 shadow-2xl animate-scaleIn relative">
            {/* دکمه بستن */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* محتوای مودال */}
            <div className="text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                به زودی مقالات جدید!
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                تیم محتوای اریس در حال آماده‌سازی مقالات جدید و جذاب برای شماست.
                به زودی با بهترین مطالب در خدمت شما خواهیم بود.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-[#7a9e6f]/10 text-[#7a9e6f] rounded-full text-xs font-medium">
                  🌿 چوب
                </span>
                <span className="px-3 py-1 bg-[#7a9e6f]/10 text-[#7a9e6f] rounded-full text-xs font-medium">
                  🪚 دکوراسیون
                </span>
                <span className="px-3 py-1 bg-[#7a9e6f]/10 text-[#7a9e6f] rounded-full text-xs font-medium">
                  🏠 خانه
                </span>
                <span className="px-3 py-1 bg-[#7a9e6f]/10 text-[#7a9e6f] rounded-full text-xs font-medium">
                  💡 ایده
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full bg-gradient-to-r from-[#7a9e6f] to-[#6a8e5f] text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-[#7a9e6f]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                متوجه شدم 👍
              </button>
            </div>
          </div>
        </div>
      )}

      {/* انیمیشن‌ها */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default BlogSection;