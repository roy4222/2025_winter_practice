'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatHistoryList from './components/ChatHistoryList';
import SystemPromptModal from './components/SystemPromptModal';
import { ChatHistory, ChatMessage as ChatMessageType } from './types/chat';
import { 
  getChatHistories, 
  createNewChat, 
  addMessageToChat, 
  deleteChat,
  formatGroqRequest,
  getCurrentSystemPrompt,
  setCustomSystemPrompt
} from './utils/chatUtils';

export default function Home() {
  // 狀態管理
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentChat, setCurrentChat] = useState<ChatHistory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamedResponse, setStreamedResponse] = useState<string>('');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [systemPrompt, setSystemPrompt] = useState<string>(getCurrentSystemPrompt());

  // 初始化，載入所有聊天記錄
  useEffect(() => {
    const histories = getChatHistories();
    setChatHistories(histories);
    
    // 如果有聊天記錄，選擇最近的一個
    if (histories.length > 0) {
      setCurrentChatId(histories[0].id);
      setCurrentChat(histories[0]);
    }
  }, []);

  // 當currentChatId變更時，更新currentChat
  useEffect(() => {
    if (currentChatId) {
      const chat = chatHistories.find(c => c.id === currentChatId) || null;
      setCurrentChat(chat);
    } else {
      setCurrentChat(null);
    }
  }, [currentChatId, chatHistories]);

  // 建立新聊天
  const handleNewChat = useCallback(() => {
    const newChat = createNewChat();
    setChatHistories(getChatHistories());
    setCurrentChatId(newChat.id);
    setCurrentChat(newChat);
  }, []);

  // 選擇聊天
  const handleSelectChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId);
    // 在行動裝置上，選擇聊天後關閉側邊欄
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  // 刪除聊天
  const handleDeleteChat = useCallback((chatId: string) => {
    deleteChat(chatId);
    setChatHistories(getChatHistories());
    
    // 如果刪除的是當前聊天，選擇另一個聊天
    if (chatId === currentChatId) {
      const histories = getChatHistories();
      if (histories.length > 0) {
        setCurrentChatId(histories[0].id);
      } else {
        setCurrentChatId(null);
        setCurrentChat(null);
      }
    }
  }, [currentChatId]);

  // 處理發送訊息
  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;
    
    setError(null);
    
    // 如果沒有當前聊天，先建立一個
    let chatId = currentChatId;
    if (!chatId) {
      const newChat = createNewChat(message);
      chatId = newChat.id;
      setChatHistories(getChatHistories());
      setCurrentChatId(chatId);
    } else {
      // 添加用戶訊息到現有聊天
      addMessageToChat(chatId, 'user', message);
      setChatHistories(getChatHistories());
    }
    
    setIsLoading(true);
    
    try {
      // 準備向 GROQ API 發送的訊息
      const chat = getChatHistories().find(c => c.id === chatId);
      if (!chat) throw new Error('聊天記錄不存在');
      
      const messages = chat.messages;
      const groqRequest = formatGroqRequest(messages, undefined, true);
      
      // 發送請求到我們的 API 端點
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groqRequest),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '與 GROQ API 通訊時發生錯誤');
      }

      if (groqRequest.stream) {
        setIsStreaming(true);
        setStreamedResponse(''); // 清空先前的串流回應
        
        // 處理 SSE 串流回應
        const reader = response.body?.getReader();
        if (!reader) throw new Error('無法讀取串流回應');
        
        const decoder = new TextDecoder();
        let responseText = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // 解碼 chunk
          const chunk = decoder.decode(value, { stream: true });
          
          // 處理 SSE 格式
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                // 移除先導的 'data: ' 後再解析 JSON
                const jsonStr = line.substring(6).trim();
                if (!jsonStr) continue;
                
                // 安全解析 JSON
                const json = JSON.parse(jsonStr);
                
                // 取得內容
                const content = json.choices && json.choices[0]?.delta?.content || '';
                if (content) {
                  responseText += content;
                  setStreamedResponse(responseText);
                }
              } catch (e) {
                console.error('解析串流資料時發生錯誤:', e, '\n原始資料:', line);
                // 繼續處理下一行，不中斷流程
              }
            }
          }
        }

        // 串流結束，保存完整回應
        if (responseText) {
          addMessageToChat(chatId, 'assistant', responseText);
          setChatHistories(getChatHistories());
        }
        
        setIsStreaming(false);
      } else {
        // 非串流回應
        const data = await response.json();
        const assistantMessage = data.choices[0]?.message?.content;
        
        if (assistantMessage) {
          addMessageToChat(chatId, 'assistant', assistantMessage);
          setChatHistories(getChatHistories());
        }
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('發送訊息時發生錯誤:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentChatId, isLoading]);

  // 切換側邊欄顯示
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);
  
  // 處理儲存系統提示詞
  const handleSaveSystemPrompt = useCallback((prompt: string) => {
    setSystemPrompt(prompt);
    setCustomSystemPrompt(prompt);
  }, []);
  
  // 處理重設系統提示詞
  const handleResetSystemPrompt = useCallback(() => {
    setCustomSystemPrompt(null);
    setSystemPrompt(getCurrentSystemPrompt());
  }, []);
  
  // 開啟系統提示詞設定對話框
  const openPromptModal = useCallback(() => {
    setIsPromptModalOpen(true);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* 行動裝置側邊欄控制按鈕 */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? '關閉側邊欄' : '開啟側邊欄'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              isSidebarOpen
                ? 'M6 18L18 6M6 6l12 12'
                : 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'
            }
          />
        </svg>
      </button>

      {/* 側邊欄 */}
      <div
        className={`
          fixed md:relative z-10 w-80 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-center mb-6 pt-2">
            <h1 className="text-xl font-bold">GROQ 聊天助手</h1>
          </div>
          
          <div className="flex-grow overflow-hidden">
            <ChatHistoryList
              chatHistories={chatHistories}
              currentChatId={currentChatId}
              onSelectChat={handleSelectChat}
              onDeleteChat={handleDeleteChat}
              onNewChat={handleNewChat}
            />
          </div>
          
          <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
            使用 GROQ API 與 Next.js 框架
          </div>
        </div>
      </div>

      {/* 主聊天區域 */}
      <div className="flex-grow flex flex-col h-full">
        {/* 頂部導航 */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md flex items-center sticky top-0">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg font-medium truncate">
              {currentChat?.title || '新聊天'}
            </h2>
            <button
              onClick={openPromptModal}
              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
              title="設定系統提示詞"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 聊天訊息區域 */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="flex items-center justify-center h-full flex-col gap-4 text-gray-500 dark:text-gray-400">
              <Image 
                src="/next.svg" 
                alt="Next.js logo" 
                width={180} 
                height={38} 
                className="dark:invert mb-2" 
              />
              <p className="text-center max-w-md text-lg">
                開始與 GROQ 的強大語言模型對話吧！
              </p>
              <p className="text-sm text-center max-w-md">
                嘗試詢問任何問題或請求協助來開始對話。
              </p>
            </div>
          ) : (
            <>
              {currentChat.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* 串流中的訊息 */}
              {isStreaming && streamedResponse && (
                <div className="flex w-full justify-start mb-4">
                  <div className="max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none text-gray-900 dark:text-gray-100">
                    <div className="whitespace-pre-wrap break-words">
                      {streamedResponse}
                      <span className="animate-pulse">▌</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 載入中動畫 */}
              {isLoading && !isStreaming && (
                <div className="flex w-full justify-start mb-4">
                  <div className="max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none text-gray-900 dark:text-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* 錯誤訊息 */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg">
              <p className="font-medium">錯誤</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* 聊天輸入區域 */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-inner">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            placeholder={isLoading ? '正在等待回應...' : '輸入訊息...'}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            按 Enter 發送，Shift + Enter 換行
          </p>
        </div>
      </div>
      
      {/* 系統提示詞設定對話框 */}
      <SystemPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        initialPrompt={systemPrompt}
        onSave={handleSaveSystemPrompt}
        onReset={handleResetSystemPrompt}
      />
    </div>
  );
}
