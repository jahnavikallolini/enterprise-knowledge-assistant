import Sources from "./Sources";

interface MessageBubbleProps {
  role: "user" | "assistant";
  message: string;
  sources?: string[];
}

export default function MessageBubble({
  role,
  message,
  sources = [],
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message}
        </p>

        {!isUser && (
          <Sources
            sources={sources}
          />
        )}
      </div>
    </div>
  );
}