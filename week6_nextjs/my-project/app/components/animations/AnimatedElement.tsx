import { useRef, useEffect, ReactNode, useState } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  animation: 'float' | 'fadeIn' | 'slideUp' | 'pulse' | 'surprise';
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
  easing?: string;
  loop?: boolean | number;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation,
  delay = 0,
  duration = 1000,
  className = '',
  id,
  easing = 'ease-out',
  loop = false,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [animationClass, setAnimationClass] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 設定延遲後顯示元素
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // 根據不同的動畫類型設定不同的 CSS 類別
      switch(animation) {
        case 'fadeIn':
          setAnimationClass('animate-fadeIn');
          break;
        case 'slideUp':
          setAnimationClass('animate-slideUp');
          break;
        case 'pulse':
          setAnimationClass('animate-pulse');
          break;
        case 'float':
          setAnimationClass('animate-floating');
          break;
        case 'surprise':
          setAnimationClass('animate-surprise');
          break;
        default:
          setAnimationClass('animate-fadeIn');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [animation, delay]);
  
  // 基本樣式
  const baseStyle = {
    opacity: isVisible ? 1 : 0,
    transition: `all ${duration/1000}s ${easing}`,
  };

  // 根據動畫類型添加特定的行內樣式
  const getAnimationStyle = () => {
    if (!isVisible) return {};
    
    const loopValue = loop === true ? 'infinite' : (loop || '1');
    
    switch(animation) {
      case 'slideUp':
        return {
          transform: 'translateY(0)',
          transition: `opacity ${duration/1000}s ${easing}, transform ${duration/1000}s ${easing}`,
        };
      case 'float':
        return {
          animation: `floating ${loopValue} ${duration/1000}s ease-in-out`,
        };
      case 'pulse':
        return {
          animation: `pulse ${loopValue} ${duration/1000}s ease-in-out`,
        };
      default:
        return {};
    }
  };

  const style = {
    ...baseStyle,
    ...getAnimationStyle(),
  };

  const initialStyle = animation === 'slideUp' ? { transform: 'translateY(30px)' } : {};

  return (
    <div 
      ref={elementRef} 
      className={`${className || ''} ${animationClass || ''}`} 
      id={id}
      style={{...style, ...initialStyle}}
    >
      {children}
    </div>
  );
};

export default AnimatedElement; 