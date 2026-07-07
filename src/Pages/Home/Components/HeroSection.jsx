import React from 'react'
import img from '../../../assets/img/wood.jpg'
import banner from '../../../assets/img/banner.png'

function HeroSection() {
  return (
    <section className='flex flex-col justify-center items-center sm:flex-row gap-4 mt-5 px-4'>

      {/* Hero Banner */}
      <article
        className='flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat rounded-xl w-full sm:w-[366px] sm:h-[303px] md:w-[778px] md:h-[352px] min-h-[280px] p-6'
        style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${img})`}}

      >
        <p className='font-bold text-2xl md:text-[28px] text-right leading-tight'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
        </p>

        <p className='font-light text-[11px] md:text-[16px] w-[95%] mt-2 text-right leading-7'>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
          گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
          و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
          کاربردی می باشد.
        </p>

        <button className='rounded-[10px] bg-primary text-text1 text-[13px] w-[108px] h-[35px] mt-3
        sm:w-[137px] sm:h-[34px] md:text-[16px] md:w-[184px] md:h-[38px] md:text-[18px] '>
          لورم ایپسوم
        </button>
      </article>

      {/* Side Boxes */}
      <article className='flex flex-row gap-2 sm:gap-3 shrink-0'>
        <div className='flex flex-col gap-2 sm:gap-3'>
          <div className='w-[170px] h-[180px] sm:w-[120px] sm:h-[145px] md:w-[195px] md:h-[168px] bg-[#D9D9D9] rounded-xl'></div>
          <div className='w-[170px] h-[180px] sm:w-[120px] sm:h-[145px] md:w-[195px] md:h-[168px] bg-[#D9D9D9] rounded-xl overflow-hidden relative'>
            <img src={banner} alt="تصویر بنر" className='w-full h-full object-cover absolute inset-0 rounded-xl' /> {/* تصویر اضافه و استایل داده شد */}
          </div>
        </div>
        <div className='w-[190px] h-[375px] sm:w-[160px] sm:h-[303px] md:w-[210px] md:h-[352px] bg-[#D9D9D9] rounded-xl'></div>
      </article>
    </section>
  )
}

export default HeroSection;