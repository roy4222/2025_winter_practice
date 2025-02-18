import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// 模擬精選商品數據
const featuredProducts = [
  {
    id: 1,
    name: '超級好用筆記型電腦',
    description: '高效能筆電，適合工作與遊戲',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 2,
    name: '智慧型手錶',
    description: '24小時健康監測，時尚外型',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 3,
    name: '無線耳機',
    description: '高音質、降噪功能，續航力強',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500',
  },
];

// 網站特色資訊
const features = [
  {
    title: '免運費',
    description: '全台灣免運費，離島地區享有優惠運費',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  {
    title: '品質保證',
    description: '所有商品都經過嚴格品質把關',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: '7天鑑賞期',
    description: '不滿意可退換貨，購物更有保障',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// 主頁面組件
const HomePage = () => {
  return (
    <div>
      {/* Hero 區塊：展示主要標語和背景圖片 */}
      <div className="relative bg-gray-900 h-[500px]">
        {/* 背景圖片 */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        {/* 主要內容 */}
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            探索精選科技商品
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            從最新的筆電到智慧型手錶，我們提供最優質的科技產品，讓您的生活更加便利。
          </p>
          {/* 立即選購按鈕 */}
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition duration-300"
            >
              立即選購
            </Link>
          </div>
        </div>
      </div>

      {/* 精選商品區塊 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">精選商品</h2>
        {/* 商品卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* 查看更多商品連結 */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          >
            查看更多商品 →
          </Link>
        </div>
      </div>

      {/* 特色區塊：展示網站主要特點 */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 訂閱區塊：用戶可以訂閱電子報 */}
      <div className="bg-indigo-600 dark:bg-indigo-900 py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              訂閱我們的電子報
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              獲取最新商品資訊和獨家優惠
            </p>
            {/* 訂閱表單 */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="請輸入您的電子郵件"
                  className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                />
                <button className="bg-white text-indigo-600 dark:bg-gray-800 dark:text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-300">
                  訂閱
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
