import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaHeart } from 'react-icons/fa';

// Footer 組件：網站的底部區域
function Footer() {
  return (
    // 頁腳容器，使用漸變背景和內邊距
    <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* 使用網格布局，在移動設備上為單列，在中等尺寸以上為三列 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌區域：左側欄 */}
          <div className="text-center md:text-left">
            {/* 網站名稱，使用漸變文字效果 */}
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300">
              Social Platform
            </h3>
            {/* 網站簡介 */}
            <p className="mt-2 text-sm text-indigo-200">
              讓我們連結每一個精彩時刻
            </p>
            {/* 版權信息 */}
            <p className="mt-4 text-sm text-indigo-200">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* 快速連結：中間欄 */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-indigo-300 mb-4">快速連結</h4>
            <ul className="space-y-2">
              {/* 各種頁面連結 */}
              <li>
                <a href="/about" className="text-indigo-200 hover:text-pink-300 transition duration-300">
                  關於我們
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-indigo-200 hover:text-pink-300 transition duration-300">
                  隱私政策
                </a>
              </li>
              <li>
                <a href="/terms" className="text-indigo-200 hover:text-pink-300 transition duration-300">
                  服務條款
                </a>
              </li>
              <li>
                <a href="/contact" className="text-indigo-200 hover:text-pink-300 transition duration-300">
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>

          {/* 社群媒體：右側欄 */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-indigo-300 mb-4">關注我們</h4>
            {/* 社群媒體圖標連結 */}
            <div className="flex justify-center md:justify-end space-x-4">
              {/* Facebook 連結 */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-indigo-200 hover:text-pink-300 transform hover:scale-110 transition duration-300">
                <FaFacebook size={24} />
              </a>
              {/* Twitter 連結 */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-indigo-200 hover:text-pink-300 transform hover:scale-110 transition duration-300">
                <FaTwitter size={24} />
              </a>
              {/* Instagram 連結 */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-indigo-200 hover:text-pink-300 transform hover:scale-110 transition duration-300">
                <FaInstagram size={24} />
              </a>
              {/* GitHub 連結 */}
              <a href="https://github.com/roy4222" target="_blank" rel="noopener noreferrer"
                className="text-indigo-200 hover:text-pink-300 transform hover:scale-110 transition duration-300">
                <FaGithub size={24} />
              </a>
            </div>
            {/* 製作信息 */}
            <p className="mt-6 text-sm text-indigo-200 flex items-center justify-center md:justify-end">
              Made with <FaHeart className="mx-1 text-pink-400" /> in Taiwan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
