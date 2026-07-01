import React from 'react'

function UnderHeader() {
  return (
    <div className="font-light hidden lg:flex justify-between items-center w-full h-[50px] bg-white/5 shadow-xl rounded-b-[7px]">
          <article className="flex justify-between items-center">
              <button className="flex justify-around items-center bg-primary w-[225px] h-[50px] rounded-[10px] mx-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"viewBox="0 0 24 24"> <line x1="3" y1="6" x2="21" y2="6" /> <line x1="3" y1="12" x2="21" y2="12" /> <line x1="3" y1="18" x2="21" y2="18" />
                </svg>

                <p>دسته بندی محصولات</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"> <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                
              </button>

              <ul className="flex justify-between items-center text-[12px] xl:text-[15px] gap-5 text-[#363434]">
                <li className="">فروشگاه</li>
                <li>خرید سازمانی</li>
                <li>درباره ما</li>
                <li>تماس با ما</li>
                <li>وبلاگ</li>
                <li>تخفیفات</li>
              </ul>

          </article>

          <article className="flex justify-between items-center">
            <button className="ml-5 text-white w-[183px] h-[26px] bg-secondary rounded-[7px] h-14 text-[12px] ">سوالی دارید؟ با ما صحبت کنید</button>
            <div className="flex justify-between items-center">
              <p className="text-[15px]">09932762448</p>
              <div className=" w-7 h-7 bg-white rounded-[7px] flex justify-center items-center mx-3 rounded-[50%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" > <path d="M22 16.92v3a2 2 0 0 1-2.18 2  19.79 19.79 0 0 1-8.63-3.07  19.5 19.5 0 0 1-6-6  19.79 19.79 0 0 1-3.07-8.67  A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2  1.72 12.84 12.84 0 0 0 .7 2.81  2 2 0 0 1-.45 2.11L8.09 9.91  a16 16 0 0 0 6 6l.99-1.27  a2 2 0 0 1 2.11-.45  12.84 12.84 0 0 0 2.81.7  A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
            </div>
          </article>
      </div>
  )
}

export default UnderHeader