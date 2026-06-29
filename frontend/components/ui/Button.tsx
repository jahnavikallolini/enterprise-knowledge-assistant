import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}