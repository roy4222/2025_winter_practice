'use client';

import React, { useState, useEffect } from 'react';

interface SystemPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt: string;
  onSave: (prompt: string) => void;
  onReset: () => void;
}

/**
 * 系統提示詞設定對話框
 */
export default function SystemPromptModal({
  isOpen,
  onClose,
  initialPrompt,
  onSave,
  onReset
}: SystemPromptModalProps) {
  const [prompt, setPrompt] = useState(initialPrompt);

  // 當初始提示詞變更時更新狀態
  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  // 處理儲存
  const handleSave = () => {
    onSave(prompt);
    onClose();
  };

  // 處理重設為預設值
  const handleReset = () => {
    onReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            設定系統提示詞
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            系統提示詞用於指導 AI 助理如何回應。設定適當的提示詞可以獲得更符合您期望的回應。
          </p>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[150px] mb-4"
            placeholder="輸入系統提示詞..."
          />
          
          <div className="flex justify-between">
            <div>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mr-2"
              >
                重設為預設值
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                取消
              </button>
            </div>
            
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
