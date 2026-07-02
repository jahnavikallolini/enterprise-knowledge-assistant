"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";

import Card from "./ui/Card";
import Button from "./ui/Button";

import api from "@/services/api";
import { useToast } from "./ui/ToastProvider";

interface UploadSectionProps {
  onUploadSuccess: () => void;
}

export default function UploadSection({
  onUploadSuccess,
}: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const { showToast } = useToast();

  const handleButtonClick = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      onUploadSuccess();

      showToast({
        type: "success",
        message: `"${file.name}" uploaded successfully.`,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.detail ??
        "Unable to upload document.";

      showToast({
        type: "error",
        message,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-blue-100 p-4">
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          ) : (
            <Upload className="h-8 w-8 text-blue-600" />
          )}
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Upload Documents
        </h2>

        <p className="mt-2 mb-6 text-sm text-slate-500">
          Upload one or more PDF documents to start chatting with AI.
        </p>

        <Button
          className="w-full"
          onClick={handleButtonClick}
          disabled={uploading}
        >
          {uploading
            ? "Uploading..."
            : "Choose PDF"}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </Card>
  );
}