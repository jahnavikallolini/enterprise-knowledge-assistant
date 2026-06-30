"use client";

import { useState } from "react";

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

  const sendMessage = async (question: string) => {
    // Show the user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: question,
      },
    ]);

    try {
      const response = await api.post("/chat", {
        question,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: response.data.answer,
          sources: response.data.context,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message:
            "Sorry, something went wrong while generating the response.",
        },
      ]);
    }
  };

  return (
    <section className="flex flex-1 flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-5">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              role={msg.role}
              message={msg.message}
              sources={msg.sources}
            />
          ))}
        </div>
      </div>

      <ChatInput onSend={sendMessage} />
    </section>
  );
}