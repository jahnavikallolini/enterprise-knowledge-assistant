import UploadSection from "./UploadSection";
import DocumentList from "./DocumentList";

export default function Sidebar() {
  return (
    <aside className="w-80 border-r border-slate-200 bg-white p-6 flex flex-col">

      <UploadSection />

      <DocumentList />

    </aside>
  );
}