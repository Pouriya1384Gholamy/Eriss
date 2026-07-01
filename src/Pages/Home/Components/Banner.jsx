import React from 'react'

function Banner() {
  return (
    <section className="flex flex-col sm:flex-row gap-4 px-4 py-6">
      <div className="w-full h-[130px] sm:w-1/2 sm:h-[194px] md:h-[235px] h-[140px] bg-gray-200 rounded-xl"></div>
      <div className="w-full h-[130px] sm:w-1/2 sm:h-[194px] md:h-[235px] h-[140px] bg-gray-200 rounded-xl"></div>
    </section>
  );
}

export default Banner;
