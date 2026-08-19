import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Copy,
  CreditCard,
  FileText,
  Hash,
  Headphones,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
  ExternalLink,
  Phone,
  X,
} from "lucide-react";

// ============================================
// Toast Notification Component
// ============================================
const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-5 py-3.5 shadow-xl shadow-emerald-200/50 border border-emerald-200 backdrop-blur-sm">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-800">{message}</p>
          <p className="text-[11px] text-emerald-600">کد با موفقیت کپی شد</p>
        </div>
        <button
          onClick={onClose}
          className="mr-2 rounded-lg p-1 text-emerald-400 transition hover:bg-emerald-100 hover:text-emerald-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// ============================================
// Call Modal Component
// ============================================
const CallModal = ({ isOpen, onClose, onCall }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-in zoom-in-95 duration-200">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/30">
            {/* Decorative */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-100/50 blur-2xl" />

            <div className="relative p-6">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <Headphones className="h-8 w-8" />
                </div>

                <h3 className="mt-4 text-xl font-black text-slate-900">
                  تماس با پشتیبانی
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  آیا مایل به تماس با پشتیبانی هستید؟
                </p>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-center">
                  <p className="text-xs text-slate-400">شماره تماس پشتیبانی</p>
                  <p dir="ltr" className="mt-1 text-lg font-black text-slate-900">
                    ۰۹۹۳۲۷۶۲۴۴۸
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    انصراف
                  </button>

                  <button
                    onClick={onCall}
                    className="flex-1 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 active:scale-95"
                  >
                    <Phone className="ml-2 inline h-4 w-4" />
                    زنگ بزن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// Section Components
// ============================================
const SectionCard = ({
  icon: Icon,
  title,
  eyebrow,
  children,
  className = "",
}) => {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_14px_40px_-28px_rgba(15,23,42,.5)] ${className}`}
    >
      <div className="pointer-events-none absolute -left-10 -top-12 h-28 w-28 rounded-full bg-sky-100/50 blur-2xl" />

      <div className="relative flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        <div>
          {eyebrow && (
            <p className="mb-0.5 text-[10px] font-bold tracking-widest text-slate-400">
              {eyebrow}
            </p>
          )}

          <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
        </div>
      </div>

      <div className="relative p-4 sm:p-6">{children}</div>
    </section>
  );
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
  valueClassName = "",
}) => {
  return (
    <div className="group flex min-w-0 items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition hover:border-slate-200 hover:bg-white hover:shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200/80 group-hover:text-slate-900">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-slate-400">{label}</p>

        <p
          className={`mt-1 break-words text-xs font-bold leading-6 text-slate-800 ${valueClassName}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, strong = false }) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-2.5 ${
        strong ? "mt-2 border-t border-dashed border-slate-200 pt-4" : ""
      }`}
    >
      <span
        className={
          strong
            ? "text-sm font-extrabold text-slate-900"
            : "text-xs text-slate-500"
        }
      >
        {label}
      </span>

      <span
        dir="ltr"
        className={
          strong
            ? "text-base font-black text-slate-900"
            : "text-sm font-bold text-slate-700"
        }
      >
        {value}
      </span>
    </div>
  );
};

const StatusBadge = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-extrabold text-emerald-700 ring-1 ring-inset ring-emerald-200">
      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
};

const ProductThumbnail = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner sm:h-28 sm:w-28">
      {hasError ? (
        <Package
          className="h-10 w-10 text-slate-400"
          aria-label="تصویر محصول موجود نیست"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      )}
    </div>
  );
};

const ActionButton = ({
  icon: Icon,
  children,
  primary = false,
  onClick,
  title,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title || children}
      className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl px-3 text-xs font-extrabold transition focus:outline-none focus:ring-4 focus:ring-slate-300 active:scale-[.98] ${
        primary
          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800"
          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </button>
  );
};

// ============================================
// Main Component
// ============================================
const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [showToast, setShowToast] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  const orderData = {
    id: id || "61",
    status: "تکمیل شده",
    date: "۱۴۰۵ مرداد ۱۳",
    time: "۲۰:۰۸",

    customer: {
      name: "حسام",
      email: "hsammhmdy940@gmail.com",
      address:
        "ایران، سنندج، دیواندره / کد پستی: ۹۱۷۷۷۶۹۹۹۳۳",
      shippingDate: "۲۰ مرداد ۱۴۰۵ ساعت ۲۱:۰۸",
      shippingStatus: "تحویل شده",
    },

    payment: {
      method: "زیبال",
      date: "۱۳ مرداد ۱۴۰۵ ساعت ۲۰:۰۸",
      status: "موفق",
    },

    product: {
      name: "آیفون ۱۳ پرو مکس",
      color: "مشکی",
      price: "$445.00",
      quantity: 2,
      total: "$890.00",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    },

    summary: {
      subtotal: "$890.00",
      shipping: "$0.00",
      tax: "$109.47",
      total: "$1444.47",
    },

    trackingCode: "IR-PT-9876-5432-1234",
    supportPhone: "09932762448",
    trackingUrl: "https://tracking.post.ir",
  };

  // ========== Toast Handlers ==========
  const copyTrackingCode = async () => {
    try {
      await navigator.clipboard.writeText(orderData.trackingCode);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = orderData.trackingCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  // ========== Call Handlers ==========
  const handleOpenCallModal = () => {
    setShowCallModal(true);
  };

  const handleCloseCallModal = () => {
    setShowCallModal(false);
  };

  const handleMakeCall = () => {
    // باز کردن صفحه تماس گوشی
    window.location.href = `tel:${orderData.supportPhone}`;
    setShowCallModal(false);
  };

  // ========== Tracking Handlers ==========
  const handleTrackOrder = () => {
    // باز کردن لینک پیگیری در تب جدید
    window.open(orderData.trackingUrl, "_blank");
  };

  return (
    <>
      {/* Toast Notification */}
      <Toast
        message="کد رهگیری پستی شما با موفقیت کپی شد"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Call Modal */}
      <CallModal
        isOpen={showCallModal}
        onClose={handleCloseCallModal}
        onCall={handleMakeCall}
      />

      <main
        dir="rtl"
        className="min-h-screen bg-slate-100 px-4 py-5 text-slate-900 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="mx-auto max-w-7xl">
          <header className="relative mb-6 overflow-hidden rounded-3xl bg-slate-900 px-5 py-6 text-white shadow-2xl shadow-slate-900/15 sm:px-8">
            <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  title="بازگشت به صفحه قبل"
                  aria-label="بازگشت به صفحه قبل"
                  className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  <ArrowLeft className="h-4 w-4" />
                  بازگشت
                </button>

                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="text-xs text-slate-400">
                    داشبورد
                    <ChevronLeft className="mx-1 inline h-3 w-3" />
                    سفارش‌ها
                  </span>

                  <StatusBadge>{orderData.status}</StatusBadge>
                </div>

                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                  جزئیات سفارش{" "}
                  <span dir="ltr" className="text-sky-300">
                    #{orderData.id}
                  </span>
                </h1>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm sm:min-w-52">
                <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                  <FileText className="h-4 w-4" />
                  زمان ثبت سفارش
                </div>

                <p className="text-sm font-bold">{orderData.date}</p>

                <p dir="ltr" className="mt-1 text-xs text-slate-300">
                  {orderData.time}
                </p>
              </div>
            </div>
          </header>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <SectionCard
                icon={Truck}
                eyebrow="DELIVERY INFORMATION"
                title="اطلاعات ارسال"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoItem
                    icon={UserRound}
                    label="نام مشتری"
                    value={orderData.customer.name}
                  />

                  <InfoItem
                    icon={Mail}
                    label="ایمیل"
                    value={orderData.customer.email}
                    valueClassName="truncate"
                  />

                  <div className="sm:col-span-2">
                    <InfoItem
                      icon={MapPin}
                      label="آدرس تحویل"
                      value={orderData.customer.address}
                    />
                  </div>

                  <InfoItem
                    icon={CalendarDays}
                    label="تاریخ ارسال"
                    value={orderData.customer.shippingDate}
                  />

                  <InfoItem
                    icon={CheckCircle2}
                    label="وضعیت ارسال"
                    value={orderData.customer.shippingStatus}
                    valueClassName="text-emerald-600"
                  />
                </div>
              </SectionCard>

              <SectionCard
                icon={CreditCard}
                eyebrow="SECURE PAYMENT"
                title="روش پرداخت"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoItem
                    icon={CreditCard}
                    label="روش پرداخت"
                    value={orderData.payment.method}
                  />

                  <InfoItem
                    icon={CalendarDays}
                    label="تاریخ پرداخت"
                    value={orderData.payment.date}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <div>
                    <p className="text-[11px] font-medium text-emerald-700/70">
                      وضعیت تراکنش
                    </p>

                    <StatusBadge>{orderData.payment.status}</StatusBadge>
                  </div>

                  <ShieldCheck className="h-8 w-8 text-emerald-500" />
                </div>
              </SectionCard>

              <SectionCard
                icon={ShoppingBag}
                eyebrow="ORDER ITEMS"
                title="محصول سفارش داده‌شده"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ProductThumbnail
                    src={orderData.product.image}
                    alt={orderData.product.name}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-black">
                          {orderData.product.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          رنگ:{" "}
                          <b className="text-slate-700">
                            {orderData.product.color}
                          </b>
                        </p>
                      </div>

                      <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        تعداد: {orderData.product.quantity}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <span
                        dir="ltr"
                        className="text-sm font-bold text-slate-500"
                      >
                        {orderData.product.price} ×{" "}
                        {orderData.product.quantity}
                      </span>

                      <span
                        dir="ltr"
                        className="text-lg font-black text-emerald-600"
                      >
                        {orderData.product.total}
                      </span>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-6">
              <SectionCard
                icon={FileText}
                eyebrow="PAYMENT SUMMARY"
                title="خلاصه سفارش"
              >
                <SummaryRow
                  label="مبلغ کالا"
                  value={orderData.summary.subtotal}
                />

                <SummaryRow
                  label="هزینه ارسال"
                  value={orderData.summary.shipping}
                />

                <SummaryRow label="مالیات" value={orderData.summary.tax} />

                <SummaryRow
                  label="مجموع نهایی"
                  value={orderData.summary.total}
                  strong
                />

                {/* ========== کد رهگیری پست ========== */}
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-sky-50 p-4 border border-sky-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 shadow-sm">
                    <Truck className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <p className="text-[11px] font-medium text-sky-600">
                      کد رهگیری پست
                    </p>

                    <p dir="ltr" className="mt-1 text-sm font-black text-slate-900">
                      {orderData.trackingCode}
                    </p>
                  </div>

                  <button
                    type="button"
                    title="کپی کد رهگیری"
                    aria-label="کپی کد رهگیری"
                    onClick={copyTrackingCode}
                    className="rounded-lg p-2 text-sky-500 hover:bg-white hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 flex gap-3">
                  {/* ========== دکمه پیگیری ========== */}
                  <ActionButton
                    icon={ExternalLink}
                    primary
                    title="پیگیری سفارش"
                    onClick={handleTrackOrder}
                  >
                    پیگیری سفارش
                  </ActionButton>

                  {/* ========== دکمه پشتیبانی ========== */}
                  <ActionButton
                    icon={Headphones}
                    title="تماس با پشتیبانی"
                    onClick={handleOpenCallModal}
                  >
                    پشتیبانی
                  </ActionButton>
                </div>

                {/* ========== لینک کمکی پیگیری ========== */}
                <button
                  onClick={handleTrackOrder}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 text-xs font-bold text-sky-600 transition hover:bg-sky-100"
                >
                  <ExternalLink className="h-4 w-4" />
                  وارد سایت پست شوید و سفارش خود را پیگیری کنید
                </button>
              </SectionCard>

              <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                    <Headphones className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold">
                      به کمک نیاز دارید؟
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      تیم پشتیبانی در کنار شماست.
                    </p>

                    <button
                      onClick={handleOpenCallModal}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {orderData.supportPhone}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default Order;