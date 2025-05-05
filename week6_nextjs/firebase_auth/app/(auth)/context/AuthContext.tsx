"use client";

/**
 * 認證上下文模組
 * 
 * 提供整個應用程式的認證狀態管理和相關功能，包括：
 * - 用戶登入/註冊/登出
 * - 第三方認證（Google、GitHub）
 * - 認證狀態監聽
 * - 錯誤處理
 */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../../service/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * 定義認證上下文的類型
 * @interface AuthContextType
 * @property {User | null} currentUser - 目前登入的用戶，未登入時為 null
 * @property {boolean} loading - 指示認證操作是否正在進行中
 * @property {string} error - 認證過程中的錯誤訊息
 * @property {Function} signIn - 電子郵件密碼登入方法
 * @property {Function} signUp - 電子郵件密碼註冊方法
 * @property {Function} signOut - 登出方法
 * @property {Function} socialSignIn - 第三方登入方法
 * @property {Function} clearError - 清除錯誤訊息方法
 */
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  socialSignIn: (provider: "google" | "github") => Promise<void>;
  clearError: () => void;
}

// 創建認證上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 認證提供者的Props類型
 * @interface AuthProviderProps
 * @property {ReactNode} children - 子組件
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 認證提供者組件
 * 提供認證狀態和方法的組件，包裝整個應用程式
 * 
 * @param {AuthProviderProps} props - 組件屬性
 * @returns {JSX.Element} 認證提供者組件
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true); // 用於初始加載時的狀態
  const [error, setError] = useState<string>("");
  const router = useRouter();

  /**
   * 監聽用戶登入狀態變化
   * 當用戶登入狀態改變時更新 currentUser
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false); // 初始加載完成
    });

    // 清理函數，當組件卸載時取消監聽
    return () => unsubscribe();
  }, []);

  /**
   * 清除錯誤訊息
   * 在進行新的認證操作前調用
   */
  const clearError = () => {
    setError("");
  };

  /**
   * 用戶登入方法
   * 使用電子郵件和密碼進行登入
   * 
   * @param {string} email - 用戶電子郵件
   * @param {string} password - 用戶密碼
   */
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("登入成功！");
      router.push('/');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 用戶註冊方法
   * 使用電子郵件和密碼創建新帳號
   * 
   * @param {string} email - 用戶電子郵件
   * @param {string} password - 用戶密碼
   */
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("註冊成功！");
      router.push('/');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 第三方登入方法
   * 支援 Google 和 GitHub 登入
   * 
   * @param {string} providerName - 提供者名稱，"google" 或 "github"
   */
  const socialSignIn = async (providerName: "google" | "github") => {
    setLoading(true);
    setError("");
    
    try {
      const provider = providerName === "google" 
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();
      
      await signInWithPopup(auth, provider);
      toast.success(`${providerName === "google" ? "Google" : "GitHub"} 登入成功！`);
      router.push('/');
    } catch (err) {
      handleSocialAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 登出方法
   * 結束當前用戶的登入狀態
   */
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("已成功登出");
    } catch (err) {
      console.error("登出錯誤:", err);
      toast.error("登出時發生錯誤");
    }
  };

  /**
   * 處理認證錯誤
   * 將 Firebase 認證錯誤轉換為用戶友好的錯誤訊息
   * 
   * @param {unknown} err - 錯誤物件
   */
  const handleAuthError = (err: unknown) => {
    let errorMessage = "發生錯誤";
    if (err instanceof Error) {
      if (err.message.includes("auth/email-already-in-use")) {
        errorMessage = "此電子郵件已被使用";
      } else if (err.message.includes("auth/weak-password")) {
        errorMessage = "密碼強度不足";
      } else if (err.message.includes("auth/invalid-email")) {
        errorMessage = "無效的電子郵件地址";
      } else if (err.message.includes("auth/user-not-found") || 
                err.message.includes("auth/wrong-password")) {
        errorMessage = "電子郵件或密碼錯誤";
      } else {
        errorMessage = err.message;
      }
    }
    setError(errorMessage);
    toast.error(errorMessage);
  };

  /**
   * 處理第三方登入錯誤
   * 將第三方登入相關的錯誤轉換為用戶友好的錯誤訊息
   * 
   * @param {unknown} err - 錯誤物件
   */
  const handleSocialAuthError = (err: unknown) => {
    let errorMessage = "第三方登入失敗";
    if (err instanceof Error) {
      if (err.message.includes("auth/account-exists-with-different-credential")) {
        errorMessage = "此電子郵件已經使用不同的登入方式註冊";
      } else if (err.message.includes("auth/popup-closed-by-user")) {
        errorMessage = "登入視窗已被關閉";
      } else if (err.message.includes("auth/cancelled-popup-request")) {
        errorMessage = "登入請求已取消";
      } else if (err.message.includes("auth/popup-blocked")) {
        errorMessage = "登入視窗被阻擋，請允許彈出視窗";
      } else {
        errorMessage = err.message;
      }
    }
    setError(errorMessage);
    toast.error(errorMessage);
  };

  // 提供上下文值
  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    socialSignIn,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}

/**
 * 自定義Hook，用於在組件中訪問認證上下文
 * 必須在 AuthProvider 內部使用
 * 
 * @returns {AuthContextType} 認證上下文
 * @throws {Error} 如果在 AuthProvider 外部使用
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth 必須在 AuthProvider 內部使用");
  }
  return context;
} 