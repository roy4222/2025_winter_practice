import PropTypes from 'prop-types';

// CarouselControls 組件：用於控制輪播的播放和暫停
export default function CarouselControls({ isPlaying, onTogglePlay }) {
  return (
    // 控制按鈕的容器
    <div className="carousel-controls">
      {/* 播放/暫停按鈕 */}
      <button 
        // 根據播放狀態動態設置按鈕的 class
        className={`play-button ${isPlaying ? 'playing' : ''}`} 
        // 點擊時觸發切換播放狀態的函數
        onClick={onTogglePlay}
      >
        {/* 根據播放狀態顯示不同的按鈕文字 */}
        {isPlaying ? '暫停' : '播放'}
      </button>
    </div>
  );
}

// 定義 CarouselControls 組件的 PropTypes
CarouselControls.propTypes = {
  // isPlaying: 布爾值，表示當前是否正在播放
  isPlaying: PropTypes.bool.isRequired,
  // onTogglePlay: 函數，用於切換播放/暫停狀態
  onTogglePlay: PropTypes.func.isRequired,
};
