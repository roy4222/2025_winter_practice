import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * 角色圖片元件的屬性介面
 */
interface CharacterImageProps {
  onClick?: () => void; // 可選的點擊事件處理函數
}

/**
 * 角色圖片元件
 * 展示角色圖片並添加互動效果，包括懸停、呼吸光暈和動畫
 */
export const CharacterImage: React.FC<CharacterImageProps> = ({ onClick }) => {
  // 狀態管理
  const [isHovered, setIsHovered] = useState(false); // 追蹤滑鼠懸停狀態
  const [glowIntensity, setGlowIntensity] = useState(0.3); // 控制光暈效果的強度

  /**
   * 呼吸效果
   * 使用 useEffect 定期調整光暈強度，創造呼吸般的視覺效果
   */
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setGlowIntensity(prev => {
        // 在0.25和0.45之間呼吸變化，添加隨機性使效果更自然
        const newIntensity = prev + (Math.random() * 0.04 - 0.02);
        return Math.max(0.25, Math.min(0.45, newIntensity));
      });
    }, 800);

    // 清理定時器，防止記憶體洩漏
    return () => clearInterval(breathingInterval);
  }, []);

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{
        scale: 1.03, // 懸停時稍微放大
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)} // 設置懸停狀態為 true
      onHoverEnd={() => setIsHovered(false)} // 設置懸停狀態為 false
      onClick={onClick} // 傳遞點擊事件
    >
      {/* 外層光芒效果 - 創造柔和的背景光暈 */}
      <div 
        className="absolute -inset-8 rounded-full bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 blur-xl"
        style={{ opacity: glowIntensity }} // 動態調整透明度
      ></div>
      
      {/* 內層光芒效果 - 提供更集中的光暈 */}
      <div 
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 blur-lg"
        style={{ opacity: glowIntensity + 0.1 }} // 比外層稍亮
      ></div>

      {/* 光環效果 - 僅在互動時顯示，增強視覺反饋 */}
      {isHovered && (
        <motion.div
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 opacity-60 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      {/* 圖片容器 - 確保圖片在所有效果之上顯示 */}
      <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative">
          <Image
            src="/images/傲嬌版.png"
            alt="馬剃天愛星角色圖片"
            width={400}
            height={600}
            className="transition-all duration-300"
            style={{ 
              objectFit: 'contain',
              filter: isHovered ? 'brightness(1.08) contrast(1.03)' : 'brightness(1.02)' // 懸停時增強亮度和對比度
            }}
            priority // 優先載入此圖片
          />

          {/* 星光效果 - 添加靜態裝飾元素，增強角色的魔法感 */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse" 
               style={{ boxShadow: '0 0 10px 2px rgba(255,255,255,0.7)' }}></div>
          <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse" 
               style={{ animationDelay: '0.5s', boxShadow: '0 0 8px 2px rgba(255,255,255,0.6)' }}></div>
          <div className="absolute bottom-30 right-30 w-1.5 h-1.5 bg-white rounded-full animate-twinkle" 
               style={{ animationDelay: '1.2s', boxShadow: '0 0 12px 3px rgba(255,255,255,0.5)' }}></div>
        </div>
      </div>

      {/* 裝飾元素 - 懸停時顯示的互動標籤 */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-6 -right-4 bg-pink-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md"
        >
          傲嬌中...
        </motion.div>
      )}
    </motion.div>
  );
};

export default CharacterImage; 