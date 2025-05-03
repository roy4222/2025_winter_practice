import { useState, useEffect } from 'react';

/**
 * 打字機效果的選項介面
 */
interface UseTypingEffectOptions {
  text: string;         // 要顯示的文字內容
  typingSpeed?: number; // 打字速度（毫秒/字元）
  startDelay?: number;  // 開始打字前的延遲時間（毫秒）
}

/**
 * 打字機效果的自定義Hook
 * 
 * 此Hook用於創建逐字顯示文字的打字機效果，常用於聊天氣泡或角色對話
 * 
 * @param options - 打字機效果的配置選項
 * @returns 包含當前顯示文字、打字狀態和完成狀態的物件
 */
export const useTypingEffect = ({
  text,
  typingSpeed = 50,     // 預設每50毫秒顯示一個字元
  startDelay = 0,       // 預設無延遲立即開始
}: UseTypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState(''); // 目前顯示的文字
  const [isTyping, setIsTyping] = useState(false);        // 是否正在打字中
  const [isDone, setIsDone] = useState(false);            // 是否已完成打字

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    // 重置狀態 - 每當文字內容變更時重新開始
    setDisplayedText('');
    setIsTyping(false);
    setIsDone(false);
    
    // 設定開始延遲 - 等待指定時間後開始打字效果
    timer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;  // 追蹤目前處理到的字元索引

      // 設定打字間隔 - 定期添加一個字元到顯示文字中
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          // 將下一個字元添加到已顯示的文字中
          setDisplayedText((prev) => prev + text[currentIndex]);
          currentIndex++;
        } else {
          // 文字已全部顯示，清除間隔並更新狀態
          clearInterval(typingInterval);
          setIsTyping(false);
          setIsDone(true);
        }
      }, typingSpeed);

      // 清理函數 - 當組件卸載或依賴項變更時清除打字間隔
      return () => clearInterval(typingInterval);
    }, startDelay);

    // 清理函數 - 當組件卸載或依賴項變更時清除延遲計時器
    return () => clearTimeout(timer);
  }, [text, typingSpeed, startDelay]); // 依賴項：當這些值變更時重新執行效果

  // 返回當前狀態供組件使用
  return { displayedText, isTyping, isDone };
};

export default useTypingEffect; 