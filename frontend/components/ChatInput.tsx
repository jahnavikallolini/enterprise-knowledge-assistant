import Button from "./ui/Button";
import Input from "./ui/Input";

export default function ChatInput() {
  return (
    <div className="border-t bg-white p-6">

      <div className="flex gap-3">

        <Input
          placeholder="Ask anything about your documents..."
        />

        <Button>
          Send
        </Button>

      </div>

    </div>
  );
}