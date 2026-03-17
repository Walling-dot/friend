import { useState, useCallback } from "react";

interface Props {
  onCaught: () => void;
}

const CatchGame = ({ onCaught }: Props) => {
  const [pos, setPos] = useState({ top: "50%", left: "50%" });

  const moveButton = useCallback(() => {
    setPos({
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
    });
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center flex-col z-10"
      style={{ background: "linear-gradient(135deg, #ff6b81, #ff9a9e)" }}
    >
      <h2 className="text-3xl font-semibold mb-8 text-primary-foreground">
        Catch the button 😄
      </h2>
      <button
        className="absolute px-6 py-3 rounded-full bg-primary-foreground text-primary font-semibold text-lg cursor-pointer transition-all duration-100 hover:scale-110"
        style={{ top: pos.top, left: pos.left }}
        onMouseOver={moveButton}
        onTouchStart={moveButton}
        onClick={onCaught}
      >
        Catch me!
      </button>
    </div>
  );
};

export default CatchGame;
