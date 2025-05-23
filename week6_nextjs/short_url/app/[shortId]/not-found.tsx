import Link from 'next/link';

/**
 * 短網址專用的 404 頁面
 * 當訪問不存在的短網址時顯示
 */
export default function ShortUrlNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          {/* 錯誤圖示 */}
          <div className="text-6xl mb-4">🔗❌</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            短網址不存在
          </h1>
          <p className="text-gray-600 mb-8">
            抱歉，您訪問的短網址無法找到。這可能是因為網址輸入錯誤、已過期或已被刪除。
          </p>
        </div>

        {/* 操作按鈕區域 */}
        <div className="space-y-4 mb-8">
          <Link
            href="/"
            className="inline-block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            🏠 返回首頁
          </Link>
          
          <Link
            href="/"
            className="inline-block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            ➕ 創建新的短網址
          </Link>
        </div>

        {/* 幫助資訊 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <span className="mr-2">💡</span>
            可能的原因
          </h3>
          <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>短網址輸入錯誤或不完整</span>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>短網址已過期或被刪除</span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>原始網址已失效</span>
            </div>
          </div>
        </div>

        {/* 聯絡資訊 */}
        <div className="mt-6 text-sm text-gray-500">
          如果您認為這是一個錯誤，請檢查網址是否正確
        </div>
      </div>
    </div>
  );
} 