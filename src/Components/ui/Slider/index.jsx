// src/components/Slider/index.jsx
import { useState } from "react";
import { slides } from "../../../data/slides";
import SliderCard from "./SliderCard";
import SliderThumb from "./SliderThumb";

export default function Slider() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-[#f1f2f6] overflow-hidden flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-sm md:max-w-md mx-auto text-center">

        {/* Cards */}
        <div className="relative w-full aspect-square">
          {slides.map((slide, index) => (
            <SliderCard
              key={slide.id}
              slide={slide}
              isActive={active === index}
              onClick={() => setActive(index)}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {slides.map((slide, index) => (
            <SliderThumb
              key={slide.id}
              slide={slide}
              isActive={active === index}
              onClick={() => setActive(index)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
