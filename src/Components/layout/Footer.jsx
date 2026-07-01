import { FaInstagram, FaTelegram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";
import { MdLocalShipping, MdSupportAgent } from "react-icons/md";
import { BsAwardFill } from "react-icons/bs";

// ─── Sub-components ────────────────────────────────

const TrustBadge = ({ icon: Icon, title, subtitle, color, isLast }) => (
  <div
    className={`flex flex-col items-center gap-1.5 px-3 py-5 text-center
                ${!isLast ? "border-b md:border-b-0 md:border-l border-[#e8ede4]" : ""}`}
  >
    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${color.bg}`}>
      <Icon className={`text-xl ${color.icon}`} />
    </div>
    <p className="text-xs font-bold text-[#2d2d2d] leading-5">{title}</p>
    <p className="text-[10px] text-gray-400 leading-4">{subtitle}</p>
  </div>
);

const FooterLinkColumn = ({ title, links }) => (
  <div className="flex flex-col gap-2.5">
    <h4 className="text-sm font-black text-[#2d2d2d] mb-1 border-b border-[#c8d8c0] pb-2">
      {title}
    </h4>
    {links.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className="text-sm text-gray-500 hover:text-[#7a9e6f] hover:-translate-x-1
                   transition-all duration-200 w-fit"
      >
        {link.label}
      </a>
    ))}
  </div>
);

const SocialBtn = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full flex items-center justify-center
               border-2 border-[#7a9e6f] text-[#7a9e6f]
               hover:bg-[#7a9e6f] hover:text-white
               transition-all duration-300"
  >
    <Icon className="text-lg" />
  </a>
);

// ─── Data ────────────────────────────────

const trustBadges = [
  {
    icon: MdLocalShipping,
    title: "ارسال سراسری",
    subtitle: "به تمام نقاط ایران",
    color: { bg: "bg-[#eef4eb]", icon: "text-[#7a9e6f]" },
  },
  {
    icon: HiShieldCheck,
    title: "ضمانت اصالت",
    subtitle: "تضمین کیفیت محصولات",
    color: { bg: "bg-[#eef4eb]", icon: "text-[#5d8c5a]" },
  },
  {
    icon: MdSupportAgent,
    title: "پشتیبانی ۲۴/۷",
    subtitle: "همیشه در کنار شما",
    color: { bg: "bg-[#eef4eb]", icon: "text-[#7a9e6f]" },
  },
  {
    icon: BsAwardFill,
    title: "بیش از ۱۰ سال تجربه",
    subtitle: "در صنعت چوب ایران",
    color: { bg: "bg-[#eef4eb]", icon: "text-[#5d8c5a]" },
  },
];

const footerColumns = [
  {
    title: "دسترسی سریع",
    links: [
      { label: "صفحه اصلی", href: "/" },
      { label: "محصولات", href: "/products" },
      { label: "درباره ما", href: "/about" },
      { label: "وبلاگ", href: "/blog" },
      { label: "تماس با ما", href: "/contact" },
    ],
  },
  {
    title: "محصولات",
    links: [
      { label: "پارکت چوبی", href: "/products/parquet" },
      { label: "ورق روکش", href: "/products/veneer" },
      { label: "تخته‌سه‌لا", href: "/products/plywood" },
      { label: "MDF و HDF", href: "/products/mdf" },
      { label: "چوب سازه‌ای", href: "/products/structural" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { label: "مشاوره رایگان", href: "/services/consultation" },
      { label: "برش و پردازش", href: "/services/cutting" },
      { label: "حمل و نصب", href: "/services/installation" },
      { label: "گارانتی محصولات", href: "/services/warranty" },
    ],
  },
];

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com", label: "اینستاگرام" },
  { icon: FaTelegram,  href: "https://t.me",          label: "تلگرام"     },
  { icon: FaWhatsapp, href: "https://wa.me",           label: "واتساپ"     },
  { icon: FaLinkedin, href: "https://linkedin.com",    label: "لینکدین"    },
];

// ─── Main Footer ────────────────────────────────

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f0e8] font-vazir" dir="rtl">

      {/* ── Trust Badges ── */}
      <div className="w-full px-4 pt-6 flex justify-center">
        <div
          className="w-full max-w-4xl bg-white rounded-[20px] shadow-md
                     border border-[#c8d8c0] mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {trustBadges.map((badge, i) => (
              <TrustBadge
                key={badge.title}
                {...badge}
                isLast={i === trustBadges.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-6">

        {/* Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          <div className="md:col-span-1 space-y-4">
            <div>
              <h2 className="text-xl font-black text-[#2d2d2d] mb-2">آریس وود</h2>
              <p className="text-sm text-gray-500 leading-7">
                بیش از یک دهه تجربه در تأمین و عرضه انواع چوب طبیعی و مصنوعی
                با بالاترین استانداردهای کیفی برای مشتریان سراسر ایران.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {footerColumns.map((col) => (
              <FooterLinkColumn key={col.title} {...col} />
            ))}
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between
                     gap-6 border-t border-[#c8d8c0] pt-6"
        >
          <div className="flex items-center gap-3">
            {["نماد اعتماد", "ساماندهی"].map((text) => (
              <div
                key={text}
                className="w-16 h-20 rounded-xl bg-white border border-[#c8d8c0]
                           flex items-center justify-center text-[10px] text-gray-400
                           shadow-sm text-center px-1"
              >
                {text}
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500 leading-7">
            <p>
              تهران، خیابان ولیعصر، پلاک ۱۲۳ &nbsp;|&nbsp; تلفن:{" "}
              <span className="text-[#7a9e6f] font-bold">۰۲۱-۸۸۱۲۳۴۵۶</span>
            </p>
            <p>
              ایمیل:{" "}
              <a href="mailto:info@ariswood.ir" className="text-[#7a9e6f] hover:underline">
                info@ariswood.ir
              </a>
            </p>
          </div>
        </div>

        {/* ── Copyright ── */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © ۱۴۰۵ اریس وود — تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
