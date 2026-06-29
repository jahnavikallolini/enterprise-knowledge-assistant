"use client";

import { useState } from "react";

import UploadSection from "./UploadSection";
import DocumentList from "./DocumentList";

export default function Sidebar() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDocuments = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <aside className="w-80 border-r border-slate-200 bg-white p-6 flex flex-col">

      <UploadSection
        onUploadSuccess={refreshDocuments}
      />

      <DocumentList
        refreshKey={refreshKey}
      />

    </aside>
  );
}