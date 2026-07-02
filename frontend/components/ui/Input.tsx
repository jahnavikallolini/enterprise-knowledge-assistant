"use client";

import { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-slate-900
        placeholder:text-slate-400
        outline-none
        transition

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-100

        disabled:cursor-not-allowed
        disabled:bg-slate-100

        ${className}
      `}
    />
  );
}