import Card from "./ui/Card";

export default function DocumentList() {
  return (
    <div>

      <h2 className="mb-4 text-lg font-semibold">
        Documents
      </h2>

      <Card className="p-6">

        <div className="text-center">

          <div className="mb-2 text-4xl">
            📄
          </div>

          <p className="font-medium">
            No documents uploaded
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Upload a PDF to get started.
          </p>

        </div>

      </Card>

    </div>
  );
}