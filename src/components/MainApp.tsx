import { useState, useEffect, useCallback, useRef } from "react";
import SlideshowOverlay from "./SlideshowOverlay";

const messages = [
  "Out of all people...",
  "You became my best friend 😄",
  "You're my chaos partner 😂",
  "Life is better with you in it",
  "You're stuck with me 💯",
];

const roasts = [
  "You're annoying 😂",
  "Your logic scares me 💀",
  "Still my best friend 😌",
];

const memories = [
  "We laugh at nothing 😂",
  "Pure chaos 💀",
  "Still best friends",
];

const MainApp = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showSlides, setShowSlides] = useState(false);
  const [popup, setPopup] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const aboutText = `You are one of those rare people who makes everything feel lighter and easier without even trying. 
From random laughs to complete chaos, every moment somehow turns into a memory when you're around. 
You're annoying sometimes, unpredictable most of the time, but that's exactly what makes you so special. 
No matter how weird or random things get, you always manage to make them fun. 

You’re not just a friend, you’re someone I can always count on. 
Life would be boring without you… so yeah, you’re stuck with me 💯`;

  const [startAbout, setStartAbout] = useState(false);
  const [aboutDisplay, setAboutDisplay] = useState("");
  const [aboutCharIndex, setAboutCharIndex] = useState(0);

  // 🎵 Auto music
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    document.addEventListener("click", startMusic);
    return () => document.removeEventListener("click", startMusic);
  }, [isPlaying]);

  // ⌨️ Typewriter
  useEffect(() => {
    if (charIndex < messages[msgIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + messages[msgIndex][charIndex]);
        setCharIndex((c) => c + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, msgIndex]);

  // 💖 About typing
  useEffect(() => {
    if (!startAbout) return;

    if (aboutCharIndex < aboutText.length) {
      const timeout = setTimeout(() => {
        setAboutDisplay((prev) => prev + aboutText[aboutCharIndex]);
        setAboutCharIndex((i) => i + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [aboutCharIndex, startAbout]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.5;
  }, []);

  const handleNext = useCallback(() => {
    if (msgIndex < messages.length - 1) {
      setMsgIndex((i) => i + 1);
      setDisplayText("");
      setCharIndex(0);
    }
  }, [msgIndex]);

  const showPopup = (text: string) => {
    setPopup(text);
    setTimeout(() => setPopup(null), 2000);
  };

  // ❌ CLOSE ABOUT PANEL
  const handleCloseAbout = () => {
    setStartAbout(false);
    setAboutDisplay("");
    setAboutCharIndex(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3">

      {/* 🎥 Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/50 z-0"></div>

      {/* 🎵 Audio */}
      <audio ref={audioRef} loop>
        <source src="/music/I_Wanna_Be_Yours.mp3" />
      </audio>

      {/* 💖 About Panel */}
      {startAbout && (
        <div className="fixed bottom-0 left-0 w-full max-h-[45%] overflow-y-auto p-4 text-sm text-white bg-black/80 z-20 rounded-t-2xl">

          {/* ❌ Close Button */}
          <button
            onClick={handleCloseAbout}
            className="absolute top-3 right-4 text-white text-lg"
          >
            ✖
          </button>

          {/* Content */}
          <div className="mt-6">
            {aboutDisplay}
          </div>

        </div>
      )}

      {/* 🎯 Main Card */}
      <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center space-y-4">

        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-pink-400/30 mx-auto flex items-center justify-center text-3xl sm:text-5xl">
          💖
        </div>

        <h2 className="text-lg sm:text-xl text-white font-semibold">
          Rongsenienla Jamir 💖
        </h2>

        <p className="text-sm sm:text-base text-white min-h-[1.5rem]">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        {/* 🔘 Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleNext} className="btn">Next</button>

          <button onClick={() => showPopup("You're one of the best 💯")} className="btn">
            Secret
          </button>

          <button
            onClick={() =>
              showPopup(roasts[Math.floor(Math.random() * roasts.length)])
            }
            className="btn"
          >
            Roast
          </button>

          <button
            onClick={() =>
              showPopup(memories[Math.floor(Math.random() * memories.length)])
            }
            className="btn"
          >
            Memory
          </button>

          <button
            onClick={() => {
              setStartAbout(true);
              setAboutDisplay("");
              setAboutCharIndex(0);
            }}
            className="btn col-span-2"
          >
            About You
          </button>

          <button onClick={() => setShowSlides(true)} className="btn col-span-2">
            Photos
          </button>
        </div>
      </div>

      {/* 🔔 Popup */}
      {popup && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-xs text-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm text-white z-30">
          {popup}
        </div>
      )}

      {showSlides && (
        <SlideshowOverlay onClose={() => setShowSlides(false)} />
      )}
    </div>
  );
};

export default MainApp;