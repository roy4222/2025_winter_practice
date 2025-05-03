import { useEffect, useRef, useState } from 'react';

/**
 * anime.js 動畫效果的選項介面
 */
interface UseAnimeEffectOptions {
  targets: string;                           // CSS 選擇器，指定動畫目標元素
  effects: 'pulse' | 'bounce' | 'sparkle' | 'shake'; // 預定義的動畫效果類型
  delay?: number;                            // 動畫開始前的延遲時間（毫秒）
  duration?: number;                         // 動畫持續時間（毫秒）
  loop?: boolean;                            // 是否循環播放動畫
}

/**
 * 使用 CSS 動畫替代 anime.js 的自定義 Hook
 * 
 * 此 Hook 提供簡單的介面來應用預定義的動畫效果到指定元素
 * 
 * @param options - 動畫效果的配置選項
 * @returns 包含控制動畫的方法（播放、暫停、重新開始）
 */
export const useAnimeEffect = ({
  targets,
  effects,
  delay = 0,                                 // 預設無延遲
  duration = 1000,                           // 預設動畫持續 1 秒
  loop = false,                              // 預設不循環
}: UseAnimeEffectOptions) => {
  const targetRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 初始化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 使用 querySelector 獲取目標元素
      const element = document.querySelector(targets) as HTMLElement;
      if (element) {
        targetRef.current = element;
      }
    }
  }, [targets]);

  // 應用動畫
  const applyAnimation = (element: HTMLElement, animationName: string) => {
    if (!element) return;
    
    // 應用相應的 CSS 動畫類
    element.style.animation = `${animationName} ${duration}ms ease-in-out ${loop ? 'infinite' : '1'}`;
    element.style.animationDelay = `${delay}ms`;
    setIsPlaying(true);
  };

  // 移除動畫
  const removeAnimation = (element: HTMLElement) => {
    if (!element) return;
    element.style.animation = '';
    setIsPlaying(false);
  };

  // 播放動畫
  const play = () => {
    if (!targetRef.current) return;
    
    let animationName = '';
    
    switch (effects) {
      case 'pulse': 
        animationName = 'pulse';
        break;
      case 'bounce':
        animationName = 'floating';
        break;
      case 'sparkle':
        animationName = 'starTwinkle';
        break;
      case 'shake':
        animationName = 'characterShake';
        break;
    }
    
    applyAnimation(targetRef.current, animationName);
  };

  // 暫停動畫
  const pause = () => {
    if (!targetRef.current) return;
    removeAnimation(targetRef.current);
  };

  // 重新開始動畫
  const restart = () => {
    pause();
    setTimeout(play, 10);
  };

  return { play, pause, restart, isPlaying };
};

export default useAnimeEffect; 