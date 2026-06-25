import ChatInput from "./ChatInput";

export default function ChatWindow() {
  return (
    <section className="flex flex-1 flex-col bg-slate-50">

      <div className="flex-1 flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-slate-700">
            Welcome!
          </h2>

          <p className="mt-3 text-slate-500">
            Upload a PDF and start asking questions.
          </p>

        </div>

      </div>

      <ChatInput />

    </section>
  );
}