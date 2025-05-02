import Image from "next/image";
import Link from "next/link";

// 定義導航項目類型
type NavItem = {
  label: string;
  href: string;
};

// 導航項目
const navItems: NavItem[] = [
  { label: "首頁", href: "/" },
  { label: "人物介紹", href: "/character" },
  { label: "作品集", href: "/portfolio" },
  { label: "關於我們", href: "/about" },
];

export default function CharacterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 導航欄 - 參考圖片風格 */}
      <header className="bg-white backdrop-blur-md bg-opacity-90 shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Tiara</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                登入
              </Link>
              <Link 
                href="/register"
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                註冊
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* 主標題區塊 */}
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">馬剃天愛星</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              《敗犬女主太多了！》中的角色，石蕗高中學生會副會長
            </p>
          </div>
        </section>

        {/* 人物資料卡片 - 參考萌娘百科的佈局 */}
        <section className="bg-gray-50 dark:bg-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* 左側：人物圖片 */}
              <div className="md:col-span-1">
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
                  <div className="aspect-[3/4] relative bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-300">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2">天愛星圖片</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">馬剃天愛星</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Basori Tiara</p>
                  </div>
                </div>
              </div>
              
              {/* 右側：人物資料 */}
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-600 pb-3">基本資料</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">本名</h3>
                      <p className="text-gray-900 dark:text-white">馬剃（ばそり） 天愛星（てぃあら）</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">別號</h3>
                      <p className="text-gray-900 dark:text-white">老馬</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">髮色</h3>
                      <p className="text-gray-900 dark:text-white">黑髮</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">瞳色</h3>
                      <p className="text-gray-900 dark:text-white">藍瞳</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">聲優</h3>
                      <p className="text-gray-900 dark:text-white">諸星菫</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">活動範圍</h3>
                      <p className="text-gray-900 dark:text-white">日本愛知縣豐橋市</p>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">萌點</h3>
                      <p className="text-gray-900 dark:text-white">學生會副會長、反差萌、貧乳、盤髮、黑色連褲襪、齊劉海、粗眉、冒失、腐女</p>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">所屬團體</h3>
                      <p className="text-gray-900 dark:text-white">石蕗高中 1年B班 → 2年B班 學生會</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 border-b border-gray-200 dark:border-gray-600 pb-3">相關人物</h2>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">志喜屋夢子</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">學生會會長</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">放虎原雲雀</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">學生會成員</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">櫻井弘人</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">學生會成員</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">溫水和彥</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">主要角色</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">八奈見杏菜</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">主要角色</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">燒鹽檸檬</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">主要角色</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 人物詳細介紹 */}
        <section className="bg-white dark:bg-gray-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">人物介紹</h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                馬剃天愛星是《敗犬女主太多了！》中的主要角色之一，擔任石蕗高中學生會副會長一職。
                她有著黑色的頭髮和藍色的眼睛，平常將頭髮盤起，戴著眼鏡，給人一種知性的印象。
              </p>
              
              <p>
                作為學生會副會長，天愛星在表面上表現得非常正經嚴肅，是個認真負責的好學生。
                然而，她實際上有著反差萌的一面，是個熱衷於BL的腐女子，經常會在看到帥哥時冒出各種妄想。
                這種表裏不一的性格也是她的魅力所在。
              </p>
              
              <p>
                天愛星在處理學生會事務時非常可靠，但有時也會因為自己的妄想而變得冒失，
                造成一些有趣的誤會和混亂。她與學生會會長志喜屋夢子關係良好，兩人一起管理著學生會的各項事務。
              </p>
              
              <p>
                在動畫中，她由聲優諸星菫配音，將角色的兩面性表現得淋漓盡致。
              </p>
            </div>
          </div>
        </section>

        {/* 相關作品 */}
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">相關作品</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-300">作品封面</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">敗犬女主太多了！ 小說</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">原作：雨森焚火</p>
                  <Link href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">瞭解更多</Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-300">作品封面</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">敗犬女主太多了！ 漫畫</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">漫畫：いたち</p>
                  <Link href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">瞭解更多</Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-300">作品封面</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">敗犬女主太多了！ 動畫</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">製作：A-1 Pictures</p>
                  <Link href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">瞭解更多</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 頁腳 */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Tiara. 版權所有。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                隱私政策
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                使用條款
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                聯絡我們
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 