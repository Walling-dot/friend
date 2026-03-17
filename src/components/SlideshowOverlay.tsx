import { useState, useEffect } from "react";
import img1 from "../assets/1.png.jpeg";
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.jpeg";
import img6 from "../assets/6.jpeg";
import img7 from "../assets/7.jpeg";
import img8 from "../assets/8.jpeg";
import img9 from "../assets/9.jpeg";
import img10 from "../assets/10.jpeg";

interface Props {
  onClose: () => void;
}

// Images array
const images = [
  img1,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
];

const SlideshowOverlay = ({ onClose }: Props) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // NEW

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  // 🔥 Auto slideshow logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 bg-black/95 z-30 flex flex-col items-center pt-16">
      <button
        className="absolute top-5 right-8 text-3xl text-primary-foreground cursor-pointer hover:opacity-70 transition-opacity"
        onClick={onClose}
      >
        ✖
      </button>

      <h2 className="text-xl font-semibold text-primary-foreground mb-6">
        Photos 📸
      </h2>

      <img
        src={images[current]}
        alt={`Photo ${current + 1}`}
        className="w-4/5 max-w-md rounded-xl"
      />

      <div className="flex gap-4 mt-6">
        <button
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          onClick={prev}
        >
          ⬅
        </button>

        <button
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          onClick={next}
        >
          ➡
        </button>
      </div>

      {/* 🔥 Play / Pause Button */}
      <button
        className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "Pause ⏸" : "Play ▶"}
      </button>
    </div>
  );
};

export default SlideshowOverlay;