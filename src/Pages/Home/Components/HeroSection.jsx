import React from 'react'
import img from '../../../assets/img/wood.jpg'
import banner from '../../../assets/img/banner.png'

function HeroSection() {
  return (
    <section className='flex flex-col justify-center items-center sm:flex-row gap-4 mt-5 px-4 max-w-[1280px] mx-auto'>

      {/* بنر اصلی هیرو با گرادیانت روی بکگراند */}
      <article
        className='flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat rounded-xl w-full sm:w-[366px] sm:h-[303px] md:w-[778px] md:h-[352px] min-h-[280px] p-6 border border-[var(--color-border)]'
        style={{backgroundImage: `linear-gradient(rgba(243, 235, 221, 0.75), rgba(243, 235, 221, 0.75)), url(${img})`}}
      >
        <p className='font-extrabold text-2xl md:text-[28px] text-right leading-tight text-[var(--color-text)]'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
        </p>

        <p className='font-light text-[11px] md:text-[15px] w-[95%] mt-3 text-right leading-7 text-[var(--color-text-muted)]'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
          گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
          و برای شرایط فعلی تکنولوژی مورد نیاز.
        </p>

        <button className='rounded-[10px] bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold w-[120px] h-[34px] sm:w-[150px] sm:h-[38px] md:w-[180px] md:h-[42px] mt-4 transition-all duration-300 shadow-sm'>
          لورم ایپسوم
        </button>
      </article>

      {/* ساید باکس‌ها */}
      <article className='flex flex-row gap-2 sm:gap-3 shrink-0'>
        <div className='flex flex-col gap-2 sm:gap-3'>
          {/* باکس بالا راست */}
          <div className='w-[170px] h-[180px] sm:w-[120px] sm:h-[145px] md:w-[195px] md:h-[168px] bg-[var(--color-sixeth)] border border-[var(--color-border)] rounded-xl'></div>
          {/* باکس پایین راست دارای تصویر */}
          <div className='w-[170px] h-[180px] sm:w-[120px] sm:h-[145px] md:w-[195px] md:h-[168px] bg-[var(--color-sixeth)] border border-[var(--color-border)] rounded-xl overflow-hidden relative'>
            <img src={banner} alt="تصویر بنر" className='w-full h-full object-cover absolute inset-0 rounded-xl' />
          </div>
        </div>
        
        {/* باکس طولی سمت چپ */}
        <div className='w-[190px] h-[375px] sm:w-[160px] sm:h-[303px] md:w-[210px] md:h-[352px] bg-[var(--color-sixeth)] border border-[var(--color-border)] rounded-xl'></div>
      </article>
    </section>
  )
}

export default HeroSection;
