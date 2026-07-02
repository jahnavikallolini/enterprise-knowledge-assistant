"use client";

import { useState } from "react";
import { FolderOpen } from "lucide-react";

import UploadSection from "./UploadSection";
import DocumentList from "./DocumentList";

export default function Sidebar() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDocuments = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <aside className="flex h-full w-80 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 p-2">
            <FolderOpen className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Workspace
            </h2>

            <p className="text-sm text-slate-500">
              Manage your documents
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden p-6">
        <UploadSection
          onUploadSuccess={refreshDocuments}
        />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <DocumentList
            refreshKey={refreshKey}
          />
        </div>
      </div>
    </aside>
  );
}