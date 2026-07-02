export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Enterprise Knowledge Assistant
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          AI-powered document search using Retrieval-Augmented Generation (RAG)
        </p>
      </div>

      <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
        Gemini 2.5 Flash
      </div>
    </header>
  );
}