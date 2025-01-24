import PropTypes from 'prop-types';

// 定義 CarouselMain 組件，用於顯示主要的輪播圖片和導航按鈕
export default function CarouselMain({ images, currentIndex, onPrev, onNext }) {
  return (
    <div className="carousel-main">
      {/* 上一張圖片按鈕 */}
      <button className="nav-button prev" onClick={onPrev}>&lt;</button>
      <div className="image-container">
        {/* 遍歷並渲染所有圖片 */}
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Slide ${index + 1}`}
            // 根據當前索引設置 active 類
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      {/* 下一張圖片按鈕 */}
      <button className="nav-button next" onClick={onNext}>&gt;</button>
    </div>
  );
}

// 定義 CarouselMain 組件的 PropTypes
CarouselMain.propTypes = {
  // images: 字符串數組，表示圖片 URL 列表
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  // currentIndex: 數字，表示當前顯示的圖片索引
  currentIndex: PropTypes.number.isRequired,
  // onPrev: 函數，用於切換到上一張圖片
  onPrev: PropTypes.func.isRequired,
  // onNext: 函數，用於切換到下一張圖片
  onNext: PropTypes.func.isRequired,
};
