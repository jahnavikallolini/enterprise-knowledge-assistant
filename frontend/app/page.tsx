import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />

        <section className="flex-1 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-slate-400">
            Chat Area
          </h2>
        </section>
      </div>
    </main>
  );
}