"use client";

import { useEffect, useRef } from "react";
import {
  Bot,
  FileText,
  Sparkles,
  Search,
} from "lucide-react";

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

  // Only the initial assistant message exists
  const isInitialState =
    messages.length === 1 &&
    messages[0].role === "assistant";

  return (
    <section className="flex flex-1 flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto scroll-smooth">
        {isInitialState ? (
          <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-8 text-center">
            <div className="mb-6 rounded-full bg-blue-100 p-5">
              <Bot className="h-10 w-10 text-blue-700" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Enterprise Knowledge Assistant
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600 leading-7">
              Search across your organization's
              documents using AI-powered Retrieval
              Augmented Generation (RAG).
            </p>

            <div className="mt-10 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
                <Sparkles className="h-4 w-4" />
                Try asking
              </h2>

              <div className="space-y-4 text-left">
                <ExampleQuestion
                  icon={<Search size={18} />}
                  text="Summarize the employee handbook."
                />

                <ExampleQuestion
                  icon={<FileText size={18} />}
                  text="What is the leave policy?"
                />

                <ExampleQuestion
                  icon={<Search size={18} />}
                  text="Explain the internship guidelines."
                />

                <ExampleQuestion
                  icon={<FileText size={18} />}
                  text="Compare reimbursement policies."
                />
              </div>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              Upload one or more PDF documents
              using the left sidebar to begin.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-10 py-8">
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
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        disabled={loading}
      />
    </section>
  );
}

interface ExampleQuestionProps {
  icon: React.ReactNode;
  text: string;
}

function ExampleQuestion({
  icon,
  text,
}: ExampleQuestionProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-blue-600">
        {icon}
      </div>

      <span className="text-sm text-slate-700">
        {text}
      </span>
    </div>
  );
}