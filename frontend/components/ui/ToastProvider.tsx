"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import Toast from "./Toast";

interface ToastData {
  message: string;
  type: "success" | "error";
}

interface ToastContextType {
  showToast: (
    toast: ToastData
  ) => void;
}

const ToastContext =
  createContext<ToastContextType | null>(null);

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [toast, setToast] =
    useState<ToastData | null>(null);

  const showToast = (
    toast: ToastData
  ) => {
    setToast(toast);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}

      <div className="fixed bottom-6 right-6 z-[100]">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
          />
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context =
    useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used within ToastProvider."
    );
  }

  return context;
}