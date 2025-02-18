// Header 組件：網站的頂部導航欄
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebase from '../utils/firebase';
import { motion, AnimatePresence } from 'framer-motion';

// 預設頭像URL
const DEFAULT_AVATAR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCvBNjFR_6BVhW3lFNwF0oEk2N8JXjeiaSqg&s';

export default function Header() {
    // 定義狀態變量和鉤子
    const [user, setUser] = useState(null);  // 用戶狀態
    const [showNotification, setShowNotification] = useState(false);  // 通知顯示狀態
    const [notificationMessage, setNotificationMessage] = useState('');  // 通知消息
    const [showDropdown, setShowDropdown] = useState(false);  // 下拉菜單顯示狀態
    const navigate = useNavigate();  // 用於頁面導航
    const auth = getAuth(firebase);  // 獲取 Firebase 認證實例
    const dropdownRef = useRef(null);  // 下拉菜單的引用

    useEffect(() => {
        // 監聽用戶登入狀態
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);  // 更新用戶狀態
        });

        // 點擊外部關閉下拉選單
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);  // 關閉下拉菜單
            }
        };

        // 添加點擊事件監聽器
        document.addEventListener('mousedown', handleClickOutside);

        // 清理函數：取消訂閱和移除事件監聽器
        return () => {
            unsubscribe();
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [auth]);

    // 處理登出
    const handleSignOut = async () => {
        try {
            await signOut(auth);  // 執行登出
            setNotificationMessage('登出成功！');  // 設置成功消息
            setShowNotification(true);  // 顯示通知
            setTimeout(() => setShowNotification(false), 3000);  // 3秒後隱藏通知
            navigate('/sign');  // 導航到登入頁
        } catch (error) {
            console.error('登出錯誤:', error);  // 記錄錯誤
        }
    };

    return (
        // 導航欄容器，使用白色背景和陰影效果，固定在頂部
        <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
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
                    </div>
                    
                    {/* 中間搜索欄 */}
                    <div className="flex-1 mx-8">
                        <div className="relative">
                            <input 
                                type="text" 
                                className="w-full border rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" 
                                placeholder="搜尋..." 
                            />
                            <button className="absolute right-0 top-0 mt-2 mr-4">
                                <svg 
                                    className="h-5 w-5 text-gray-400" 
                                    fill="none" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* 右側用戶區域 */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            // 如果用戶已登入，顯示頭像和下拉選單
                            <div className="relative" ref={dropdownRef}>
                                {/* 頭像按鈕，點擊時切換下拉選單的顯示狀態 */}
                                <button 
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="focus:outline-none"
                                >
                                    <img 
                                        src={user.photoURL || DEFAULT_AVATAR}
                                        alt="用戶頭像" 
                                        className="w-10 h-10 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors duration-200"
                                    />
                                </button>
                                
                                {/* 下拉選單，使用 AnimatePresence 實現動畫效果 */}
                                <AnimatePresence>
                                    {showDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                                        >
                                            {/* 用戶資訊區塊 */}
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-700">
                                                    {user.displayName || '使用者'}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                            {/* 個人資料連結 */}
                                            <Link 
                                                to="/profile" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                個人資料
                                            </Link>
                                            {/* 登出按鈕 */}
                                            <button 
                                                onClick={() => {
                                                    handleSignOut();
                                                    setShowDropdown(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                登出
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            // 如果用戶未登入，顯示登入和註冊按鈕
                            <div className="flex space-x-4">
                                <Link 
                                    to="/sign" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    登入
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                                >
                                    註冊
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 通知提示：當 showNotification 為 true 時顯示 */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        // 初始狀態：完全透明且向上偏移 50px
                        initial={{ opacity: 0, y: -50 }}
                        // 動畫結束狀態：完全不透明且回到原位
                        animate={{ opacity: 1, y: 0 }}
                        // 退場動畫：恢復到初始狀態
                        exit={{ opacity: 0, y: -50 }}
                        // 固定位置、顏色、內邊距、圓角和陰影樣式
                        className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
                    >
                        {/* 顯示通知訊息 */}
                        {notificationMessage}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}