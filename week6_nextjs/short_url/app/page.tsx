'use client';

import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  /**
   * 處理表單提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setIsCopied(false);

    if (!originalUrl.trim()) {
      setError('請輸入網址');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成短網址時發生錯誤');
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生未知錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 複製短網址到剪貼簿
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      () => {
        setError('無法複製到剪貼簿');
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          短網址產生器
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              輸入長網址
            </label>
            <input
              type="url"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/long-url"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? '處理中...' : '生成短網址'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              你的短網址:
            </h2>
            <div className="flex">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-grow px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none dark:text-white"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none"
              >
                {isCopied ? '已複製!' : '複製'}
              </button>
            </div>
            <div className="mt-2 text-center">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                在新視窗中開啟
              </a>
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          使用 Next.js 和 Firebase 構建的短網址服務
        </p>
      </footer>
    </div>
  );
}
