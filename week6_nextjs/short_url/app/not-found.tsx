import Link from 'next/link';

/**
 * 404 頁面組件
 * 當訪問不存在的頁面時顯示
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          {/* 404 圖示 */}
          <div className="text-6xl font-bold text-indigo-600 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            找不到頁面
          </h1>
          <p className="text-gray-600 mb-8">
            抱歉，您訪問的頁面不存在或已被移除。
          </p>
        </div>

        {/* 操作按鈕 */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            返回首頁
          </Link>
          
          <div className="text-sm text-gray-500">
            或者您可以重新創建一個短網址
          </div>
        </div>

        {/* 額外資訊 */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">可能的原因：</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 網址輸入錯誤</li>
            <li>• 頁面已被移除</li>
            <li>• 連結已過期</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 