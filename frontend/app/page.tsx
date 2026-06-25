import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <div className="flex h-[calc(100vh-72px)]">

        <Sidebar />

        <ChatWindow />

      </div>
    </main>
  );
}