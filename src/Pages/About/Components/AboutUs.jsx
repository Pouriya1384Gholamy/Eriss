import React, { useState } from 'react';
import {
  FaAward, FaShieldAlt, FaTruck, FaHeadphones,
  FaUsers, FaHeart, FaStar, FaLeaf, FaClock,
  FaInstagram, FaTwitter, FaYoutube,
  FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaCalendarAlt, FaQuoteRight, FaLightbulb, FaPalette, FaTrophy,
  FaRegClock, FaCheckCircle
} from 'react-icons/fa';

const accent = {
  base: '#8A9A7B',
  dark: '#6B7D5E',
  light: '#D4DCC9',
  bg: 'rgba(138,154,123,0.10)',
  bgHover: 'rgba(138,154,123,0.20)',
};

const stats = [
  { icon: FaUsers, value: '+۱۵۰۰', label: 'مشتری راضی' },
  { icon: FaStar, value: '۴.۹', label: 'میانگین امتیاز' },
  { icon: FaAward, value: '+۲۰۰', label: 'محصول منحصربه‌فرد' },
  { icon: FaClock, value: '۷ سال', label: 'تجربه درخشان' },
];

const features = [
  { icon: FaShieldAlt, title: 'ضمانت اصالت کالا', desc: 'همه محصولات با ضمانت اصالت ارائه می‌شوند.' },
  { icon: FaTruck, title: 'ارسال سریع', desc: 'تحویل سفارشات در کمترین زمان ممکن.' },
  { icon: FaHeadphones, title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی همیشه پاسخگوی شماست.' },
  { icon: FaLeaf, title: 'محصولات باکیفیت', desc: 'استفاده از بهترین متریال‌های روز دنیا.' },
  { icon: FaHeart, title: 'رضایت مشتری', desc: 'اولویت اول ما، رضایت شماست.' },
  { icon: FaAward, title: 'کیفیت برتر', desc: 'استانداردهای جهانی در تولید محصولات.' },
];

const team = [
  { name: 'علی رضایی', role: 'مدیرعامل و بنیان‌گذار', initials: 'ع‌ر' },
  { name: 'سارا محمدی', role: 'مدیر طراحی', initials: 'س‌م' },
  { name: 'رضا کریمی', role: 'مدیر فروش', initials: 'ر‌ک' },
  { name: 'مریم حسینی', role: 'مدیر تولید', initials: 'م‌ح' },
];

const timeline = [
  { year: '۱۳۹۶', title: 'تاسیس اریس گالری', desc: 'شروع فعالیت با هدف ارائه محصولات چوبی باکیفیت' },
  { year: '۱۳۹۸', title: 'توسعه تیم حرفه‌ای', desc: 'افزایش تیم طراحی و تولید به بیش از ۲۰ نفر' },
  { year: '۱۴۰۰', title: 'افتتاح شعبه جدید', desc: 'گشایش اولین شعبه حضوری در تهران' },
  { year: '۱۴۰۲', title: 'دریافت نشان‌های بین‌المللی', desc: 'اخذ گواهینامه‌های کیفیت از مراجع معتبر' },
];

const contactInfo = [
  { icon: FaMapMarkerAlt, label: 'آدرس', value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳' },
  { icon: FaPhone, label: 'تلفن', value: '۰۲۱-۱۲۳۴۵۶۷۸' },
  { icon: FaEnvelope, label: 'ایمیل', value: 'info@erisswood.com' },
  { icon: FaCalendarAlt, label: 'ساعت کاری', value: 'شنبه تا پنج‌شنبه ۹:۰۰ - ۲۰:۰۰' },
];

const AboutUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'نام الزامی است';
    if (!form.email.trim()) e.email = 'ایمیل الزامی است';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'ایمیل معتبر نیست';
    if (!form.message.trim()) e.message = 'پیام الزامی است';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) { setErrors(errors); return; }
    setSent(true);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
      setErrors(er => { const n = { ...er }; delete n[key]; return n; });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 font-sans" dir="rtl">

      {/* ===== HERO SECTION WITH GRADIENT BACKGROUND ===== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#8A9A7B] via-[#9EAD8C] to-[#6B7D5E]">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-right flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <FaQuoteRight className="w-3.5 h-3.5 text-white/80" />
                <span className="text-white/90 text-xs md:text-sm font-medium">درباره ما</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                درباره <span className="text-white/90">اریس گالری</span>
              </h1>
              
              <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto md:mx-0 mt-3 leading-relaxed">
                جایی که هنر و کیفیت در کنار هم قرار می‌گیرند
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <FaRegClock className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-white/80 text-xs font-medium">۷ سال تجربه</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <FaCheckCircle className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-white/80 text-xs font-medium">۱۵۰۰+ مشتری</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <FaAward className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-white/80 text-xs font-medium">۲۰۰+ محصول</span>
                </div>
              </div>
            </div>

            {/* Hero Stats Cards */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 text-center border border-white/20 min-w-[80px] hover:bg-white/20 transition-all duration-300">
                <div className="text-xl md:text-2xl font-bold text-white">+۱۵۰۰</div>
                <div className="text-[10px] text-white/60">مشتری</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 text-center border border-white/20 min-w-[80px] hover:bg-white/20 transition-all duration-300">
                <div className="text-xl md:text-2xl font-bold text-white">۴.۹</div>
                <div className="text-[10px] text-white/60">امتیاز</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 text-center border border-white/20 min-w-[80px] hover:bg-white/20 transition-all duration-300">
                <div className="text-xl md:text-2xl font-bold text-white">+۲۰۰</div>
                <div className="text-[10px] text-white/60">محصول</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative z-10">
          <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              fill="#fafbf9"
              d="M0,40 C360,80 720,20 1080,60 L1440,40 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* ===== STORY SECTION - WITH REACT ICONS ===== */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100/80 p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: accent.bg, color: accent.dark }}>
                <FaQuoteRight className="inline w-3 h-3 ml-1" />
                داستان ما
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3 leading-snug">
                از یک ایده تا یک <span style={{ color: accent.base }}>برند معتبر</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute right-0 top-0 bottom-0 w-0.5 hidden md:block" style={{ background: accent.bg }} />
              
              <div className="space-y-6 pr-0 md:pr-6">
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" style={{ background: accent.bg }}>
                    <FaLightbulb className="w-4 h-4" style={{ color: accent.base }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">ایده‌ای برای تغییر</h3>
                    <p className="text-gray-500 text-sm leading-7">
                      اریس گالری در سال ۱۳۹۶ با یک ایده ساده متولد شد: 
                      <span className="text-gray-700 font-medium"> ارائه محصولات چوبی با کیفیت و طراحی منحصربه‌فرد</span> 
                      که بتواند نیازهای واقعی مشتریان را برآورده کند.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" style={{ background: accent.bg }}>
                    <FaPalette className="w-4 h-4" style={{ color: accent.base }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">هنر در دل چوب</h3>
                    <p className="text-gray-500 text-sm leading-7">
                      ما معتقدیم هر قطعه چوب داستانی برای گفتن دارد. 
                      <span className="text-gray-700 font-medium"> هنر و خلاقیت</span> 
                      را با متریال‌های باکیفیت ترکیب می‌کنیم تا محصولاتی خلق کنیم که 
                      <span className="text-gray-700 font-medium"> زیبایی و کارایی</span> را به زندگی شما می‌آورند.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" style={{ background: accent.bg }}>
                    <FaTrophy className="w-4 h-4" style={{ color: accent.base }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">از یک تیم کوچک تا یک برند معتبر</h3>
                    <p className="text-gray-500 text-sm leading-7">
                      امروز اریس گالری به یکی از 
                      <span className="text-gray-700 font-medium"> معتبرترین برندهای حوزه مبلمان و دکوراسیون داخلی</span> 
                      تبدیل شده و مفتخریم با تیمی حرفه‌ای، بهترین‌ها را به مشتریان عزیزمان ارائه دهیم.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl border border-gray-100/80 relative overflow-hidden" style={{ background: accent.bg }}>
                <div className="absolute top-0 right-0 text-6xl opacity-5" style={{ color: accent.base }}>
                  <FaQuoteRight className="w-12 h-12" />
                </div>
                <div className="absolute bottom-0 left-0 text-6xl opacity-5" style={{ color: accent.base }}>
                  <FaQuoteRight className="w-12 h-12 transform rotate-180" />
                </div>
                <p className="relative z-10 text-center text-sm font-medium leading-relaxed" style={{ color: accent.dark }}>
                  "ما با عشق و تعهد، هنر را در دل چوب جاری می‌کنیم تا خانه‌های شما گرم‌تر و زیباتر شوند."
                </p>
                <p className="relative z-10 text-center text-xs mt-2 font-semibold" style={{ color: accent.dark }}>
                  — تیم اریس گالری
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100/80 shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" style={{ background: accent.bg }}>
                <Icon className="w-5 h-5" style={{ color: accent.base }} />
              </div>
              <div className="text-2xl font-bold text-gray-800">{value}</div>
              <div className="text-xs text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </section>

        {/* ===== FEATURES ===== */}
        <section>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-3" style={{ background: accent.bg, color: accent.dark }}>
              ویژگی‌های ما
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">چرا <span style={{ color: accent.base }}>اریس گالری</span>؟</h2>
            <p className="text-gray-400 text-sm mt-2">شش دلیل برای انتخاب ما</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100/80 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: accent.bg }}>
                  <Icon className="w-5 h-5" style={{ color: accent.base }} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{title}</h3>
                <p className="text-xs text-gray-400 leading-6">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== TIMELINE - HIDDEN BELOW 768px ===== */}
        <section className="hidden md:block">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-3" style={{ background: accent.bg, color: accent.dark }}>
              مسیر ما
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">مسیر <span style={{ color: accent.base }}>موفقیت</span></h2>
            <p className="text-gray-400 text-sm mt-2">از آغاز تا امروز</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5" style={{ background: accent.bg }} />

            <div className="space-y-8">
              {timeline.map(({ year, title, desc }, i) => {
                const isRight = i % 2 === 0;
                return (
                  <div key={i} className="relative flex flex-col md:flex-row items-center gap-4">
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white z-10 shadow-md" style={{ background: accent.base }} />

                    <div className={`md:w-1/2 md:pl-8 ${isRight ? '' : 'md:invisible'}`}>
                      {isRight && <TimelineCard year={year} title={title} desc={desc} />}
                    </div>

                    <div className={`md:w-1/2 md:pr-8 ${!isRight ? '' : 'md:invisible'}`}>
                      {!isRight && <TimelineCard year={year} title={title} desc={desc} />}
                    </div>

                    <div className="md:hidden w-full">
                      <TimelineCard year={year} title={title} desc={desc} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== TEAM ===== */}
        <section>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-3" style={{ background: accent.bg, color: accent.dark }}>
              تیم ما
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">با <span style={{ color: accent.base }}>تیم</span> ما آشنا شوید</h2>
            <p className="text-gray-400 text-sm mt-2">افرادی که پشت صحنه اریس گالری هستند</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map(({ name, role, initials }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100/80 shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform duration-300" style={{ background: `linear-gradient(135deg, ${accent.base}, ${accent.dark})` }}>
                  {initials}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{name}</h3>
                <p className="text-xs text-gray-400 mb-3">{role}</p>
                <div className="flex justify-center gap-2">
                  {[FaLinkedinIn, FaInstagram].map((Icon, j) => (
                    <a key={j} href="#" className="p-2 rounded-full transition-all hover:scale-110 duration-200" style={{ background: accent.bg }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: accent.base }} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CONTACT SECTION - ROW ON SM AND ABOVE ===== */}
        <section className="bg-white rounded-3xl border border-gray-100/80 shadow-xl p-6 md:p-8 lg:p-12 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10">
            
            {/* ===== LEFT SIDE ===== */}
            <div className="sm:w-1/2">
              <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-3" style={{ background: accent.bg, color: accent.dark }}>
                ارتباط با ما
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                با ما در <span style={{ color: accent.base }}>ارتباط</span> باشید
              </h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                آماده شنیدن نظرات، پیشنهادات و سوالات شما هستیم.
              </p>
              
              <div className="space-y-3 md:space-y-4">
                {contactInfo.map(({ icon: Icon, label, value }, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 md:gap-4 group p-2 md:p-3 rounded-xl hover:bg-gray-50/80 transition-all duration-300"
                  >
                    <div 
                      className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" 
                      style={{ background: accent.bg }}
                    >
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: accent.base }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="text-xs md:text-sm font-medium text-gray-700 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100">
                {[FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="p-2 md:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md" 
                    style={{ background: accent.bg }}
                  >
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: accent.base }} />
                  </a>
                ))}
              </div>
            </div>

            {/* ===== RIGHT SIDE - FORM ===== */}
            <div className="sm:w-1/2 mt-4 sm:mt-0">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center gap-3 md:gap-4 py-10 md:py-12 px-4">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg" 
                    style={{ background: accent.bg }}
                  >
                    <FaCheckCircle className="w-7 h-7 md:w-8 md:h-8" style={{ color: accent.base }} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-base md:text-lg">پیام شما ارسال شد!</p>
                    <p className="text-xs text-gray-400 mt-1">به زودی با شما تماس می‌گیریم.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3 md:space-y-4">
                  {[
                    { key: 'name', label: 'نام کامل', type: 'text', placeholder: 'نام و نام خانوادگی' },
                    { key: 'email', label: 'ایمیل', type: 'email', placeholder: 'ایمیل شما' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        {label}
                        <span className="text-red-400 mr-0.5">*</span>
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        {...field(key)}
                        className={`w-full px-4 py-2.5 md:py-3 text-sm rounded-xl border-2 outline-none transition-all duration-300 ${
                          errors[key] 
                            ? 'border-red-400 focus:border-red-400' 
                            : 'border-gray-200 focus:border-[#8A9A7B] focus:shadow-md'
                        }`}
                      />
                      {errors[key] && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      پیام
                      <span className="text-red-400 mr-0.5">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="پیام شما"
                      {...field('message')}
                      className={`w-full px-4 py-2.5 md:py-3 text-sm rounded-xl border-2 outline-none transition-all duration-300 resize-none ${
                        errors.message 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 focus:border-[#8A9A7B] focus:shadow-md'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 md:py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[.98] hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${accent.base}, ${accent.dark})` }}
                  >
                    ارسال پیام
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

const TimelineCard = ({ year, title, desc }) => (
  <div className="relative bg-white rounded-2xl border border-gray-100/80 shadow-md p-5 w-full hover:shadow-xl transition-shadow duration-300">
    <span className="absolute top-4 left-4 text-xs font-bold text-white px-3 py-0.5 rounded-full shadow-sm" style={{ background: '#8A9A7B' }}>
      {year}
    </span>
    <h3 className="font-bold text-gray-800 text-sm mb-1 mr-16">{title}</h3>
    <p className="text-xs text-gray-400 leading-6 mr-16">{desc}</p>
  </div>
);

export default AboutUs;