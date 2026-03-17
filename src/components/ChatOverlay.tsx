interface Props {
  onClose: () => void;
}

const chatMessages = [
  { sender: "you", text: "brooo" },
  { sender: "her", text: "what 😭" },
  { sender: "you", text: "nothing" },
  { sender: "her", text: "useless 💀" },
];

const ChatOverlay = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/95 z-30 flex flex-col items-center pt-16">
      <button
        className="absolute top-5 right-8 text-3xl text-primary-foreground cursor-pointer hover:opacity-70 transition-opacity"
        onClick={onClose}
      >
        ✖
      </button>
      <h2 className="text-xl font-semibold text-primary-foreground mb-6">
        Chat History 💬
      </h2>
      <div className="max-w-xs text-left space-y-3">
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender === "you"
                ? "text-accent"
                : "text-secondary"
            }
          >
            <span className="font-semibold">
              {msg.sender === "you" ? "You" : "Her"}:
            </span>{" "}
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatOverlay;
