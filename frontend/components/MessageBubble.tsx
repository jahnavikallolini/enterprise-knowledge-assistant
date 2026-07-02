"use client";

import { useState } from "react";
import {
  Bot,
  User,
  Copy,
  Check,
} from "lucide-react";

import MarkdownRenderer from "./MarkdownRenderer";
import Sources from "./Sources";

import { Source } from "@/types";
import { useToast } from "./ui/ToastProvider";

interface MessageBubbleProps {
  role: "user" | "assistant";
  message: string;
  sources?: Source[];
}

export default function MessageBubble({
  role,
  message,
  sources = [],
}: MessageBubbleProps) {
  const isUser = role === "user";

  const { showToast } = useToast();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);

      setCopied(true);

      showToast({
        type: "success",
        message: "Response copied to clipboard.",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      showToast({
        type: "error",
        message: "Failed to copy response.",
      });
    }
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div
          className={`mb-2 flex items-center ${
            isUser
              ? "justify-end gap-2"
              : "justify-between"
          }`}
        >
          {isUser ? (
            <>
              <span className="text-sm font-semibold text-slate-700">
                You
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                <User
                  size={16}
                  className="text-slate-700"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                  <Bot
                    size={16}
                    className="text-blue-700"
                  />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Assistant
                </span>
              </div>

              {message !== "Thinking..." && (
                <button
                  onClick={handleCopy}
                  disabled={copied}
                  title="Copy response"
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-md
                    p-2
                    text-slate-400
                    transition-all
                    duration-200
                    hover:bg-slate-100
                    hover:text-slate-700
                    disabled:cursor-default
                  "
                  style={{
                    opacity: copied ? 1 : 0.45,
                  }}
                >
                  {copied ? (
                    <Check
                      size={18}
                      className="text-green-600"
                    />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* Message */}
        <div
          className={`rounded-2xl border p-5 ${
            isUser
              ? "border-slate-300 bg-slate-100"
              : "border-slate-200 bg-white shadow-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-7 text-slate-900">
              {message}
            </p>
          ) : (
            <MarkdownRenderer
              content={message}
            />
          )}

          {message === "Thinking..." && (
            <div className="mt-4 flex gap-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]"></div>
            </div>
          )}

          {!isUser && (
            <Sources
              sources={sources}
            />
          )}
        </div>
      </div>
    </div>
  );
}