import { useRef, useEffect, ReactNode, useState } from 'react';

/**
 * 動畫元素元件的屬性介面
 */
interface AnimatedElementProps {
  children: ReactNode;                                    // 子元素內容
  animation: 'float' | 'fadeIn' | 'slideUp' | 'pulse' | 'surprise'; // 動畫類型
  delay?: number;                                         // 動畫延遲時間（毫秒）
  duration?: number;                                      // 動畫持續時間（毫秒）
  className?: string;                                     // 自定義CSS類名
  id?: string;                                            // 元素ID
  easing?: string;                                        // 動畫緩動函數
  loop?: boolean | number;                                // 循環次數（true為無限循環）
}

/**
 * 動畫元素元件
 * 
 * 此元件用於為子元素添加各種預定義的動畫效果，如淡入、上滑、脈動等
 * 支持自定義動畫參數，如延遲、持續時間、緩動函數和循環
 * 
 * @param props - 動畫元素的配置選項
 * @returns 包含動畫效果的React元素
 */
export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation,
  delay = 0,                                              // 預設無延遲
  duration = 1000,                                        // 預設動畫持續1秒
  className = '',                                         // 預設無額外類名
  id,
  easing = 'ease-out',                                    // 預設緩動函數
  loop = false,                                           // 預設不循環
}) => {
  const elementRef = useRef<HTMLDivElement>(null);        // 引用DOM元素
  const [animationClass, setAnimationClass] = useState(''); // 動畫CSS類名狀態
  const [isVisible, setIsVisible] = useState(false);      // 元素可見性狀態

  useEffect(() => {
    // 設定延遲後顯示元素
    const timer = setTimeout(() => {
      setIsVisible(true);  // 設置元素為可見
      
      // 根據不同的動畫類型設定不同的 CSS 類別
      switch(animation) {
        case 'fadeIn':
          setAnimationClass('animate-fadeIn');            // 淡入動畫
          break;
        case 'slideUp':
          setAnimationClass('animate-slideUp');           // 上滑動畫
          break;
        case 'pulse':
          setAnimationClass('animate-pulse');             // 脈動動畫
          break;
        case 'float':
          setAnimationClass('animate-floating');          // 浮動動畫
          break;
        case 'surprise':
          setAnimationClass('animate-surprise');          // 驚喜動畫
          break;
        default:
          setAnimationClass('animate-fadeIn');            // 預設使用淡入動畫
      }
    }, delay);  // 根據指定的延遲時間執行

    // 清理函數 - 組件卸載時清除計時器
    return () => clearTimeout(timer);
  }, [animation, delay]);  // 依賴項 - 當動畫類型或延遲時間變更時重新執行
  
  // 基本樣式 - 控制元素的不透明度和過渡效果
  const baseStyle = {
    opacity: isVisible ? 1 : 0,                           // 根據可見性狀態設置不透明度
    transition: `all ${duration/1000}s ${easing}`,        // 設置過渡效果
  };

  /**
   * 根據動畫類型生成特定的行內樣式
   * 
   * @returns 特定動畫類型的樣式對象
   */
  const getAnimationStyle = () => {
    if (!isVisible) return {};  // 如果元素不可見，返回空對象
    
    // 處理循環設置 - true表示無限循環，數字表示循環次數
    const loopValue = loop === true ? 'infinite' : (loop || '1');
    
    // 根據動畫類型返回對應的樣式
    switch(animation) {
      case 'slideUp':
        return {
          transform: 'translateY(0)',                     // 上滑到目標位置
          transition: `opacity ${duration/1000}s ${easing}, transform ${duration/1000}s ${easing}`, // 同時控制不透明度和位移的過渡
        };
      case 'float':
        return {
          animation: `floating ${loopValue} ${duration/1000}s ease-in-out`, // 浮動動畫
        };
      case 'pulse':
        return {
          animation: `pulse ${loopValue} ${duration/1000}s ease-in-out`,    // 脈動動畫
        };
      default:
        return {};  // 其他動畫類型使用默認樣式
    }
  };

  // 合併基本樣式和特定動畫樣式
  const style = {
    ...baseStyle,
    ...getAnimationStyle(),
  };

  // 設置初始樣式 - 僅針對上滑動畫設置初始位置
  const initialStyle = animation === 'slideUp' ? { transform: 'translateY(30px)' } : {};

  return (
    <div 
      ref={elementRef}                                    // 設置DOM引用
      className={`${className || ''} ${animationClass || ''}`}  // 合併自定義類名和動畫類名
      id={id}                                             // 設置元素ID
      style={{...style, ...initialStyle}}                 // 應用所有樣式
    >
      {children}                                          
    </div>
  );
};

export default AnimatedElement; 