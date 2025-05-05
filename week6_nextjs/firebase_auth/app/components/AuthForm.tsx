"use client";

/**
 * 舊的身份驗證表單組件 - 已重構
 * 
 * 此組件已被重構並移至 app/(auth)/components/AuthFormRefactored.tsx
 * 
 * 請使用新的 AuthFormRefactored 組件替代此組件，新組件提供：
 * - 集中式的認證狀態管理
 * - 更好的錯誤處理
 * - 清晰的代碼組織
 * 
 * 使用方法示例：
 * ```
 * import AuthFormRefactored from '../(auth)/components/AuthFormRefactored';
 * 
 * export default function SignInPage() {
 *   return <AuthFormRefactored isLogin={true} />;
 * }
 * ```
 * 
 * 詳細信息請參閱: app/(auth)/components/Read.md
 */

import { useRouter } from "next/navigation";

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const router = useRouter();
  
  // 自動重定向到使用新組件的頁面
  if (isLogin) {
    router.push('/signin');
  } else {
    router.push('/signup');
  }
  
  return (
    <div className="w-full p-8 text-center bg-yellow-50 rounded-lg border border-yellow-200">
      <h2 className="text-xl font-bold mb-4 text-yellow-700">組件已更新</h2>
      <p className="mb-4 text-yellow-700">
        此組件已被重構為新的 AuthFormRefactored 組件。
        正在重定向到使用新組件的頁面...
      </p>
    </div>
  );
}