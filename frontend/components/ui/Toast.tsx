"use client";

import { CheckCircle2, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export default function Toast({
  message,
  type = "success",
}: ToastProps) {
  const success = type === "success";

  return (
    <div
      className={`
        flex items-center gap-3
        rounded-xl
        border
        bg-white
        px-4
        py-3
        shadow-lg
        transition-all

        ${
          success
            ? "border-green-200"
            : "border-red-200"
        }
      `}
    >
      {success ? (
        <CheckCircle2
          className="h-5 w-5 text-green-600"
        />
      ) : (
        <XCircle
          className="h-5 w-5 text-red-600"
        />
      )}

      <p className="text-sm font-medium text-slate-700">
        {message}
      </p>
    </div>
  );
}