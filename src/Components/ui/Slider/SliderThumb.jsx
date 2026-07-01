// src/components/Slider/SliderThumb.jsx
export default function SliderThumb({ slide, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundImage: `url(${slide.image})` }}
      className={`
        bg-cover bg-center
        border-[3px] border-[#bdc3c7]
        rounded-full box-border
        transition-all duration-200
        focus:outline-none
        ${isActive
          ? "w-[65px] h-[65px] shadow-[0_8px_25px_0_rgba(16,39,112,0.3)] scale-[1.3] animate-morph"
          : "w-[50px] h-[50px]"
        }
      `}
    />
  );
}
