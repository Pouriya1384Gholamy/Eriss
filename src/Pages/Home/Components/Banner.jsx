import React from 'react'

function Banner() {
  return (
    <section className="flex flex-col sm:flex-row gap-4 px-4 py-6">
      <div
        className="w-full h-[140px] sm:w-1/2 sm:h-[194px] md:h-[235px] rounded-xl"
        style={{ backgroundColor: "var(--color-sixeth)" }}
      ></div>

      <div
        className="w-full h-[140px] sm:w-1/2 sm:h-[194px] md:h-[235px] rounded-xl"
        style={{ backgroundColor: "var(--color-sixeth)" }}
      ></div>
    </section>
  );
}

export default Banner;
