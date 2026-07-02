import { Swiper, SwiperSlide } from "swiper/react";
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
  <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] cursor-pointer group"
    style={{ backgroundColor: "var(--color-sixeth)" }}
  >
    {blog.image ? (
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-full object-cover group-hover:scale-105 transition"
      />
    ) : (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--color-sixeth), var(--color-first))",
          color: "var(--color-text-muted)"
        }}
      >
        <span className="text-sm">تصویر</span>
      </div>
    )}

    {/* تاریخ */}
    <div
      className="absolute top-3 left-3 text-center px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-md"
      style={{ backgroundColor: "var(--color-primary)", color: "var(--color-p-text)" }}
    >
      <div className="text-base font-extrabold">{blog.day}</div>
      <div>{blog.month}</div>
    </div>

    {/* عنوان */}
    <div className="absolute bottom-0 inset-x-0 px-4 py-3"
      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
    >
      <p className="text-white text-sm font-semibold line-clamp-2 text-right">
        {blog.title}
      </p>
    </div>
  </div>
);

const BlogSection = () => {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 my-10 font-vazir" dir="rtl">
      
      <div className="flex items-center justify-between mb-6 gap-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          آخرین <span style={{ color: "var(--color-accent)" }}>مقالات</span>
        </h2>

        <div className="flex-1 border-t-2 border-dashed"
          style={{ borderColor: "var(--color-sixeth)" }}
        />

        <button
          className="flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg transition"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-p-text)"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
        >
          <span>←</span>
          <span>مشاهده وبلاگ</span>
        </button>
      </div>

      <Swiper spaceBetween={16} slidesPerView={3} className="pb-10">
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
