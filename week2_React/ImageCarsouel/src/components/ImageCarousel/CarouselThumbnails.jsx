import PropTypes from 'prop-types';

// 定義 CarouselThumbnails 組件，用於顯示縮略圖列表
export default function CarouselThumbnails({ images, currentIndex, onSelect }) {
  return (
    // 縮略圖容器
    <div className="thumbnail-container">
      {/* 遍歷圖片數組並為每個圖片創建縮略圖 */}
      {images.map((image, index) => (
        // 單個縮略圖元素
        <div
          key={image}
          // 根據當前索引添加 'active' 類
          className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
          // 點擊縮略圖時調用 onSelect 函數
          onClick={() => onSelect(index)}
        >
          {/* 縮略圖圖片 */}
          <img src={image} alt={`Thumbnail ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

// 定義 CarouselThumbnails 組件的 PropTypes
CarouselThumbnails.propTypes = {
  // images: 字符串數組，表示圖片 URL 列表
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  // currentIndex: 數字，表示當前顯示的圖片索引
  currentIndex: PropTypes.number.isRequired,
  // onSelect: 函數，用於處理縮略圖選擇事件
  onSelect: PropTypes.func.isRequired,
};
