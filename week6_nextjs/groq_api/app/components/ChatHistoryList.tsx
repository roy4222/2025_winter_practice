'use client';

import React from 'react';
import { ChatHistory } from '../types/chat';
import { formatDate, getRelativeTime, formatChatTitle } from '../utils/formatters';

interface ChatHistoryListProps {
  chatHistories: ChatHistory[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
}

/**
 * 聊天記錄列表元件
 * 顯示所有聊天記錄並提供選擇、刪除和新建聊天功能
 */
export default function ChatHistoryList({
  chatHistories,
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onNewChat
}: ChatHistoryListProps) {
  // 處理刪除聊天記錄
  const handleDelete = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation(); // 防止點擊事件傳播到父元素
    onDeleteChat(chatId);
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* 新聊天按鈕 */}
      <button
        onClick={onNewChat}
        className="mb-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        新聊天
      </button>

      {/* 聊天記錄列表 */}
      <div className="flex-grow overflow-y-auto">
        {chatHistories.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            尚無聊天記錄
          </div>
        ) : (
          <ul className="space-y-2">
            {chatHistories.map((chat) => (
              <li
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`
                  cursor-pointer p-3 rounded-lg relative group
                  ${currentChatId === chat.id
                    ? 'bg-blue-100 dark:bg-blue-900/40'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                  transition-colors
                `}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate pr-8">
                    {formatChatTitle(chat.title)}
                  </h3>
                  <button
                    onClick={(e) => handleDelete(e, chat.id)}
                    className="text-gray-400 hover:text-red-500 ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2"
                    aria-label="刪除聊天"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {getRelativeTime(chat.updatedAt)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                  {chat.messages.length > 0 
                    ? `${chat.messages.length} 則訊息` 
                    : '無訊息'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
