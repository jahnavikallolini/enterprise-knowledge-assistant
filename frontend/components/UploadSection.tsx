import Card from "./ui/Card";
import Button from "./ui/Button";

export default function UploadSection() {
  return (
    <Card className="p-5">

      <h2 className="mb-2 text-lg font-semibold">
        Upload Documents
      </h2>

      <p className="mb-5 text-sm text-slate-500">
        Upload one or more PDF documents.
      </p>

      <Button className="w-full">
        Upload PDF
      </Button>

    </Card>
  );
}