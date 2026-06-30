"use client";

import { useState } from "react";

import {
  INITIAL_MESSAGE,
  THINKING_MESSAGE,
  ERROR_MESSAGE,
} from "@/constants/chat";

import { Message } from "@/types";
import { askQuestion } from "@/services/chatService";

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      message: INITIAL_MESSAGE,
    },
  ]);

  const [loading, setLoading] = useState(false);

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
        message: THINKING_MESSAGE,
        loading: true,
      },
    ]);

    try {
      const response = await askQuestion(question);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          message: response.answer,
          sources: response.context,
        };

        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          message: ERROR_MESSAGE,
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}