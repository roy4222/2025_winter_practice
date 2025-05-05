"use client"; // 聲明這是客戶端組件，允許使用React hooks和瀏覽器API

import { motion, AnimatePresence } from "framer-motion"; // 導入framer-motion動畫庫的組件
import { ReactNode } from "react"; // 導入ReactNode類型，用於定義子組件的類型
import { usePathname } from "next/navigation"; // 導入路徑鉤子，用於獲取當前路徑作為動畫的key

/**
 * 頁面模板組件
 * 每次頁面導航時重新渲染，提供平滑的頁面轉場效果
 * 在Next.js中，template.tsx與layout.tsx不同，template會在每次導航時重新創建實例
 * 
 * @param {Object} props - 組件屬性
 * @param {ReactNode} props.children - 子組件，代表頁面的實際內容
 * @returns {JSX.Element} 渲染的模板內容，包含動畫效果
 */
export default function Template({ children }: { children: ReactNode }) {
  // 獲取當前路徑作為動畫的key
  const pathname = usePathname();

  // 頁面轉場動畫配置
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 8
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      y: 8,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 