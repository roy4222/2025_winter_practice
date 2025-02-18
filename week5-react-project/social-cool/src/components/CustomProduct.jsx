import { useState, useEffect } from 'react';

// CustomProduct 組件：用於客製化T恤的主要組件
const CustomProduct = () => {
  // 使用 useState 來管理客製化選項的狀態
  const [customization, setCustomization] = useState({
    size: 'M',
    color: 'black',
    text: '',
    font: 'sans',
    position: 'center',
  });

  // 使用 useState 來管理價格狀態
  const [price, setPrice] = useState(790);

  // 使用 useEffect 來監聽 customization 的變化並更新價格
  useEffect(() => {
    let basePrice = 790;
    // 根據尺寸調整價格
    if (customization.size === 'L') basePrice += 100;
    if (customization.size === 'XL') basePrice += 200;
    // 如果有文字，加收印刷費
    if (customization.text.length > 0) basePrice += 150;
    setPrice(basePrice);
  }, [customization]);

  // 定義可選擇的尺寸
  const sizes = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
  ];

  // 定義可選擇的顏色
  const colors = [
    { value: 'black', label: '黑色', class: 'bg-black' },
    { value: 'white', label: '白色', class: 'bg-white border border-gray-200' },
    { value: 'navy', label: '海軍藍', class: 'bg-blue-900' },
    { value: 'red', label: '紅色', class: 'bg-red-600' },
  ];

  // 定義可選擇的字體
  const fonts = [
    { value: 'sans', label: '無襯線體', class: 'font-sans' },
    { value: 'serif', label: '襯線體', class: 'font-serif' },
    { value: 'mono', label: '等寬字體', class: 'font-mono' },
  ];

  // 定義可選擇的文字位置
  const positions = [
    { value: 'top', label: '上方' },
    { value: 'center', label: '中間' },
    { value: 'bottom', label: '下方' },
  ];

  // 更新客製化選項的函數
  const handleCustomization = (key, value) => {
    setCustomization((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          客製化T恤
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左側：預覽區 */}
          <div className="relative">
            <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* T恤預覽 */}
              <div
                className={`w-full h-full relative flex items-${
                  customization.position === 'center' ? 'center' : customization.position
                } justify-center p-8`}
                style={{
                  backgroundColor:
                    customization.color === 'white' ? '#ffffff' : customization.color,
                }}
              >
                {customization.text && (
                  <div
                    className={`text-2xl ${
                      customization.font === 'sans'
                        ? 'font-sans'
                        : customization.font === 'serif'
                        ? 'font-serif'
                        : 'font-mono'
                    } ${
                      customization.color === 'white' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {customization.text}
                  </div>
                )}
              </div>
            </div>

            {/* 尺寸指南 */}
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                尺寸指南
              </h3>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="text-gray-600 dark:text-gray-400">尺寸</div>
                <div className="text-gray-600 dark:text-gray-400">胸圍</div>
                <div className="text-gray-600 dark:text-gray-400">肩寬</div>
                <div className="text-gray-600 dark:text-gray-400">衣長</div>
                {sizes.map((size) => (
                  <>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {size.label}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {size.value === 'S' && '96cm'}
                      {size.value === 'M' && '100cm'}
                      {size.value === 'L' && '104cm'}
                      {size.value === 'XL' && '108cm'}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {size.value === 'S' && '42cm'}
                      {size.value === 'M' && '44cm'}
                      {size.value === 'L' && '46cm'}
                      {size.value === 'XL' && '48cm'}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {size.value === 'S' && '65cm'}
                      {size.value === 'M' && '67cm'}
                      {size.value === 'L' && '69cm'}
                      {size.value === 'XL' && '71cm'}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* 右側：客製化選項 */}
          <div className="space-y-8">
            {/* 尺寸選擇 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                選擇尺寸
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => handleCustomization('size', size.value)}
                    className={`py-2 rounded-lg text-center transition-colors duration-300 ${
                      customization.size === size.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 顏色選擇 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                選擇顏色
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleCustomization('color', color.value)}
                    className={`group relative rounded-lg p-1 ${
                      customization.color === color.value
                        ? 'ring-2 ring-indigo-600 dark:ring-indigo-400'
                        : ''
                    }`}
                  >
                    <div
                      className={`w-full aspect-square rounded-lg ${color.class}`}
                    />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 文字輸入 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                添加文字
              </h2>
              <input
                type="text"
                value={customization.text}
                onChange={(e) => handleCustomization('text', e.target.value)}
                placeholder="輸入想印製的文字"
                maxLength={20}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                最多20個字符
              </p>
            </div>

            {/* 字體選擇 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                選擇字體
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {fonts.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => handleCustomization('font', font.value)}
                    className={`py-2 rounded-lg text-center transition-colors duration-300 ${
                      customization.font === font.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    } ${font.class}`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 位置選擇 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                文字位置
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {positions.map((position) => (
                  <button
                    key={position.value}
                    onClick={() => handleCustomization('position', position.value)}
                    className={`py-2 rounded-lg text-center transition-colors duration-300 ${
                      customization.position === position.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {position.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 價格和購買按鈕 */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  NT${price}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {customization.text && '含印刷費用 NT$150'}
                </span>
              </div>
              <button className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 導出 CustomProduct 組件
export default CustomProduct;
