"use client";

interface SourcesProps {
  sources: string[];
}

export default function Sources({
  sources,
}: SourcesProps) {
  if (!sources.length) return null;

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">

      <h3 className="mb-3 text-sm font-semibold text-slate-700">
        📚 Sources
      </h3>

      <div className="space-y-3">

        {sources.map((source, index) => (
          <details
            key={index}
            className="rounded border border-slate-200 bg-white"
          >
            <summary className="cursor-pointer px-3 py-2 font-medium">
              Retrieved Section {index + 1}
            </summary>

            <div className="border-t bg-slate-50 p-3 whitespace-pre-wrap text-sm text-slate-700">
              {source}
            </div>

          </details>
        ))}

      </div>

    </div>
  );
}