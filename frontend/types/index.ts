export interface Document {
  filename: string;
}

export interface ChatRequest {
  question: string;
}

export interface Source {
  source: string;
  text: string;
}

export interface ChatResponse {
  answer: string;
  context: Source[];
}

export interface Message {
  role: "user" | "assistant";
  message: string;
  sources?: Source[];
  loading?: boolean;
}