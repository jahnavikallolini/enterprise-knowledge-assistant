import UploadSection from "./UploadSection";
import DocumentList from "./DocumentList";

export default function Sidebar() {
  return (
    <aside className="w-80 border-r bg-white p-6 flex flex-col gap-6">

      <UploadSection />

      <DocumentList />

    </aside>
  );
}