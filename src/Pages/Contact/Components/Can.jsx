import React, { useState } from "react";

const Can = () => {
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.family && formData.email && formData.message) {
      console.log("فرم ارسال شد:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          family: "",
          email: "",
          message: "",
        });
      }, 3000);
    }
  };

  const contactCards = [
    {
      title: "شماره تلفن",
      value: "0993 276 2448",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: "آدرس ایمیل",
      value: "ErissWood@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "شبکه‌های مجازی",
      value: "@Eriss_Wood",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.5 2.7 4 5.8 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.8-4-9s1.5-6.3 4-9z" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "ارسال سریع",
      desc: "توسط پیک و باربری",
      emoji: "🚚",
    },
    {
      title: "پرداخت ایمن",
      desc: "درگاه‌های معتبر",
      emoji: "🔒",
    },
    {
      title: "ضمانت کیفیت",
      desc: "بالاترین متریال",
      emoji: "⭐",
    },
    {
      title: "پشتیبانی فوق‌سریع",
      desc: "تلفنی و آنلاین",
      emoji: "🎧",
    },
  ];

  const footerLinks = [
    {
      title: "شرکت اریس",
      links: ["تماس با ما", "درباره ما", "حریم خصوصی", "مجله اریس"],
    },
    {
      title: "دسته‌های پرطرفدار",
      links: ["محصولات چوبی", "محصولات پتینه", "قفسه و شلف", "دکوراسیون"],
    },
    {
      title: "خدمات مشتریان",
      links: ["سوالات متداول", "راهنمای خرید", "راهنمای پرداخت", "مرجوعی و پشتیبانی"],
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f4ef] text-[#1a1a1a] font-sans antialiased">

      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7a8b6e] via-[#a4b496] to-[#b8c9a3] pt-12 pb-28 sm:pt-16 sm:pb-32">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>
        
        {/* Floating dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-5 py-1.5 text-xs font-semibold backdrop-blur-sm shadow-lg sm:px-6 sm:text-sm">
            📬 ارتباط با ما
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            با تیم پشتیبانی ما در ارتباط باشید
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/92 sm:text-base md:text-lg">
            برای دریافت مشاوره، پیگیری سفارش یا هر سوالی که دارید، از طریق فرم زیر
            یا راه‌های ارتباطی با ما در تماس باشید. هدف ما ایجاد تجربه‌ای سریع،
            شفاف و دلنشین برای شماست.
          </p>

          {/* Scroll indicator */}
          <div className="mt-8 flex justify-center animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </div>

        {/* Wave shape at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="#f5f4ef" />
          </svg>
        </div>
      </section>

      {/* ====== CONTACT CARDS ====== */}
      <section className="relative z-20 mx-auto -mt-12 max-w-6xl px-4 sm:-mt-16 sm:px-6 lg:px-8">
        <div className="grid gap-3 md:grid-cols-3">
          {contactCards.map((card, index) => (
            <div
              key={card.title}
              className="group flex items-center gap-3 rounded-3xl bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a3b18a] to-[#7a8b6e] text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                {card.icon}
              </div>

              <div className="min-w-0 text-right">
                <p className="text-[10px] font-medium tracking-wider text-[#6b7280] uppercase sm:text-xs">
                  {card.title}
                </p>
                <p className="mt-0.5 truncate text-sm font-bold text-[#1f2937] sm:text-base" dir="ltr">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <section className="mx-auto mt-8 max-w-6xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          
          {/* ====== FORM ====== */}
          <div className="rounded-3xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-8">
            <div className="relative mb-8 flex items-center justify-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8d8cf] to-transparent" />
              <h2 className="relative mx-4 bg-white px-3 text-base font-bold text-[#374151] sm:text-xl">
                📝 فرم ارتباط با ما
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8d8cf] to-transparent" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    نام
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="نام شما"
                    className="w-full rounded-xl border-2 border-[#e7e3d8] bg-[#fafaf8] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#a3b18a] focus:ring-4 focus:ring-[#a3b18a]/15 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                    placeholder="نام خانوادگی"
                    className="w-full rounded-xl border-2 border-[#e7e3d8] bg-[#fafaf8] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#a3b18a] focus:ring-4 focus:ring-[#a3b18a]/15 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  آدرس ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border-2 border-[#e7e3d8] bg-[#fafaf8] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#a3b18a] focus:ring-4 focus:ring-[#a3b18a]/15 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  پیام شما
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="چطور می‌تونیم کمکتون کنیم؟"
                  className="w-full rounded-xl border-2 border-[#e7e3d8] bg-[#fafaf8] px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#a3b18a] focus:ring-4 focus:ring-[#a3b18a]/15 focus:bg-white resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] ${
                  isSubmitted
                    ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30"
                    : "bg-gradient-to-r from-[#a3b18a] to-[#7a8b6e] shadow-lg shadow-[#a3b18a]/30 hover:shadow-xl hover:shadow-[#a3b18a]/40 hover:from-[#8e9c81] hover:to-[#6a7b5e]"
                }`}
              >
                {isSubmitted ? "✅ پیام شما با موفقیت ثبت شد!" : "📤 ثبت سوال"}
              </button>

              {isSubmitted && (
                <p className="text-center text-sm text-green-600 font-medium animate-pulse">
                  🌿 به زودی با شما تماس می‌گیریم
                </p>
              )}
            </form>
          </div>

          {/* ====== SIDEBAR ====== */}
          <div className="space-y-6">
            {/* Features */}
            <div className="rounded-3xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-7">
              <h3 className="text-lg font-bold text-[#374151] mb-4 text-center border-b border-[#e7e3d8] pb-3">
                ✨ مزایای اریس وود
              </h3>
              <div className="space-y-3">
                {features.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-xl bg-[#f8f7f2] p-3 transition-all duration-200 hover:bg-[#f0eee8] hover:shadow-md group"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#a3b18a]/20 to-[#7a8b6e]/10 text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </div>
                    <div className="min-w-0 text-right">
                      <h4 className="text-sm font-bold text-[#1f2937]">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-[#6b7280]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ====== TRUST BADGE ====== */}
                <div className="rounded-3xl bg-gradient-to-br from-[#7a8b6e] to-[#a4b496] p-5 text-white shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-lg">
                    🏆
                    </div>
                    <div>
                    <h3 className="text-base font-bold">چرا اریس وود؟</h3>
                    </div>
                </div>

                <p className="text-xs leading-relaxed text-white/90 mb-3">
                    ما روی کیفیت ساخت، پاسخ‌گویی سریع و تجربه خرید ساده تمرکز داریم تا
                    ارتباط شما با برند، حرفه‌ای و قابل اعتماد باشد.
                </p>

                <div className="flex gap-2">
                    <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-white/70 mb-0.5">
                        <span>کیفیت</span>
                        <span>۹۸٪</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-white/80 rounded-full"></div>
                    </div>
                    </div>
                    <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-white/70 mb-0.5">
                        <span>رضایت</span>
                        <span>۹۵٪</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-[95%] bg-white/80 rounded-full"></div>
                    </div>
                    </div>
                    <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-white/70 mb-0.5">
                        <span>سرعت</span>
                        <span>۹۲٪</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-white/80 rounded-full"></div>
                    </div>
                    </div>
                </div>
                </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Can;