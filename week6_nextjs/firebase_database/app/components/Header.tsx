"use client";

/**
 * 舊的頁面頂部導航欄組件 - 已重構
 * 
 * 此組件已被重構並移至 app/components/HeaderRefactored.tsx
 * 用戶認證相關邏輯已移至專門的組件中：
 * - app/(auth)/components/HeaderUserSection.tsx (桌面版用戶區域)
 * - app/(auth)/components/MobileUserSection.tsx (行動裝置用戶區域)
 * 
 * 請使用新的 HeaderRefactored 組件替代此組件，新組件提供：
 * - 與 AuthContext 的集成
 * - 更清晰的組件分離
 * - 更好的代碼組織
 * 
 * 使用方法示例：
 * ```
 * import HeaderRefactored from './components/HeaderRefactored';
 * 
 * // 在佈局中使用
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <HeaderRefactored />
 *       {children}
 *     </>
 *   );
 * }
 * ```
 * 
 * 詳細信息請參閱: app/(auth)/components/Read.md
 */

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  
  // 顯示提示信息，並在一段時間後刷新頁面以使用新組件
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="w-full text-center bg-yellow-50 rounded-lg border border-yellow-200 p-4">
            <h2 className="text-xl font-bold mb-1 text-yellow-700">組件已更新</h2>
            <p className="text-yellow-700">
              此組件已被重構為新的 HeaderRefactored 組件。
              頁面將在幾秒鐘後自動重新載入...
            </p>
          </div>
        </div>
      </div>
    </header>
  );
} 