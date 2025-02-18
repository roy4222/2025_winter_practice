// 導入 PropTypes 用於類型檢查
import PropTypes from 'prop-types';

// 定義 ProductCard 組件，接收一個 product 物件作為 prop
const ProductCard = ({ product }) => {
  return (
    // 卡片容器，使用 Tailwind CSS 類別設置樣式
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* 商品圖片 */}
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      {/* 商品資訊容器 */}
      <div className="p-4">
        {/* 商品名稱 */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
        {/* 商品描述 */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{product.description}</p>
        {/* 價格和加入購物車按鈕容器 */}
        <div className="flex justify-between items-center">
          {/* 商品價格 */}
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">NT${product.price}</span>
          {/* 加入購物車按鈕 */}
          <button 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300"
            onClick={() => console.log('Add to cart:', product.id)}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
};

// 定義 ProductCard 的 prop 類型
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

// 導出 ProductCard 組件
export default ProductCard;
