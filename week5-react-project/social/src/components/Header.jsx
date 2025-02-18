// Header 組件：網站的頂部導航欄
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export default function Header() {
    return (
        // 導航欄容器，使用白色背景和陰影效果
        <nav className="bg-white shadow-lg">
            {/* 內容限制寬度並置中 */}
            <div className="max-w-6xl mx-auto px-4">
                {/* Flex 容器，用於排列導航欄內的元素 */}
                <div className="flex justify-between items-center py-4">
                    {/* 左側 Logo 和網站名稱，以及頁面連結 */}
                    <div className="flex items-center space-x-6">
                        <Link to={ROUTES.HOME} className="flex items-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu6w1L1n_jpEO94b80gNhWHTvkpCtCHvui2Q&s" alt="Logo" className="h-8 w-auto mr-4" />
                            <span className="font-semibold text-xl text-gray-800">Social Platform</span>
                        </Link>
                        <Link to={ROUTES.HOME} className="text-gray-600 hover:text-gray-900">首頁</Link>
                        <Link to="/explore" className="text-gray-600 hover:text-gray-900">探索</Link>
                        <Link to="/messages" className="text-gray-600 hover:text-gray-900">訊息</Link>
                        <Link to="/profile" className="text-gray-600 hover:text-gray-900">個人檔案</Link>
                    </div>
                    
                    {/* 中間搜索欄 */}
                    <div className="flex-1 mx-8">
                        <div className="relative">
                            {/* 搜索輸入框 */}
                            <input 
                                type="text" 
                                className="w-full border rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" 
                                placeholder="搜尋..." 
                            />
                            {/* 搜索按鈕 */}
                            <button className="absolute right-0 top-0 mt-2 mr-4">
                                {/* 搜索圖標 SVG */}
                                <svg 
                                    className="h-5 w-5 text-gray-400" 
                                    fill="none" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* 右側登入和註冊按鈕 */}
                    <div className="flex items-center">
                        {/* 登入連結 */}
                        <Link to={ROUTES.SIGN} className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                            登入
                        </Link>
                        {/* 註冊按鈕 */}
                        <Link to={ROUTES.REGISTER} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-2">
                            註冊
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}