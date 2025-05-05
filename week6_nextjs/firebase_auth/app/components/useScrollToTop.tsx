"use client"; // 聲明這是客戶端組件

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * 自定義Hook，用於解決Next.js中固定頂部導航欄時頁面導航的問題
 * 在頁面切換時自動滾動到頂部，但保留瀏覽器的前進/後退導航時的滾動位置
 */
export function useScrollToTop() {
  const pathname = usePathname();
  const isStatePopped = useRef(false);

  // 監聽瀏覽器的popstate事件，用於識別使用者是否使用了瀏覽器的前進/後退按鈕
  useEffect(() => {
    const onPopState = () => (isStatePopped.current = true);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // 在路徑變化時執行滾動
  useEffect(() => {
    if (!isStatePopped.current) {
      // 如果不是通過瀏覽器的前進/後退按鈕導航的，則滾動到頂部
      window.scrollTo(0, 0);
    } else {
      // 重置狀態
      isStatePopped.current = false;
    }
  }, [pathname]);
} 