import { useParams } from 'react-router-dom';
import { useState } from 'react';

// 模擬商品數據
const products = {
  1: {
    id: 1,
    name: '超級好用筆記型電腦',
    description: '高效能筆電，適合工作與遊戲，配備最新一代處理器和獨立顯示卡。\n\n特色：\n- 最新第12代處理器\n- RTX 4060顯示卡\n- 16GB RAM\n- 1TB SSD\n- 15.6吋 2K螢幕',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500',
    specs: [
      { name: '處理器', value: 'Intel Core i7-12700H' },
      { name: '顯示卡', value: 'NVIDIA RTX 4060 8GB' },
      { name: '記憶體', value: '16GB DDR5' },
      { name: '儲存空間', value: '1TB NVMe SSD' },
      { name: '螢幕', value: '15.6吋 2K (2560x1440) 165Hz' },
      { name: '電池', value: '90WHr' },
      { name: '重量', value: '2.1kg' }
    ]
  },
  2: {
    id: 2,
    name: '智慧型手錶',
    description: '24小時健康監測，時尚外型。具備多種運動模式和健康追蹤功能。\n\n特色：\n- 心率監測\n- 血氧監測\n- 睡眠追蹤\n- 50種運動模式\n- 5ATM防水',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500',
    specs: [
      { name: '螢幕', value: '1.4吋 AMOLED' },
      { name: '電池續航', value: '最長14天' },
      { name: '防水等級', value: '5ATM' },
      { name: '感測器', value: '心率、血氧、加速度計' },
      { name: '連接', value: 'Bluetooth 5.0' },
      { name: '重量', value: '32g' }
    ]
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = products[id];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-300">
          找不到商品
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 商品圖片 */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* 商品資訊 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            NT${product.price}
          </div>
          
          {/* 商品描述 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              商品描述
            </h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* 數量選擇 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              數量
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-lg"
              >
                -
              </button>
              <span className="text-gray-900 dark:text-white">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* 加入購物車按鈕 */}
          <button
            onClick={() => console.log('Add to cart:', { ...product, quantity })}
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300"
          >
            加入購物車
          </button>
        </div>
      </div>

      {/* 商品規格 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          商品規格
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.specs.map((spec, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {spec.name}
              </div>
              <div className="text-gray-900 dark:text-white font-medium">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
