export interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
  type?: "text" | "code" | "chart" | "table" | "error";
  data?: any; // Para dados de gráficos, tabelas, etc.
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentFile?: File;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  type?: "text" | "code" | "chart" | "table";
}