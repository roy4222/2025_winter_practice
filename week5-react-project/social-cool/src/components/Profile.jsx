import { useState } from 'react';

// 模擬訂單數據
const orders = [
  {
    id: "ORD001",
    date: "2025-02-15",
    status: "已完成",
    total: 35000,
    items: [
      {
        name: "超級好用筆記型電腦",
        quantity: 1,
        price: 35000
      }
    ]
  },
  {
    id: "ORD002",
    date: "2025-02-10",
    status: "運送中",
    total: 17000,
    items: [
      {
        name: "智慧型手錶",
        quantity: 2,
        price: 8500
      }
    ]
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // 模擬用戶數據
  const user = {
    name: "王小明",
    email: "wang@example.com",
    phone: "0912-345-678",
    address: "台北市信義區信義路五段100號"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        會員中心
      </h1>

      {/* 頁籤選單 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === 'profile'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          個人資料
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === 'orders'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          訂單記錄
        </button>
      </div>

      {/* 個人資料區塊 */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                姓名
              </label>
              <input
                type="text"
                value={user.name}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                電子郵件
              </label>
              <input
                type="email"
                value={user.email}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                電話
              </label>
              <input
                type="tel"
                value={user.phone}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                地址
              </label>
              <input
                type="text"
                value={user.address}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                readOnly
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300">
              編輯資料
            </button>
          </div>
        </div>
      )}

      {/* 訂單記錄區塊 */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    訂單編號：{order.id}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    訂購日期：{order.date}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === '已完成'
                      ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
                      : 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              {/* 訂單商品列表 */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <span className="text-gray-800 dark:text-gray-200">
                        {item.name}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-4">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      NT${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* 訂單總金額 */}
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    總計
                  </span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    NT${order.total}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
