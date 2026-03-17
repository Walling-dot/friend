import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: string;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setHearts((prev) => [
        ...prev.slice(-15), // keep max 16 hearts
        { id, left: `${Math.random() * 100}vw` },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hearts.length === 0) return;
    const timeout = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 5000);
    return () => clearTimeout(timeout);
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-2xl animate-float-up"
          style={{ left: h.left, bottom: 0 }}
        >
          💖
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
