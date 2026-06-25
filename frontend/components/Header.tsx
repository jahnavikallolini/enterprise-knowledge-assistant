import Badge from "./ui/Badge";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Enterprise Knowledge Assistant
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Chat with your organization's documents using AI
        </p>

      </div>

      <Badge text="Backend Connected" />

    </header>
  );
}