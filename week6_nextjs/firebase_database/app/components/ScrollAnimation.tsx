"use client"; // 聲明這是客戶端組件，允許使用React hooks和瀏覽器API

import { ReactNode } from "react"; // 導入ReactNode類型，用於定義子組件的類型
import { motion, useAnimation } from "framer-motion"; // 導入framer-motion動畫庫的組件和鉤子
import { useInView } from "react-intersection-observer"; // 導入檢測元素是否在視窗內的鉤子
import { useEffect } from "react"; // 導入React的useEffect鉤子用於處理副作用

// 定義動畫變體類型，用於指定不同的動畫效果
type AnimationVariant = 
  | "fadeIn"    // 淡入效果
  | "slideUp"   // 向上滑動效果
  | "slideRight" // 向右滑動效果
  | "slideLeft" // 向左滑動效果
  | "scale"     // 縮放效果
  | "flip";     // 翻轉效果

// 定義組件的屬性接口
interface ScrollAnimationProps {
  children: ReactNode;       // 子組件，要應用動畫的內容
  variant?: AnimationVariant; // 動畫變體類型，可選，默認為fadeIn
  delay?: number;            // 動畫延遲時間（秒），可選
  duration?: number;         // 動畫持續時間（秒），可選
  threshold?: number;        // 元素可見比例觸發閾值（0-1），可選
  className?: string;        // 額外的CSS類名，可選
}

/**
 * 滾動觸發動畫組件
 * 當元素進入視窗時觸發動畫效果
 * 
 * @param {Object} props - 組件屬性
 * @param {ReactNode} props.children - 子組件，要應用動畫的內容
 * @param {AnimationVariant} props.variant - 動畫變體類型
 * @param {number} props.delay - 動畫延遲時間（秒）
 * @param {number} props.duration - 動畫持續時間（秒）
 * @param {number} props.threshold - 元素可見比例觸發閾值（0-1）
 * @param {string} props.className - 額外的CSS類名
 * @returns {JSX.Element} 帶有滾動觸發動畫的元素
 */
export default function ScrollAnimation({
  children,
  variant = "fadeIn", // 默認動畫效果為淡入
  delay = 0,          // 默認無延遲
  duration = 0.5,     // 默認動畫持續0.5秒
  threshold = 0.1,    // 默認當元素10%進入視窗時觸發
  className = ""      // 默認無額外類名
}: ScrollAnimationProps) {
  // 創建動畫控制器，用於手動控制動畫狀態
  const controls = useAnimation();
  
  // 使用useInView鉤子檢測元素是否在視窗內
  // ref: 附加到要觀察的DOM元素的引用
  // inView: 布爾值，表示元素是否在視窗內
  const [ref, inView] = useInView({
    threshold,       // 設置可見閾值
    triggerOnce: true, // 設置動畫只觸發一次，避免重複播放
  });

  // 當元素進入視窗時，開始播放動畫
  useEffect(() => {
    if (inView) {
      controls.start("visible"); // 元素可見時，將動畫狀態設為"visible"
    }
  }, [controls, inView]); // 依賴項：當controls或inView變化時重新執行

  // 定義動畫變體，包含初始狀態(hidden)和可見狀態(visible)
  const variants = {
    // 初始隱藏狀態，根據不同的動畫類型設置不同的初始值
    hidden: {
      opacity: 0, // 所有動畫類型都從透明開始
      y: variant === "slideUp" ? 50 : 0, // 如果是向上滑動，初始Y偏移50px
      x: variant === "slideRight" ? -50 : variant === "slideLeft" ? 50 : 0, // 水平滑動的X偏移
      scale: variant === "scale" ? 0.8 : 1, // 如果是縮放效果，初始縮小到0.8倍
      rotateX: variant === "flip" ? 90 : 0, // 如果是翻轉效果，初始旋轉90度
    },
    // 可見狀態，所有屬性恢復正常
    visible: {
      opacity: 1, // 完全不透明
      y: 0,       // 無垂直偏移
      x: 0,       // 無水平偏移
      scale: 1,   // 原始大小
      rotateX: 0, // 無旋轉
      transition: {
        duration, // 使用傳入的動畫持續時間
        delay,    // 使用傳入的延遲時間
        ease: "easeOut", // 使用easeOut緩動函數，使動畫結束時更平滑
      }
    }
  };

  // 返回motion.div包裝的子元素，應用動畫效果
  return (
    <motion.div
      ref={ref}           // 附加ref用於檢測可見性
      initial="hidden"    // 初始狀態為hidden
      animate={controls}  // 動畫狀態由controls控制
      variants={variants} // 使用上面定義的動畫變體
      className={className} // 應用傳入的額外類名
    >
      {children} {/* 渲染子組件 */}
    </motion.div>
  );
} 