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

  // 🎵 MUSIC
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 💖 ABOUT YOU TEXT (LONG)
  const aboutText = `You are one of those rare people who makes everything feel lighter and easier without even trying. 
From random laughs to complete chaos, every moment somehow turns into a memory when you're around. 
You're annoying sometimes, unpredictable most of the time, but that's exactly what makes you so special. 
No matter how weird or random things get, you always manage to make them fun. 

You’re not just a friend, you’re someone I can always count on, someone who understands without needing explanations. 
Even the simplest moments feel better with you in them. 
Honestly, life would be way too quiet, way too boring, and way too normal without you in it. 
And I guess that’s why… you’re stuck with me 💯`;

  const [startAbout, setStartAbout] = useState(false);
  const [aboutDisplay, setAboutDisplay] = useState("");
  const [aboutCharIndex, setAboutCharIndex] = useState(0);

  // 🎵 Auto play music
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener("click", startMusic);
    return () => document.removeEventListener("click", startMusic);
  }, [isPlaying]);

  // ⌨️ Typewriter (center text)
  useEffect(() => {
    if (charIndex < messages[msgIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + messages[msgIndex][charIndex]);
        setCharIndex((c) => c + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, msgIndex]);

  // 💖 LETTER-BY-LETTER (About You)
  useEffect(() => {
    if (!startAbout) return;

    if (aboutCharIndex < aboutText.length) {
      const timeout = setTimeout(() => {
        setAboutDisplay((prev) => prev + aboutText[aboutCharIndex]);
        setAboutCharIndex((i) => i + 1);
      }, 400); // 🐢 slow typing

      return () => clearTimeout(timeout);
    }
  }, [aboutCharIndex, startAbout]);

  // 🔊 Volume
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
    setTimeout(() => setPopup(null), 2500);
  };

  const handleSecret = () =>
    showPopup("You're one of the best people I have 💯");

  const handleRoast = () =>
    showPopup(roasts[Math.floor(Math.random() * roasts.length)]);

  const handleMemory = () =>
    showPopup(memories[Math.floor(Math.random() * memories.length)]);

  return (
    <>
      {/* 🎥 BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-20 blur-sm"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/40 z-0"></div>

      {/* 🎵 AUDIO */}
      <audio ref={audioRef} loop>
        <source src="/music/I_Wanna_Be_Yours.mp3" type="audio/mpeg" />
      </audio>

      {/* 🌟 LEFT SIDE TEXT */}
      {startAbout && (
        <div className="fixed left-10 top-1/2 -translate-y-1/2 w-[400px] text-left text-primary-foreground text-lg leading-loose z-10">
          {aboutDisplay}
          <span className="animate-pulse">|</span>
        </div>
      )}

      {/* 🎯 MAIN CARD */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="glass rounded-2xl p-6 w-[340px] text-center space-y-4">
          <div className="w-28 h-28 rounded-full bg-primary/30 mx-auto flex items-center justify-center text-5xl">
            💖
          </div>

          <h2 className="text-xl font-semibold text-primary-foreground">
            Rongsenienla Jamir 💖
          </h2>

          <p className="text-primary-foreground/90 min-h-[1.5rem]">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Next", onClick: handleNext },
              { label: "Secret", onClick: handleSecret },
              { label: "Roast", onClick: handleRoast },
              { label: "Memory", onClick: handleMemory },
              {
                label: "About You",
                onClick: () => {
                  setStartAbout(true);
                  setAboutDisplay("");
                  setAboutCharIndex(0);
                },
              },
              { label: "Photos", onClick: () => setShowSlides(true) },
            ].map((btn) => (
              <button
                key={btn.label}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔔 POPUP */}
      {popup && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-40 glass px-6 py-3 rounded-xl text-sm animate-pulse">
          {popup}
        </div>
      )}

      {showSlides && (
        <SlideshowOverlay onClose={() => setShowSlides(false)} />
      )}
    </>
  );
};

export default MainApp;