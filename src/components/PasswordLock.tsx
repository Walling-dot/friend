import { useState } from "react";

interface Props {
  onUnlock: () => void;
}

const PasswordLock = ({ onUnlock }: Props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (value.toLowerCase().includes("rongsenienla")) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center flex-col z-10 gap-4">
      <h2 className="text-2xl font-semibold text-primary-foreground">
        Enter your name 🔐
      </h2>
      <input
        className="px-4 py-2 rounded-full bg-muted text-primary-foreground border border-border outline-none text-center text-lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
        placeholder="Type here..."
      />
      <button
        className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleUnlock}
      >
        Unlock
      </button>
      {error && (
        <p className="text-destructive text-sm animate-pulse">Wrong 😤</p>
      )}
    </div>
  );
};

export default PasswordLock;
