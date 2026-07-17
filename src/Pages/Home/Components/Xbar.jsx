import React from "react";

const BrandMarquee = () => {
  const items = Array.from({ length: 15 });

  const XLogo = ({ light = false }) => (
    <div
      className={`relative flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full shadow-md ${
        light ? "bg-white" : "bg-[#8A9A7B]"
      }`}
    >
      <div
        className={`absolute h-[2.5px] w-[55%] sm:h-[3px] rotate-45 rounded-full ${
          light ? "bg-[#9EAD8C]" : "bg-white"
        }`}
      />
      <div
        className={`absolute h-[2.5px] w-[55%] sm:h-[3px] -rotate-45 rounded-full ${
          light ? "bg-[#9EAD8C]" : "bg-white"
        }`}
      />
      <div
        className={`absolute h-1.5 w-1.5 rounded-full ${
          light ? "bg-[#9EAD8C]" : "bg-white"
        }`}
      />
    </div>
  );

  const MarqueeItem = ({ light = false }) => (
    <div
      className={`mx-2 sm:mx-3 flex shrink-0 items-center gap-2 sm:gap-3 border-l pl-2 sm:pl-3 first:border-l-0 first:pl-0 ${
        light ? "border-[#9EAD8C]/20" : "border-white/10"
      }`}
    >
      <XLogo light={light} />
      <span
        className={`whitespace-nowrap text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
          light ? "text-[#8A9A7B]" : "text-white"
        }`}
      >
        اریس وود
      </span>
      <span
        className={`whitespace-nowrap text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
          light ? "text-[#8A9A7B]/70" : "text-white/70"
        }`}
      >
        تخفیفات ویژه
      </span>
      <span
        className={`text-[8px] sm:text-[10px] opacity-30 ${
          light ? "text-[#8A9A7B]" : "text-white"
        }`}
      >
        |
      </span>
    </div>
  );

  const MarqueeRow = ({ light = false, reverse = false }) => (
    <div
      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden py-2 sm:py-2.5 ${
        light
          ? "bg-white/95 border-y border-[#9EAD8C]/10"
          : "bg-[#8A9A7B] border-y border-white/10"
      } ${light ? "rotate-[2.5deg] z-20" : "rotate-[-2.5deg] z-10"}`}
    >
      <div className="overflow-hidden">
        <div
          className={`flex whitespace-nowrap will-change-transform ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          {[...items, ...items, ...items].map((_, index) => (
            <MarqueeItem
              key={`${light ? "light" : "dark"}-${index}`}
              light={light}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-10 w-full overflow-hidden">
      <div className="relative h-[72px] w-full sm:h-[82px] md:h-[92px] overflow-hidden">
        <MarqueeRow />
        <MarqueeRow light reverse />

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          .animate-marquee-reverse {
            animation: marquee-reverse 18s linear infinite;
          }
          .animate-marquee:hover,
          .animate-marquee-reverse:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BrandMarquee;