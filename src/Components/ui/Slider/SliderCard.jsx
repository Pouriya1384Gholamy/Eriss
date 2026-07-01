// src/components/Slider/SliderCard.jsx
export default function SliderCard({ slide, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ backgroundImage: `url(${slide.image})` }}
      className={`
        absolute inset-0 w-full h-full
        bg-cover bg-center
        border-[5px] border-[#bdc3c7]
        box-border
        font-black text-[16px] tracking-[2px] leading-[2.7]
        text-[#343434] [writing-mode:vertical-rl]
        flex items-center justify-center
        shadow-[0_8px_25px_0_rgba(16,39,112,0.1)]
        cursor-pointer select-none
        transition-all duration-500
        ${isActive
          ? "opacity-100 pointer-events-auto rounded-2xl"
          : "opacity-0 pointer-events-none rounded-full"
        }
      `}
    >
      <span className="mix-blend-difference">{slide.label}</span>
    </div>
  );
}
