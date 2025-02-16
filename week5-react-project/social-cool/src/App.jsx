// App 組件：應用程序的主要入口點
function App() {
  return (
    // 外層容器：使用 Tailwind 設置最小高度、背景漸變和內容居中
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      {/* 內容卡片：白色背景、圓角和陰影效果 */}
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        {/* 標題：使用大字體和強調色 */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          歡迎使用 <span className="text-indigo-600">TailwindCSS</span>
        </h1>
        {/* 描述文字 */}
        <p className="text-gray-600 mb-8">
          這是一個展示各種 Tailwind CSS 實用工具的進階示例。本示例包含了響應式設計、自定義樣式和交互效果。
        </p>
        {/* 表單元素容器 */}
        <div className="space-y-4">
          {/* 輸入框：自定義邊框和焦點效果 */}
          <input
            type="text"
            placeholder="輸入您的姓名"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          />
          {/* 下拉選單：自定義樣式和箭頭 */}
          <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white">
            <option>選擇您的偏好</option>
            <option>選項 1</option>
            <option>選項 2</option>
            <option>選項 3</option>
          </select>
          {/* 提交按鈕：自定義背景、懸停效果和轉換動畫 */}
          <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            提交
          </button>
        </div>
        {/* 底部信息：幫助文字和聯繫鏈接 */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">需要幫助？</span>
          <a href="#" className="text-sm text-indigo-600 hover:underline">聯繫我們</a>
        </div>
      </div>
    </div>
  );
}

export default App;
