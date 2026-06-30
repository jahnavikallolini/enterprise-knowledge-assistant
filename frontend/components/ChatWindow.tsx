"use client";

import { useEffect, useRef } from "react";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

import useChat from "@/hooks/useChat";

export default function ChatWindow() {
  const { messages, loading, sendMessage } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <section className="flex flex-1 flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto scroll-smooth p-8">
        <div className="mx-auto max-w-4xl space-y-5">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              role={msg.role}
              message={msg.message}
              sources={msg.sources}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        onSend={sendMessage}
        disabled={loading}
      />
    </section>
  );
}