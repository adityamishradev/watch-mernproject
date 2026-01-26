import { useEffect, useState } from "react";

// Images
import watch1 from "../../assets/w1.jpg";
import watch2 from "../../assets/w2.webp";
import watch3 from "../../assets/w3.jpg";

const images = [watch1, watch2, watch3];

const Scrolling = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl">

      {/* SLIDER */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={img}
              alt={`watch-${index}`}
              className="
                w-full 
                h-[70vh] 
                max-h-[600px]
                object-cover 
                rounded-xl
              "
            />
          </div>
        ))}
      </div>

      {/* PREV */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-2 rounded-full text-2xl"
      >
        ‹
      </button>

      {/* NEXT */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-2 rounded-full text-2xl"
      >
        ›
      </button>
    </div>
  );
};

export default Scrolling;
