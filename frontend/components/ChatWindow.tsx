"use client";

import { useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

import api from "@/services/api";
import { Message } from "@/types";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      message: "Hello! Upload a PDF and ask me anything about it.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (question: string) => {
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: question,
      },
      {
        role: "assistant",
        message: "Thinking...",
        loading: true,
      },
    ]);

    try {
      const response = await api.post("/chat", {
        question,
      });

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          message: response.data.answer,
          sources: response.data.context,
        };

        return updated;
      });
    } catch (error) {
      console.error(error);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          message: "Sorry, something went wrong while generating the response.",
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

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