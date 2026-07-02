import React from "react";
import {
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

const trustBadges = [
  {
    id: 1,
    icon: <FaShieldAlt className="text-2xl lg:text-3xl" />,
    title: "پرداخت امن",
    description: "درگاه پرداخت معتبر و ایمن",
  },
  {
    id: 2,
    icon: <FaTruck className="text-2xl lg:text-3xl" />,
    title: "ارسال مطمئن",
    description: "تحویل سریع و بسته‌بندی امن",
  },
  {
    id: 3,
    icon: <FaUndoAlt className="text-2xl lg:text-3xl" />,
    title: "ضمانت بازگشت",
    description: "۷ روز فرصت مرجوعی کالا",
  },
  {
    id: 4,
    icon: <FaHeadset className="text-2xl lg:text-3xl" />,
    title: "پشتیبانی حرفه‌ای",
    description: "پاسخ‌گویی تخصصی قبل و بعد خرید",
  },
];

const quickLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "محصولات", href: "/shop" },
  { label: "وبلاگ", href: "/blog" },
  { label: "تماس با ما", href: "/contact" },
];

const serviceLinks = [
  { label: "سفارش اختصاصی", href: "/custom" },
  { label: "خدمات کارگاهی", href: "/workshop" },
  { label: "برش و حک لیزر", href: "/laser" },
  { label: "خرید عمده", href: "/bulk" },
];

function Footer() {
  return (
    <footer
      dir="rtl"
      className="mt-16 bg-[var(--brand-charcoal)] text-[var(--brand-ivory)] border-t border-[var(--brand-taupe)]/20"
    >
      {/* Trust Badges */}
      <section className="border-b border-white/5 bg-black/20">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          {/* 
            موبایل: 2 ستون
            دسکتاپ: 4 ستون
          */}
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge, index) => {
              const isLeftColumn = index % 2 === 0;
              const isTopRow = index < 2;

              return (
                <div
                  key={badge.id}
                  className={`
                    flex flex-col items-center justify-center gap-3 px-3 py-5 text-center
                    sm:flex-row sm:justify-start sm:text-right sm:gap-4
                    border-[var(--brand-taupe)]/20
                    ${isLeftColumn ? "border-l" : ""}
                    ${!isTopRow ? "border-b-0" : "border-b"}
                    lg:border-b-0
                    lg:border-l
                    last:border-l-0
                  `}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-gold)] shadow-inner transition-all duration-300 group-hover:bg-[var(--brand-gold)] group-hover:text-[var(--brand-charcoal)]">
                    {badge.icon}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[13px] font-bold leading-tight text-white sm:text-sm lg:text-base">
                      {badge.title}
                    </h4>
                    <p className="text-[10px] leading-relaxed text-[var(--brand-taupe)]/80 sm:text-xs lg:text-sm">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              اریس <span className="text-[var(--brand-gold)]">وود</span>
            </h2>
            <p className="mt-3 text-sm leading-8 text-[var(--brand-taupe)]/90 text-justify">
              برند تخصصی تولید محصولات چوبی دست‌ساز با طراحی مینیمال،
              متریال اصیل و کیفیت ساخت بالا. ترکیب هنر، دقت و اصالت برای
              خانه‌های گرم و ماندگار.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-charcoal)]"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-charcoal)]"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="#"
              aria-label="Whatsapp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-charcoal)]"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="border-r-4 border-[var(--brand-gold)] pr-3 text-lg font-bold text-white">
            دسترسی سریع
          </h3>
          <ul className="space-y-4">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-[var(--brand-taupe)] transition-colors hover:text-[var(--brand-gold)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]/40" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h3 className="border-r-4 border-[var(--brand-gold)] pr-3 text-lg font-bold text-white">
            خدمات ما
          </h3>
          <ul className="space-y-4">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-[var(--brand-taupe)] transition-colors hover:text-[var(--brand-gold)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]/40" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h3 className="border-r-4 border-[var(--brand-gold)] pr-3 text-lg font-bold text-white">
            ارتباط با ما
          </h3>

          <div className="space-y-4 text-sm text-[var(--brand-taupe)]">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-[var(--brand-gold)]" />
              <p className="leading-7">
                تهران، شهرک صنعتی خاوران، بازار چوب ایران، اریس وود
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[var(--brand-gold)]" />
              <a
                href="tel:09300000000"
                className="transition-colors hover:text-white"
              >
                ۰۹۳۰ ۰۰۰ ۰۰۰۰
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[var(--brand-gold)]" />
              <a
                href="mailto:info@eriswood.com"
                className="transition-colors hover:text-white"
              >
                info@eriswood.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Logos */}
      <section className="border-t border-white/5 bg-black/30 py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-6 px-4 sm:px-6 lg:px-8">
          {["enamad", "samandehi", "payment"].map((img) => (
            <div key={img} className="group relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--brand-gold)] to-transparent opacity-20 blur transition duration-500 group-hover:opacity-40" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-xl bg-white p-2 shadow-xl">
                <img
                  src={`/images/${img}.png`}
                  alt={img}
                  className="max-h-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Copyright */}
      <div className="border-t border-white/5 bg-black/40 py-6">
        <p className="text-center text-[10px] uppercase tracking-widest text-[var(--brand-taupe)]/60 md:text-xs">
          © 2026 ERIS WOOD STUDIO — Handcrafted with Passion
        </p>
      </div>
    </footer>
  );
}

export default Footer;
