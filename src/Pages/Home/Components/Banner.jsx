import React from 'react';
import img from "../../../assets/img/Banner1.png";

function Banner() {
  return (
    <section className="flex flex-col sm:flex-row gap-4 px-4 py-6">
      <div className="w-full md:w-1/2 h-[160px] sm:h-[234px] md:h-[295px] rounded-xl overflow-hidden flex items-center justify-center">
        <img 
          src={img} 
          alt="Banner Of Eriss Wood"
          className="w-full h-full object-scale-down"
        />
      </div>
      <div className="w-full md:w-1/2 h-[160px] sm:h-[234px] md:h-[295px] rounded-xl overflow-hidden flex items-center justify-center">
        <img 
          src={img} 
          alt="Banner Of Eriss Wood"
          className="w-full h-full object-scale-down"
        />
      </div>
    </section>
  );
}

export default Banner;