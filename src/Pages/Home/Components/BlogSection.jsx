// components/BlogSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import img1 from '../../../assets/img/Blog1.jpg'
import img2 from '../../../assets/img/Blog2.jpg'
import img3 from '../../../assets/img/Blog3.jpg'
import img4 from '../../../assets/img/Blog4.jpg'

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
      <div className="text-primary text-sm font-extrabold">{blog.day}</div>
      <div className="text-primary text-sm font-bold">{blog.month}</div>
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
  return (
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
        <button className="whitespace-nowrap flex items-center gap-1.5 bg-[#7a9e6f] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg hover:bg-[#6a8e5f] transition-colors duration-300 hover:scale-105 active:scale-95">
          <span>←</span>
          <span>مشاهده وبلاگ</span>
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
  );
};

export default BlogSection;