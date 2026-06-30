"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import Button from "./ui/Button";
import Input from "./ui/Input";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || disabled) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="border-t bg-white p-6">
      <div className="flex gap-3">
        <Input
          placeholder="Ask anything about your documents..."
          value={message}
          disabled={disabled}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <Button
          onClick={handleSend}
          disabled={disabled}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}