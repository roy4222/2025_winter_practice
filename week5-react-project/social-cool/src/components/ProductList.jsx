import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

// 模擬商品數據
const products = [
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
  {
    id: 4,
    name: '專業相機',
    description: '高畫質感光元件，適合攝影愛好者',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500',
  },
];

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        商品列表
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  NT${product.price}
                </span>
                <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300">
                  查看詳情
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
