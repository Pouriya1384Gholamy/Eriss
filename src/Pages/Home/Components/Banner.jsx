import React from 'react';
import img from "../../../assets/img/Banner1.jpg";

function Banner() {
  return (
    <section className="flex flex-col sm:flex-row gap-12 px-4 py-6 w-[95%] my-5 max-w-5xl mx-auto">
      <div className="w-full sm:w-1/2 rounded-xl overflow-hidden">
        <img 
          src={img} 
          alt="Banner Of Eriss Wood 1"
          className="w-full h-auto"
        />
      </div>
      <div className="w-full sm:w-1/2 rounded-xl overflow-hidden">
        <img 
          src={img} 
          alt="Banner Of Eriss Wood 2"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}

export default Banner;