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
  FaHeadset
} from "react-icons/fa";

// ==============================
// 1) Trust Badges (بالای فوتر)
// ==============================
const trustBadges = [
  {
    id: 1,
    icon: <FaShieldAlt size={28} />,
    title: "پرداخت امن",
    description: "درگاه پرداخت امن و معتبر"
  },
  {
    id: 2,
    icon: <FaTruck size={28} />,
    title: "ارسال مطمئن",
    description: "تحویل سریع + بسته‌بندی مطمئن"
  },
  {
    id: 3,
    icon: <FaUndoAlt size={28} />,
    title: "۷ روز ضمانت بازگشت",
    description: "امکان مرجوعی بدون دردسر"
  },
  {
    id: 4,
    icon: <FaHeadset size={28} />,
    title: "پشتیبانی حرفه‌ای",
    description: "مشاوره قبل و بعد از خرید"
  }
];

const quickLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "محصولات", href: "/shop" },
  { label: "وبلاگ", href: "/blog" },
  { label: "تماس با ما", href: "/contact" }
];

const serviceLinks = [
  { label: "سفارش اختصاصی", href: "/custom" },
  { label: "خدمات کارگاهی", href: "/workshop" },
  { label: "برش و حک لیزر", href: "/laser" },
  { label: "خرید عمده", href: "/bulk" }
];

function Footer() {
  return (
    <footer
      dir="rtl"
      className="mt-16 bg-[var(--color-primary)] text-[var(--color-p-text)] border-t border-[var(--color-border)]"
    >

      {/* ==============================
          1) Trust Badges Section
      ===============================*/}
      <section className="bg-[rgba(0,0,0,0.15)] border-b border-[rgba(255,255,255,0.1)] py-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">

          {trustBadges.map(badge => (
            <div
              key={badge.id}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.06)] text-[var(--color-accent)]">
                {badge.icon}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold">{badge.title}</h4>
                <p className="text-xs text-[rgba(255,255,255,0.7)]">{badge.description}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ==============================
           2) Main Footer Content
      ===============================*/}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 py-12 sm:px-6 lg:px-8">

        {/* برند + توضیحات + شبکه اجتماعی */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold">
            اریس <span className="text-[var(--color-accent)]">وود</span>
          </h2>
          <p className="text-sm leading-7 text-[rgba(255,255,255,0.75)]">
            برند تخصصی تولید محصولات چوبی دست‌ساز با طراحی مینیمال، متریال اصیل
            و ساخت باکیفیت.  
            همراه خانه‌های گرم ایرانی.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a className="footer-social">
              <FaInstagram size={18} />
            </a>
            <a className="footer-social">
              <FaTelegramPlane size={18} />
            </a>
            <a className="footer-social">
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        {/* دسترسی سریع */}
        <div>
          <h3 className="footer-title">دسترسی سریع</h3>
          <ul className="space-y-3">
            {quickLinks.map(item => (
              <li key={item.label}>
                <a href={item.href} className="footer-link">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* خدمات سایت */}
        <div>
          <h3 className="footer-title">خدمات اریس وود</h3>
          <ul className="space-y-3">
            {serviceLinks.map(item => (
              <li key={item.label}>
                <a href={item.href} className="footer-link">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* اطلاعات تماس */}
        <div>
          <h3 className="footer-title">اطلاعات تماس</h3>

          <div className="space-y-4">
            <div className="footer-contact">
              <FaMapMarkerAlt size={16} />
              <p className="contact-text">تهران، بازار چوب، فروشگاه اریس وود</p>
            </div>

            <div className="footer-contact">
              <FaPhoneAlt size={14} />
              <a href="tel:09300000000" className="contact-text">0930 000 0000</a>
            </div>

            <div className="footer-contact">
              <FaEnvelope size={14} />
              <a href="mailto:info@eriswood.com" className="contact-text">
                info@eriswood.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ==============================
           3) E-Namad, Samandehi, Payment
      ===============================*/}
      <section className="bg-[rgba(0,0,0,0.12)] border-t border-[rgba(255,255,255,0.08)] py-6">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-6">

            {/* نماد اعتماد الکترونیکی */}
            <a href="#" className="h-24 w-20 overflow-hidden rounded-lg bg-white flex items-center justify-center">
              <img
                src="/images/enamad.png"
                alt="نماد اعتماد الکترونیکی"
                className="object-contain h-full w-full"
              />
            </a>

            {/* ساماندهی */}
            <a href="#" className="h-24 w-20 overflow-hidden rounded-lg bg-white flex items-center justify-center">
              <img
                src="/images/samandehi.png"
                alt="نشان ساماندهی"
                className="object-contain h-full w-full"
              />
            </a>

            {/* لوگوی پرداخت */}
            <a href="#" className="h-24 w-20 overflow-hidden rounded-lg bg-white flex items-center justify-center">
              <img
                src="/images/payment.png"
                alt="درگاه پرداخت"
                className="object-contain h-full w-full"
              />
            </a>

          </div>

        </div>
      </section>

      {/* ==============================
           4) CopyRight
      ===============================*/}
      <div className="border-t border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.07)]">
        <div className="max-w-[1280px] mx-auto py-4 text-center text-xs text-[rgba(255,255,255,0.65)]">
          © 2026 اریس وود — کلیه حقوق محفوظ است.
        </div>
      </div>

    </footer>
  );
}

export default Footer;
