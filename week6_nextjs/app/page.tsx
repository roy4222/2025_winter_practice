"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-indigo-950 dark:via-slate-900 dark:to-gray-900">
      {/* 半透明裝飾元素 */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-block px-6 py-2 mb-4 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-800 dark:text-indigo-200 font-medium text-sm uppercase tracking-wider">
            角色介紹
          </div>
          <h1 className="text-5xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 text-center">
            馬剃天愛星
          </h1>
          <div className="flex items-center justify-center mb-2">
            <span className="text-lg font-medium text-gray-600 dark:text-gray-300 mx-1 tracking-wider">ばそり てぃあら</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-lg text-gray-600 dark:text-gray-300 mx-1 tracking-wider">Basori Tiara</span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl">
            《敗犬女主太多了！》中的精明學生會副會長，外表嚴肅內心卻是個腐女
          </p>
        </div>

        {/* 主要內容卡片 */}
        <div className="bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col-reverse lg:flex-row gap-10">
            {/* 角色資訊 - 左側 */}
            <div className="lg:w-3/5">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  基本資料
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <span className="text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">本名</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">馬剃（ばそり）天愛星（てぃあら）</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">別號</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">老馬</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">髮色</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">黑髮</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">瞳色</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">藍瞳</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <span className="text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">聲優</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">諸星菫</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">所屬</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">石蕗高中 學生會副會長</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">活動範圍</span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">日本愛知縣豐橋市</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  萌點
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">學生會副會長</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">反差萌</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">貧乳</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">盤髮</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">黑色連褲襪</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">齊劉海</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">粗眉</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">冒失</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">腐女</span>
                </div>
              </div>
            </div>
            
            {/* 角色圖片 - 右側 */}
            <div className="lg:w-2/5 flex justify-center lg:justify-end items-center">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
                <Image 
                  src="https://truth.bahamut.com.tw/s01/202504/forum/76136/f5466c46ce5a2c5874aa573038134dfe.JPG" 
                  alt="馬剃天愛星"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 人物特徵與關係 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              人物特徵
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
              <p>
                馬剃天愛星是石蕗高中的學生會副會長，留有黑色長髮綁成盤髮，戴著眼鏡，外表看起來非常正經嚴肅。
              </p>
              <p>
                她其實是一個腐女，喜歡幻想男性角色之間的戀愛關係。雖然看起來精明能幹，但實際上相當冒失，經常會把事情搞砸。
              </p>
              <p>
                儘管如此，她認真負責的態度仍然贏得同學們的信任，是學生會中不可或缺的重要成員。
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              角色關係
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
              <p>
                馬剃天愛星與學生會會長<strong className="text-indigo-700 dark:text-indigo-400">志喜屋夢子</strong>關係良好，工作上互相配合。
              </p>
              <p>
                她也與主角<strong className="text-indigo-700 dark:text-indigo-400">溫水和彥</strong>有交集，但並不是「敗犬女主」之一。
              </p>
              <p>
                在動畫中，她通常與其他學生會成員<strong className="text-indigo-700 dark:text-indigo-400">放虎原雲雀</strong>和<strong className="text-indigo-700 dark:text-indigo-400">櫻井弘人</strong>一起出現，合作處理學生會的各種事務。
              </p>
            </div>
          </div>
        </div>

        {/* 作品簡介 */}
        <div className="bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 rounded-xl shadow-lg p-8 mb-12 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            作品簡介
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
            <p>
              《敗犬女主太多了！》是由雨森焚火原作、伊右群插畫的輕小說，於2022年4月1日開始播出動畫，由A-1 Pictures製作。
            </p>
            <p>
              故事講述了平凡高中生溫水和彥被多位女主角喜歡上的青春喜劇。劇中主要的「敗犬女主」包括八奈見杏菜、燒鹽檸檬和小鞠知花，她們都愛上了男主角，但最終都會成為「敗犬」。
            </p>
            <p>
              馬剃天愛星作為學生會副會長，在劇中是一個有趣的配角，她嚴肅的外表與腐女的內心形成了鮮明的反差，為故事增添了不少笑點。
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-indigo-700 dark:text-indigo-400">製作團隊</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm">原作</span>
                <span className="text-gray-800 dark:text-gray-200">雨森焚火</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm">插畫</span>
                <span className="text-gray-800 dark:text-gray-200">伊右群</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm">漫畫</span>
                <span className="text-gray-800 dark:text-gray-200">いたち</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm">動畫製作</span>
                <span className="text-gray-800 dark:text-gray-200">A-1 Pictures</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-100 dark:border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            資料來源：
            <a href="https://zh.moegirl.org.cn/zh-tw/%E9%A9%AC%E5%89%83%E5%A4%A9%E7%88%B1%E6%98%9F" className="ml-1 text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">
              萌娘百科 - 馬剃天愛星
            </a>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
        <p>© 2024 敗犬女主太多了！角色介紹</p>
      </footer>

      {/* 添加 CSS 用於動畫 */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
