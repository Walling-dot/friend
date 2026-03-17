import { useState } from "react";
import CatchGame from "@/components/CatchGame";
import PasswordLock from "@/components/PasswordLock";
import MainApp from "@/components/MainApp";
import FloatingHearts from "@/components/FloatingHearts";

type Stage = "game" | "lock" | "app";

const Index = () => {
  const [stage, setStage] = useState<Stage>("game");

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ background: "linear-gradient(135deg, #ff6b81, #ff9a9e)" }}
    >
      <FloatingHearts />

      {stage === "game" && (
        <CatchGame onCaught={() => setStage("lock")} />
      )}
      {stage === "lock" && (
        <PasswordLock onUnlock={() => setStage("app")} />
      )}
      {stage === "app" && <MainApp />}
    </div>
  );
};

export default Index;
