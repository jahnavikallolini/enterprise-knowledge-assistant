"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import Card from "./ui/Card";
import api from "@/services/api";
import { Document } from "@/types";

interface DocumentListProps {
  refreshKey: number;
}

export default function DocumentList({
  refreshKey,
}: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/documents");

      setDocuments(response.data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshKey]);

  return (
    <div className="mt-6 flex-1">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Documents
      </h2>

      <Card className="p-4">
        {loading ? (
          <div className="py-6 text-center text-slate-500">
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div className="py-6 text-center">
            <FileText className="mx-auto mb-3 h-8 w-8 text-slate-400" />

            <p className="font-medium text-slate-700">
              No documents uploaded
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Upload your first PDF to begin.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.filename}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50"
              >
                <FileText className="h-5 w-5 text-blue-600" />

                <span className="truncate text-sm text-slate-700">
                  {doc.filename}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}