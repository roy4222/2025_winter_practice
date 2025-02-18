import { useState, useEffect } from 'react';

const SaleEvent = () => {
  // 倒數計時狀態
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 模擬商品數據
  const products = [
    {
      id: 1,
      name: '超級好用筆記型電腦',
      originalPrice: 35000,
      salePrice: 29900,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500',
      stock: 5,
      discount: 15,
    },
    {
      id: 2,
      name: '智慧型手錶',
      originalPrice: 8500,
      salePrice: 6800,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500',
      stock: 8,
      discount: 20,
    },
    {
      id: 3,
      name: '無線耳機',
      originalPrice: 5900,
      salePrice: 4720,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500',
      stock: 12,
      discount: 20,
    },
  ];

  // 計算倒數時間
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2025-03-01T00:00:00');
      const difference = endDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12">
      <div className="container mx-auto px-4">
        {/* 活動標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
            新春特賣活動
          </h1>
          <p className="text-xl text-white opacity-90">
            限時優惠，錯過不再！
          </p>
        </div>

        {/* 倒數計時器 */}
        <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-lg rounded-lg p-6 mb-12">
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div
                key={key}
                className="text-center p-4 bg-white/30 rounded-lg backdrop-blur-sm"
              >
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-white uppercase">
                  {key === 'days'
                    ? '天'
                    : key === 'hours'
                    ? '時'
                    : key === 'minutes'
                    ? '分'
                    : '秒'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 商品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
            >
              {/* 商品圖片 */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {/* 折扣標籤 */}
                <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-lg animate-bounce">
                  {product.discount}% OFF
                </div>
                {/* 庫存提示 */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2">
                  剩餘 {product.stock} 件
                </div>
              </div>

              {/* 商品資訊 */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-red-500">
                      NT${product.salePrice.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      NT${product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-red-500 font-medium">
                    省下 NT${(product.originalPrice - product.salePrice).toLocaleString()}
                  </div>
                </div>
                {/* 進度條 */}
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{
                        width: `${(product.stock / 20) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    庫存剩餘 {((product.stock / 20) * 100).toFixed(0)}%
                  </div>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                  立即搶購
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 活動規則 */}
        <div className="max-w-4xl mx-auto mt-12 bg-white/20 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">活動規則</h2>
          <ul className="text-white space-y-2">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              活動期間：2025/02/17 - 2025/03/01
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              每人限購一件
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              數量有限，售完為止
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              本活動不得與其他優惠合併使用
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SaleEvent;
