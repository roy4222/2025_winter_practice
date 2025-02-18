import { useState, useEffect } from 'react';

const ProductShowcase = () => {
  const [activeView, setActiveView] = useState('front');
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [selectedColor, setSelectedColor] = useState('space-gray');
  const [showSpecs, setShowSpecs] = useState(false);

  // 產品圖片
  const productViews = {
    'space-gray': {
      front: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
      side: 'https://images.unsplash.com/photo-1527434082571-c875694463d5?auto=format&fit=crop&q=80&w=1000',
      back: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000',
    },
    'silver': {
      front: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000',
      side: 'https://images.unsplash.com/photo-1527434082571-c875694463d5?auto=format&fit=crop&q=80&w=1000',
      back: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
    },
  };

  const colors = {
    'space-gray': '太空灰',
    'silver': '銀色',
  };

  const specs = [
    { label: '螢幕', value: '16 吋 Liquid Retina XDR 顯示器' },
    { label: '晶片', value: 'Apple M2 Pro 或 M2 Max' },
    { label: '記憶體', value: '最高可達 96GB' },
    { label: '儲存裝置', value: '最高可達 8TB' },
    { label: '電池續航力', value: '最長可達 22 小時' },
  ];

  // 自動旋轉效果
  useEffect(() => {
    let rotationInterval;
    if (isAutoRotating) {
      rotationInterval = setInterval(() => {
        setRotationDegree((prev) => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(rotationInterval);
  }, [isAutoRotating]);

  // 視角切換動畫
  const handleViewChange = (view) => {
    setActiveView(view);
    setRotationDegree(0);
    setIsAutoRotating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          MacBook Pro
        </h1>

        {/* 產品展示區 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* 左側：產品圖片 */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-lg shadow-xl bg-white dark:bg-gray-800 aspect-square">
              <img
                src={productViews[selectedColor][activeView]}
                alt="MacBook Pro"
                className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out"
                style={{
                  transform: `rotate(${rotationDegree}deg) scale(${isAutoRotating ? 0.95 : 1})`,
                }}
              />
              
              {/* 360度旋轉控制 */}
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="absolute bottom-4 right-4 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-colors duration-300"
              >
                <svg
                  className={`w-6 h-6 ${isAutoRotating ? 'animate-spin' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>

            {/* 視角控制 */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {Object.keys(productViews[selectedColor]).map((view) => (
                <button
                  key={view}
                  onClick={() => handleViewChange(view)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    activeView === view
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {view === 'front' ? '正面' : view === 'side' ? '側面' : '背面'}
                </button>
              ))}
            </div>
          </div>

          {/* 右側：產品資訊 */}
          <div className="space-y-8">
            {/* 顏色選擇 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                選擇顏色
              </h2>
              <div className="flex space-x-4">
                {Object.entries(colors).map(([color, label]) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative rounded-lg p-1 ${
                      selectedColor === color
                        ? 'ring-2 ring-indigo-600 dark:ring-indigo-400'
                        : ''
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        color === 'space-gray' ? 'bg-gray-800' : 'bg-gray-200'
                      }`}
                    />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 規格資訊 */}
            <div>
              <button
                onClick={() => setShowSpecs(!showSpecs)}
                className="flex items-center space-x-2 text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                <span>技術規格</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    showSpecs ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`grid gap-4 transition-all duration-300 ease-in-out ${
                  showSpecs ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-4">
                    {specs.map((spec, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                      >
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {spec.label}
                        </div>
                        <div className="text-gray-900 dark:text-white font-medium">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 價格和購買按鈕 */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  NT$59,900 起
                </span>
                <span className="text-green-600 dark:text-green-400">
                  現貨供應中
                </span>
              </div>
              <button className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300">
                購買
              </button>
            </div>
          </div>
        </div>

        {/* 產品特色 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '效能強大',
              description:
                '搭載 M2 Pro 或 M2 Max 晶片，提供專業級效能，完美應對各種工作需求。',
              icon: (
                <svg
                  className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
            {
              title: '持久續航',
              description:
                '長達 22 小時的電池續航力，讓你無需擔心充電問題，專注於工作。',
              icon: (
                <svg
                  className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              ),
            },
            {
              title: '卓越顯示',
              description:
                'Liquid Retina XDR 顯示器提供令人驚豔的亮度、對比度和色彩表現。',
              icon: (
                <svg
                  className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
