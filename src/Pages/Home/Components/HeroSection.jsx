import React from 'react';
import img from '../../../assets/img/wood.jpg';
import banner from '../../../assets/img/banner.png';
import { ArrowLeft, Leaf, Sparkles } from 'lucide-react';

function HeroSection() {
  return (
    <section className='flex flex-col justify-center items-center sm:flex-row gap-8 mt-5 px-4'>

      {/* Hero Banner - Premium Style */}
      <article
        className='relative flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat rounded-2xl w-full sm:w-[366px] sm:h-[353px] md:w-[778px] md:h-[435px] lg:h-[380px] min-h-[280px] p-6 md:p-8 overflow-hidden shadow-2xl shadow-[#9EAD8C]/20 transition-all duration-500 hover:shadow-[#9EAD8C]/30'
        style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.85)), url(${img})`}}
      >
        {/* Decorative blur elements */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(158, 173, 140, 0.1)' }} />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(138, 154, 123, 0.1)' }} />
        
        {/* Content with relative z-index */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[#9EAD8C]/10 backdrop-blur-sm border border-[#9EAD8C]/20 text-[#8A9A7B] text-[10px] md:text-xs font-medium self-center">
            <Leaf className="w-3.5 h-3.5" />
            <span className='font-bold'>گالری اریس وود</span>
          </div>

          <p className='font-bold text-2xl md:text-[28px] text-center leading-tight text-gray-800'>
            زیبایی و اصالت چوب
            <span className='text-[#8A9A7B] text-center block sm:inline'> را به خانه بیاورید</span>
          </p>

          <p className='font-light text-[11px] md:text-[16px] w-[95%] mt-2 text-right leading-7 text-gray-600'>
            اریس وود با ارائه باکیفیت‌ترین محصولات چوبی طبیعی، از مبلمان کلاسیک و مدرن گرفته تا 
            اکسسوری‌های دکوراتیو، فضای زندگی شما را دگرگون می‌کند. تمامی محصولات ما از چوب‌های 
            مرغوب و با بهترین استانداردهای روز دنیا تولید شده‌اند تا گرما و زیبایی طبیعت را 
            به خانه‌تان هدیه دهند.
          </p>

          <button className='group relative overflow-hidden rounded-xl text-white text-[13px] w-[148px] h-[35px] mt-3
          sm:w-[137px] sm:h-[34px] md:text-[16px] md:w-[184px] md:h-[38px] md:text-[18px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#9EAD8C]/30' 
          style={{ 
            background: 'linear-gradient(135deg, #9EAD8C, #8A9A7B)',
          }}>
            <span className="relative text-sm z-10 flex items-center justify-center gap-2">
              مشاهده محصولات
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </article>

      {/* Side Boxes - Premium Style */}
      <article className='flex flex-row gap-2 sm:gap-3 shrink-0'>
        <div className='flex flex-col gap-2 sm:gap-3'>
          {/* Box 1 - Premium */}
          <div className='relative w-[170px] h-[180px] sm:w-[120px] sm:h-[145px] md:w-[195px] md:h-[168px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group' 
               style={{ background: 'linear-gradient(145deg, #9EAD8C, #8A9A7B)' }}>
            <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                 style={{ backgroundImage: `url(${img})` }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium text-xs mt-1">چوب طبیعی</span>
            </div>
            <div className="absolute inset-1.5 rounded-xl border-2 border-white/30 group-hover:border-white/50 transition-colors duration-300 pointer-events-none" />
          </div>
          
          {/* Box 2 - Banner with Premium Style */}
          <div className='relative w-[170px] h-[180px] sm:w-[120px] sm:h-[145px] md:w-[195px] md:h-[168px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group'>
            <img src={banner} alt="بنر اریس وود" className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute inset-1.5 rounded-xl border-2 border-white/40 group-hover:border-white/60 transition-colors duration-300 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <span className="text-white text-xs font-medium block text-center">مجموعه بهار ۱۴۰۵</span>
            </div>
          </div>
        </div>
        
        {/* Tall Box - Premium */}
        <div className='relative w-[190px] h-[375px] sm:w-[160px] sm:h-[303px] md:w-[180px] md:h-[352px] lg:w-[210px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group' 
             style={{ background: 'linear-gradient(145deg, #9EAD8C, #8A9A7B)' }}>
          
          <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
               style={{ backgroundImage: `url(${img})` }} />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-base">محصولات ویژه</h3>
              <p className="text-white/70 text-xs">چوب گردو و راش</p>
            </div>
            <div className="w-10 h-0.5 rounded-full bg-white/40" />
            <p className="text-white/60 text-[10px] text-center">ضمانت اصالت کالا</p>
          </div>
          
          {/* Triple border effect */}
          <div className="absolute inset-2 rounded-xl border-2 border-white/30 group-hover:border-white/50 transition-colors duration-300 pointer-events-none" />
          <div className="absolute inset-4 rounded-lg border border-white/20 group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
          
          {/* Corner accents */}
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors duration-300" />
          <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors duration-300" />
        </div>
      </article>
    </section>
  )
}

export default HeroSection;