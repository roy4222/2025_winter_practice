// 定義聊天相關的類型

// 聊天訊息角色類型
export type MessageRole = 'user' | 'assistant' | 'system';

// 基本聊天訊息格式
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

// 聊天記錄格式
export interface ChatHistory {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

// GROQ API 請求格式
export interface GroqApiRequest {
  messages: { role: MessageRole; content: string }[];
  model: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

// GROQ API 回應格式
export interface GroqApiResponse {
  id: string;
  model: string;
  created: number;
  choices: {
    index: number;
    message: {
      role: MessageRole;
      content: string;
    };
    finish_reason: string;
  }[];
}

// GROQ API 流式回應格式
export interface GroqApiStreamChunk {
  id: string;
  model: string;
  created: number;
  choices: {
    index: number;
    delta: {
      role?: MessageRole;
      content?: string;
    };
    finish_reason: string | null;
  }[];
}

// 聊天狀態
export interface ChatState {
  chatHistories: ChatHistory[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
}
