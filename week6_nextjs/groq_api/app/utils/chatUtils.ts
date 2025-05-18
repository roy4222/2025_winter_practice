import { v4 as uuidv4 } from 'uuid';
import { ChatHistory, ChatMessage, MessageRole, GroqApiRequest } from '../types/chat';

// localStorage 中存儲聊天記錄的鍵值
const CHAT_HISTORIES_KEY = 'groq_chat_histories';

/**
 * 從 localStorage 中獲取所有聊天記錄
 * @returns 所有聊天記錄陣列
 */
export function getChatHistories(): ChatHistory[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const historiesJson = localStorage.getItem(CHAT_HISTORIES_KEY);
  if (!historiesJson) {
    return [];
  }

  try {
    return JSON.parse(historiesJson);
  } catch (error) {
    console.error('解析聊天記錄時發生錯誤：', error);
    return [];
  }
}

/**
 * 保存聊天記錄到 localStorage
 * @param histories - 要保存的聊天記錄陣列
 */
export function saveChatHistories(histories: ChatHistory[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CHAT_HISTORIES_KEY, JSON.stringify(histories));
  } catch (error) {
    console.error('保存聊天記錄時發生錯誤：', error);
  }
}

/**
 * 建立新的聊天記錄
 * @param initialMessage - 可選的初始訊息
 * @returns 新建立的聊天記錄
 */
export function createNewChat(initialMessage?: string): ChatHistory {
  const now = Date.now();
  
  const newChat: ChatHistory = {
    id: uuidv4(),
    title: initialMessage ? initialMessage.slice(0, 30) : '新聊天',
    messages: [],
    createdAt: now,
    updatedAt: now,
  };

  // 如果有初始訊息，添加到聊天記錄中
  if (initialMessage) {
    newChat.messages.push({
      id: uuidv4(),
      role: 'user',
      content: initialMessage,
      timestamp: now,
    });
  }

  // 取得當前所有聊天記錄並添加新的聊天
  const histories = getChatHistories();
  histories.unshift(newChat); // 將新聊天放在最前面
  saveChatHistories(histories);

  return newChat;
}

/**
 * 獲取特定聊天記錄
 * @param chatId - 聊天記錄 ID
 * @returns 找到的聊天記錄或 null
 */
export function getChatById(chatId: string): ChatHistory | null {
  const histories = getChatHistories();
  return histories.find(chat => chat.id === chatId) || null;
}

/**
 * 添加訊息到聊天記錄
 * @param chatId - 聊天記錄 ID
 * @param role - 訊息角色
 * @param content - 訊息內容
 * @returns 更新後的聊天記錄或 null（如果找不到聊天記錄）
 */
export function addMessageToChat(
  chatId: string,
  role: MessageRole,
  content: string
): ChatHistory | null {
  const histories = getChatHistories();
  const chatIndex = histories.findIndex(chat => chat.id === chatId);
  
  if (chatIndex === -1) {
    return null;
  }

  const now = Date.now();
  
  // 建立新訊息
  const newMessage: ChatMessage = {
    id: uuidv4(),
    role,
    content,
    timestamp: now,
  };

  // 更新聊天記錄
  histories[chatIndex].messages.push(newMessage);
  histories[chatIndex].updatedAt = now;
  
  // 如果是用戶的第一條訊息，更新聊天標題
  if (role === 'user' && histories[chatIndex].messages.length === 1) {
    histories[chatIndex].title = content.slice(0, 30);
  }

  // 保存更新後的聊天記錄
  saveChatHistories(histories);
  
  return histories[chatIndex];
}

/**
 * 刪除特定聊天記錄
 * @param chatId - 聊天記錄 ID
 * @returns 刪除是否成功
 */
export function deleteChat(chatId: string): boolean {
  const histories = getChatHistories();
  const newHistories = histories.filter(chat => chat.id !== chatId);
  
  if (newHistories.length === histories.length) {
    return false; // 沒有找到要刪除的聊天記錄
  }
  
  saveChatHistories(newHistories);
  return true;
}

/**
 * 清空所有聊天記錄
 */
export function clearAllChats(): void {
  saveChatHistories([]);
}

// 預設的系統提示詞
const DEFAULT_SYSTEM_PROMPT = `你是一個智能、有幫助的助理機器人，姓名是 GROQ 助理。回答時使用繁體中文。直接、清晰、有用地回答用戶的問題。`;

let CUSTOM_SYSTEM_PROMPT: string | null = null;

/**
 * 設置自定義系統提示詞
 * @param prompt - 自定義的系統提示詞
 */
export function setCustomSystemPrompt(prompt: string | null): void {
  CUSTOM_SYSTEM_PROMPT = prompt;
}

/**
 * 取得目前的系統提示詞
 * @returns 系統提示詞
 */
export function getCurrentSystemPrompt(): string {
  return CUSTOM_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;
}

/**
 * 格式化 GROQ API 請求
 * @param messages - 聊天訊息
 * @param model - 模型名稱
 * @param stream - 是否使用流式傳輸
 * @returns 格式化後的 GROQ API 請求
 */
export function formatGroqRequest(
  messages: ChatMessage[],
  model: string = 'llama3-70b-8192',
  stream: boolean = true
): GroqApiRequest {
  // 已經包含系統訊息的標記
  const hasSystemMessage = messages.some(msg => msg.role === 'system');
  
  // 塞入系統提示詞（如果沒有的話）
  const formattedMessages = hasSystemMessage 
    ? messages.map(msg => ({ role: msg.role, content: msg.content }))
    : [
        { role: 'system' as MessageRole, content: getCurrentSystemPrompt() },
        ...messages.map(msg => ({ role: msg.role, content: msg.content }))
      ];
  
  return {
    messages: formattedMessages,
    model,
    temperature: 0.7,
    max_tokens: 4096,
    stream
  };
}

/**
 * 將聊天記錄訊息轉換為簡短的摘要標題
 * @param chatHistory - 聊天記錄
 * @returns 格式化後的摘要標題
 */
export function generateChatSummary(chatHistory: ChatHistory): string {
  if (!chatHistory.messages.length) {
    return '新聊天';
  }
  
  // 使用第一條用戶訊息作為摘要
  const firstUserMessage = chatHistory.messages.find(msg => msg.role === 'user');
  if (firstUserMessage) {
    const content = firstUserMessage.content.trim();
    return content.length > 30 ? content.substring(0, 27) + '...' : content;
  }
  
  return '新聊天';
}
