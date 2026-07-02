"use client";

import { useState } from "react";
import {
  BookOpen,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Source } from "@/types";

interface SourcesProps {
  sources: Source[];
}

export default function Sources({
  sources,
}: SourcesProps) {
  if (!sources.length) return null;

  return (
    <div className="mt-8 border-t border-slate-200 pt-5">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-slate-500" />

        <h3 className="text-sm font-semibold tracking-wide text-slate-700">
          Sources
        </h3>
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => (
          <SourceCard
            key={index}
            source={source}
          />
        ))}
      </div>
    </div>
  );
}

interface SourceCardProps {
  source: Source;
}

function SourceCard({
  source,
}: SourceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const previewLength = 250;

  const preview =
    source.text.length > previewLength
      ? source.text.slice(0, previewLength) + "..."
      : source.text;

  const formattedFilename = source.source
    .replace(".pdf", "")
    .replace(/[_-]/g, " ");

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50">
      <button
        onClick={() => {
          if (!expanded) {
            setExpanded(true);
          } else {
            setExpanded(false);
            setShowFull(false);
          }
        }}
        className="flex w-full items-center justify-between px-4 py-4 transition hover:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2">
            <FileText className="h-4 w-4 text-blue-700" />
          </div>

          <span className="font-medium text-slate-800">
            {formattedFilename}
          </span>
        </div>

        {expanded ? (
          <ChevronUp
            className="text-slate-500"
            size={18}
          />
        ) : (
          <ChevronDown
            className="text-slate-500"
            size={18}
          />
        )}
      </button>

      {expanded && (
        <div className="border-t border-slate-200 bg-white px-5 py-4">
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {showFull ? source.text : preview}
          </p>

          {source.text.length > previewLength && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="mt-3 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              {showFull
                ? "Show less"
                : "View full excerpt"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}