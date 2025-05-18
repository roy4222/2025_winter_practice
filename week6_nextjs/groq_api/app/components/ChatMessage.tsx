'use client';

import React from 'react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { formatDate } from '../utils/formatters';

interface ChatMessageProps {
  message: ChatMessageType;
}

/**
 * 聊天訊息氣泡元件
 * 根據訊息角色顯示不同樣式的氣泡
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`
        max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl
        ${isUser 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none text-gray-900 dark:text-gray-100'
        }
      `}>
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div className={`
          text-xs mt-1 text-right
          ${isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}
        `}>
          {formatDate(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
