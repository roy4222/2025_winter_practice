import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * 聊天氣泡元件的屬性介面
 */
interface ChatBubbleProps {
  message: string;      // 要顯示的訊息內容
  typingSpeed?: number; // 打字速度（毫秒/字元）
  onComplete?: () => void; // 打字完成後的回調函數
}

/**
 * 聊天氣泡元件
 * 
 * 此元件用於顯示帶有打字機效果的聊天訊息，創造逐字顯示的視覺效果
 * 
 * @param props - 聊天氣泡的配置選項
 * @returns 具有動畫效果的聊天氣泡元素
 */
export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  typingSpeed = 50,     // 預設每50毫秒顯示一個字元
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState(''); // 目前顯示的文字
  const [isTyping, setIsTyping] = useState(true);         // 是否正在打字中

  /**
   * 打字機效果
   * 使用 useEffect 實現逐字顯示文字的效果
   */
  useEffect(() => {
    let currentIndex = 0;  // 追蹤目前處理到的字元索引
    setDisplayedText('');  // 重置顯示文字
    setIsTyping(true);     // 設置為打字中狀態

    // 設定打字間隔 - 定期添加一個字元到顯示文字中
    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        // 將下一個字元添加到已顯示的文字中
        setDisplayedText((prev) => prev + message[currentIndex]);
        currentIndex++;
      } else {
        // 文字已全部顯示，清除間隔並更新狀態
        clearInterval(typingInterval);
        setIsTyping(false);
        // 如果提供了完成回調函數，則調用它
        if (onComplete) onComplete();
      }
    }, typingSpeed);

    // 清理函數 - 當組件卸載或依賴項變更時清除打字間隔
    return () => clearInterval(typingInterval);
  }, [message, typingSpeed, onComplete]); // 依賴項：當這些值變更時重新執行效果

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}  // 初始狀態：不可見、向上偏移、縮小
      animate={{ opacity: 1, y: 0, scale: 1 }}      // 動畫目標：完全可見、原位置、原大小
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // 彈簧動畫效果
      className="chat-bubble chat-bubble-appear"    // 應用CSS類名
    >
      <p className="text-xl md:text-2xl font-medium relative">
        {displayedText || ''}  {/* 顯示當前已打出的文字 */}
        {isTyping && (
          <span className="absolute inline-block w-2 h-6 ml-1 bg-gray-500 animate-pulse">
            &nbsp;  {/* 打字光標效果，僅在打字過程中顯示 */}
          </span>
        )}
      </p>
    </motion.div>
  );
};

export default ChatBubble; 