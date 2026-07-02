// components/BlogSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/bundle";

const blogs = [
  { id: 1, day: "01", month: "خرداد", title: "راهنمای انتخاب چوب مناسب برای مبلمان", image: null },
  { id: 2, day: "03", month: "خرداد", title: "تکنیک‌های پرداخت سطح چوب", image: null },
  { id: 3, day: "05", month: "خرداد", title: "نگهداری از وسایل چوبی در خانه", image: null },
  { id: 4, day: "08", month: "خرداد", title: "معرفی بهترین رنگ‌های چوب", image: null },
  { id: 5, day: "12", month: "خرداد", title: "طراحی فضای داخلی با مبلمان چوبی", image: null },
  { id: 6, day: "15", month: "خرداد", title: "چوب‌های بومی ایران", image: null },
  { id: 7, day: "18", month: "خرداد", title: "هنر منبت‌کاری سنتی", image: null },
  { id: 8, day: "20", month: "خرداد", title: "ترکیب چوب و فلز در دکوراسیون", image: null },
  { id: 9, day: "22", month: "خرداد", title: "مبلمان چوبی برای فضای باز", image: null },
  { id: 10, day: "25", month: "خرداد", title: "اصول نگهداری مبل چرم و چوب", image: null },
];

const BlogCard = ({ blog }) => (
  <div className="relative bg-gray-200 rounded-2xl overflow-hidden w-full aspect-[4/3] cursor-pointer group">
    {blog.image ? (
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <span className="text-gray-400 text-sm">تصویر</span>
      </div>
    )}

    <div className="absolute top-3 left-3 bg-[#7a9e6f] text-white text-center px-2.5 py-1.5 rounded-xl text-xs font-bold leading-snug shadow-md">
      <div className="text-base font-extrabold">{blog.day}</div>
      <div>{blog.month}</div>
    </div>

    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
      <p className="text-white text-sm font-semibold line-clamp-2 text-right">
        {blog.title}
      </p>
    </div>
  </div>
);

const BlogSection = () => {
  return (
    <section
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 my-10 font-vazir mb-25"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 whitespace-nowrap">
          آخرین <span className="text-[#7a9e6f]">مقالات</span>
        </h2>
        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
        <button className="whitespace-nowrap flex items-center gap-1.5 bg-[#7a9e6f] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg hover:bg-[#6a8e5f] transition-colors">
          <span>←</span>
          <span>مشاهده وبلاگ</span>
        </button>
      </div>

      {/* Slider — همه سایزها */}
      <Swiper
        spaceBetween={16}
        breakpoints={{
          0:    { slidesPerView: 1.15 },
          412: {slidesPerView: 1 },
          640:  { slidesPerView: 2.1 },
          640:  { slidesPerView: 2.7 },
          1024: { slidesPerView: 3.5 },
        }}
        className="pb-10"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <BlogCard blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BlogSection;
