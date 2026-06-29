import Card from "./ui/Card";
import { FileText } from "lucide-react";

export default function DocumentList() {
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Documents
      </h2>

      <Card className="p-5">
        <div className="flex flex-col items-center text-center">

          <div className="mb-3 rounded-full bg-slate-100 p-3">
            <FileText className="h-7 w-7 text-slate-500" />
          </div>

          <h3 className="font-medium text-slate-700">
            No documents uploaded
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Upload your first PDF to start chatting.
          </p>

        </div>
      </Card>
    </div>
  );
}