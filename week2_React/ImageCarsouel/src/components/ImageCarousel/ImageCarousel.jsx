import { useState, useEffect, useCallback } from 'react';
import { images } from '../../data/images';
import CarouselMain from './CarouselMain';
import CarouselControls from './CarouselControls';
import CarouselThumbnails from './CarouselThumbnails';
import './styles/ImageCarousel.css';

export default function ImageCarousel() {
  // 使用 useState 鉤子管理組件狀態
  const [currentIndex, setCurrentIndex] = useState(0); // 當前顯示的圖片索引
  const [isPlaying, setIsPlaying] = useState(true);    // 是否正在自動播放

  // 使用 useEffect 鉤子處理自動播放邏輯
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      // 設置定時器，每3秒切換到下一張圖片
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    // 返回清理函數，在組件卸載或依賴項變化時清除定時器
    return () => clearInterval(intervalId);
  }, [isPlaying]); // 依賴項為 isPlaying，當其變化時重新執行 effect

  // 使用 useCallback 鉤子優化性能，避免不必要的重渲染
  // 切換播放狀態的回調函數
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // 切換到指定圖片的回調函數
  const goToImage = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // 切換到上一張圖片的回調函數
  const prevImage = useCallback(() => {
    setCurrentIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, []);

  // 切換到下一張圖片的回調函數
  const nextImage = useCallback(() => {
    setCurrentIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, []);

  // 渲染輪播組件
  return (
    <div className="carousel-container">
      <CarouselMain 
        images={images}
        currentIndex={currentIndex}
        onPrev={prevImage}
        onNext={nextImage}
      />
      <CarouselControls 
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />
      <CarouselThumbnails 
        images={images}
        currentIndex={currentIndex}
        onSelect={goToImage}
      />
    </div>
  );
}
