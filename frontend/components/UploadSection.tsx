"use client";
import api from "@/services/api";

import { useRef } from "react";
import { Upload } from "lucide-react";

import Card from "./ui/Card";
import Button from "./ui/Button";

export default function UploadSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert("Upload failed.");
  }
};

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center">

        <div className="mb-4 rounded-full bg-blue-100 p-4">
          <Upload className="h-8 w-8 text-blue-600" />
        </div>

        <h2 className="text-lg font-semibold">
          Upload Documents
        </h2>

        <p className="mt-2 mb-6 text-sm text-slate-500">
          Upload one or more PDF documents.
        </p>

        <Button
          className="w-full"
          onClick={handleButtonClick}
        >
          Choose PDF
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