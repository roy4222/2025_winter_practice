import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CharacterImageProps {
  onClick?: () => void;
}

export const CharacterImage: React.FC<CharacterImageProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.3);

  // 添加呼吸效果
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setGlowIntensity(prev => {
        // 在0.25和0.45之間呼吸變化
        const newIntensity = prev + (Math.random() * 0.04 - 0.02);
        return Math.max(0.25, Math.min(0.45, newIntensity));
      });
    }, 800);

    return () => clearInterval(breathingInterval);
  }, []);

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 外層光芒效果 */}
      <div 
        className="absolute -inset-8 rounded-full bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 blur-xl"
        style={{ opacity: glowIntensity }}
      ></div>
      
      {/* 內層光芒效果 */}
      <div 
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 blur-lg"
        style={{ opacity: glowIntensity + 0.1 }}
      ></div>

      {/* 光環效果 - 互動時 */}
      {isHovered && (
        <motion.div
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 opacity-60 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
        />
      )}
      
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
              filter: isHovered ? 'brightness(1.08) contrast(1.03)' : 'brightness(1.02)'
            }}
            priority
          />

          {/* 星光效果 - 靜態裝飾 */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse" 
               style={{ boxShadow: '0 0 10px 2px rgba(255,255,255,0.7)' }}></div>
          <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse" 
               style={{ animationDelay: '0.5s', boxShadow: '0 0 8px 2px rgba(255,255,255,0.6)' }}></div>
          <div className="absolute bottom-30 right-30 w-1.5 h-1.5 bg-white rounded-full animate-twinkle" 
               style={{ animationDelay: '1.2s', boxShadow: '0 0 12px 3px rgba(255,255,255,0.5)' }}></div>
        </div>
      </div>

      {/* 裝飾元素 */}
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