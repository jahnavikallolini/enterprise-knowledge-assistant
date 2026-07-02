"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Search,
  Trash2,
} from "lucide-react";

import Card from "./ui/Card";
import Dialog from "./ui/Dialog";

import { Document } from "@/types";
import {
  deleteDocument,
  getDocuments,
} from "@/services/documentService";

import { useToast } from "./ui/ToastProvider";

interface DocumentListProps {
  refreshKey: number;
}

export default function DocumentList({
  refreshKey,
}: DocumentListProps) {
  const [documents, setDocuments] =
    useState<Document[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [deleting, setDeleting] =
    useState<string | null>(null);

  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const { showToast } = useToast();

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const docs = await getDocuments();

      setDocuments(docs);
    } catch (error) {
      console.error(error);

      showToast({
        type: "error",
        message: "Unable to load documents.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshKey]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.filename
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [documents, search]);

  const openDeleteDialog = (
    doc: Document
  ) => {
    setSelectedDocument(doc);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedDocument) return;

    try {
      setDeleting(selectedDocument.filename);

      await deleteDocument(
        selectedDocument.filename
      );

      setDocuments((prev) =>
        prev.filter(
          (doc) =>
            doc.filename !==
            selectedDocument.filename
        )
      );

      showToast({
        type: "success",
        message:
          "Document deleted successfully.",
      });

      setDialogOpen(false);
      setSelectedDocument(null);
    } catch (error) {
      console.error(error);

      showToast({
        type: "error",
        message:
          "Failed to delete document.",
      });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Documents
          </h2>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {filteredDocuments.length}
          </span>
        </div>

        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              py-2.5
              pl-10
              pr-3
              text-sm
              text-slate-800
              placeholder:text-slate-400
              focus:border-blue-500
              focus:outline-none
            "
          />
        </div>

        <Card className="border border-slate-200 p-2 shadow-sm">
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading documents...
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="py-10 text-center">
              <FileText className="mx-auto mb-3 h-7 w-7 text-slate-400" />

              <p className="font-medium text-slate-700">
                {documents.length === 0
                  ? "No documents yet"
                  : "No matching documents"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {documents.length === 0
                  ? "Upload your first PDF to begin."
                  : "Try a different search term."}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.filename}
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-slate-50"
                >
                  <FileText className="h-4 w-4 shrink-0 text-blue-600" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {doc.filename}
                    </p>

                    <p className="text-xs text-slate-500">
                      PDF Document
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      openDeleteDialog(doc)
                    }
                    disabled={
                      deleting === doc.filename
                    }
                    className="
                      rounded-md
                      p-2
                      opacity-0
                      transition
                      hover:bg-red-50
                      hover:text-red-600
                      group-hover:opacity-100
                    "
                    title="Delete document"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Dialog
        open={dialogOpen}
        title="Delete document"
        description={
          <>
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-slate-900">
              {selectedDocument?.filename}
            </span>
            ?
            <br />
            <br />
            This will permanently remove the
            document and its embeddings from the
            knowledge base.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        destructive
        onCancel={() => {
          setDialogOpen(false);
          setSelectedDocument(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}