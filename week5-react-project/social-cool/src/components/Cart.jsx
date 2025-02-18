import { useState } from 'react';
import { Link } from 'react-router-dom';

// 模擬購物車數據
const initialCartItems = [
  {
    id: 1,
    name: '超級好用筆記型電腦',
    price: 35000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 2,
    name: '智慧型手錶',
    price: 8500,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500',
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            購物車是空的
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            快去選購喜歡的商品吧！
          </p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300"
          >
            繼續購物
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        購物車
      </h1>

      {/* 購物車商品列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {cartItems.map((item) => (
            <li key={item.id} className="p-6">
              <div className="flex items-center">
                {/* 商品圖片 */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* 商品資訊 */}
                <div className="ml-6 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                      NT${item.price}
                    </p>
                  </div>

                  {/* 數量控制和刪除按鈕 */}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 結帳區塊 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            總計
          </span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            NT${total}
          </span>
        </div>
        <button className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300">
          前往結帳
        </button>
      </div>
    </div>
  );
};

export default Cart;
