export default function Header() {
  return (
    <header className="h-20 border-b border-slate-200 bg-white shadow-sm px-8 flex items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Enterprise Knowledge Assistant
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Chat with your organization's documents using AI
        </p>
      </div>
    </header>
  );
}