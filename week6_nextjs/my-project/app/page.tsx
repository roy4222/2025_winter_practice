'use client'; // 聲明這是客戶端元件，允許使用React hooks和瀏覽器API

import { useState, useEffect, useRef } from 'react'; // 引入React hooks
import { CharacterImage } from './components/character/CharacterImage'; // 引入角色圖片元件
import { ChatBubble } from './components/chat/ChatBubble'; // 引入聊天氣泡元件
import { motion } from 'framer-motion'; // 引入動畫庫
import { AnimatedElement } from './components/animations/AnimatedElement'; // 引入自定義動畫元件

/**
 * 對話項目介面
 * 定義對話內容的資料結構
 */
interface DialogueItem {
  message: string; // 對話訊息內容
}

/**
 * 首頁元件
 * 展示角色互動頁面，包含角色圖片、對話氣泡和角色資訊
 */
export default function Home() {
  // 狀態管理
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0); // 當前對話索引
  const [showChat, setShowChat] = useState(false); // 控制是否顯示對話氣泡
  const [hasInteracted, setHasInteracted] = useState(false); // 追蹤用戶是否已與角色互動
  const [animationTriggered, setAnimationTriggered] = useState(false); // 追蹤驚喜動畫是否已觸發
  const characterRef = useRef<HTMLDivElement>(null); // 角色元素的DOM引用

  // 對話內容陣列 - 角色的傲嬌台詞
  const dialogues: DialogueItem[] = [
    { message: '哼！才不是因為想見你才來的呢！' },
    { message: '只是剛好經過而已，別誤會了！' },
    { message: '...你、你在看什麼啦！' },
    { message: '好啦，其實我是有一點點，只有一點點想見你的...' },
    { message: '但這不代表什麼特別的意思喔！' },
    { message: '不、不要一直盯著我看啦！真是的...' },
    { message: '你、你是不是覺得我很有趣啊？才不是為了你開心才這樣做的！' },
  ];

  /**
   * 初始化顯示效果
   * 頁面載入後延遲顯示聊天氣泡，創造漸進式的用戶體驗
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true); // 1秒後顯示聊天氣泡
    }, 1000);

    // 清理函數 - 組件卸載時清除計時器
    return () => clearTimeout(timer);
  }, []);

  /**
   * 觸發角色驚喜動畫
   * 當用戶點擊角色時，添加CSS動畫類並在動畫結束後移除
   */
  const triggerSurpriseAnimation = () => {
    if (characterRef.current && !animationTriggered) {
      setAnimationTriggered(true); // 設置動畫已觸發狀態，防止重複觸發
      
      characterRef.current.classList.add('animate-surprise'); // 添加驚喜動畫CSS類
      
      // 動畫完成後移除類名，重置動畫狀態
      setTimeout(() => {
        if (characterRef.current) {
          characterRef.current.classList.remove('animate-surprise');
          setAnimationTriggered(false); // 重置動畫觸發狀態，允許再次觸發
        }
      }, 1200); // 動畫持續1.2秒
    }
  };

  /**
   * 處理角色點擊事件
   * 觸發動畫並更新對話內容
   */
  const handleCharacterClick = () => {
    triggerSurpriseAnimation(); // 觸發驚喜動畫
    
    if (!hasInteracted) {
      setHasInteracted(true); // 首次互動，設置互動狀態
    } else {
      // 非首次互動，循環顯示下一句對話
      setCurrentDialogueIndex((prev) => (prev + 1) % dialogues.length);
    }
  };

  // 確保對話索引有效，防止數組越界
  const safeDialogueIndex = Math.min(currentDialogueIndex, dialogues.length - 1);
  const currentDialogue = dialogues[safeDialogueIndex]; // 獲取當前要顯示的對話

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-blue-50 to-purple-50">
      {/* 頂部裝飾條 - 添加視覺層次感 */}
      <div className="w-full h-10 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 mb-6 md:mb-8"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* 標題區域 - 使用淡入動畫 */}
        <AnimatedElement
          animation="fadeIn"
          duration={800}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">馬剃天愛星</h1>
          <p className="text-gray-500 text-md md:text-lg">「口是心非的學生會副會長」</p>
        </AnimatedElement>

        <div className="flex flex-col items-center justify-center mb-10">
          {/* 聊天氣泡區域 - 固定高度確保布局穩定 */}
          <div className="w-full max-w-lg mb-10 min-h-24 flex items-center justify-center">
            {showChat && currentDialogue && (
              <ChatBubble 
                message={currentDialogue.message} // 傳遞當前對話內容
              />
            )}
          </div>

          {/* 角色圖片區域 - 添加浮動動畫和點擊互動 */}
          <div ref={characterRef} className="relative">
            <AnimatedElement animation="float" duration={4000} loop={true}>
              <CharacterImage onClick={handleCharacterClick} />
            </AnimatedElement>
            
            {/* 互動提示 - 引導用戶點擊角色 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-4 text-center text-gray-600 text-sm"
            >
              點擊角色看看會發生什麼...
            </motion.div>
          </div>
        </div>

        {/* 角色資訊卡片區域 - 使用網格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* 角色基本資料卡片 - 使用上滑動畫 */}
          <AnimatedElement
            animation="slideUp"
            delay={300}
            duration={800}
            className="character-card"
          >
            <div className="character-card-header">
              <h2 className="text-xl">角色基本資料</h2>
            </div>
            <div className="character-card-body">
              {/* 角色屬性表格 - 使用網格布局 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-1 text-gray-600">本名</div>
                <div className="col-span-2 font-medium">馬剃（ばそり）天愛星（てぃあら）</div>
                
                <div className="col-span-1 text-gray-600">別號</div>
                <div className="col-span-2">老馬</div>
                
                <div className="col-span-1 text-gray-600">髮色</div>
                <div className="col-span-2">黑髮</div>
                
                <div className="col-span-1 text-gray-600">瞳色</div>
                <div className="col-span-2">藍瞳</div>
                
                <div className="col-span-1 text-gray-600">聲優</div>
                <div className="col-span-2">諸星菫</div>
                
                <div className="col-span-1 text-gray-600">所屬團體</div>
                <div className="col-span-2">石蕗高中 學生會副會長</div>
              </div>
              
              {/* 萌點標籤區域 - 使用彈性布局 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-purple-800 mb-2">萌點</h3>
                <div className="flex flex-wrap gap-2">
                  {["傲嬌", "學生會副會長", "反差萌", "貧乳", "盤髮", "黑色連褲襪", "齊劉海", "粗眉", "冒失", "腐女"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          {/* 角色性格介紹卡片 - 使用上滑動畫，稍微延遲顯示 */}
          <AnimatedElement
            animation="slideUp"
            delay={400}
            duration={800}
            className="character-card"
          >
            <div className="character-card-header">
              <h2 className="text-xl">傲嬌性格介紹</h2>
            </div>
            <div className="character-card-body">
              <p className="text-gray-700 mb-4">
                馬剃天愛星是一個經典的傲嬌角色，外表高冷但內心溫柔。雖然口是心非，經常說著與真實想法相反的話，
                但她對在意的人總是付出很多關心和照顧，只是不善於直接表達自己的情感。
              </p>
              <p className="text-gray-700">
                作為石蕗高中的學生會副會長，她十分認真負責，但同時也有著有些冒失的一面。當被人讚美或靠近時，
                往往會表現出害羞和傲嬌的態度，這也是她最大的魅力所在。
              </p>
              {/* 引用區塊 - 展示角色經典台詞 */}
              <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-600 my-4">
                「才、才不是因為想見你才特地來的呢！這種誤會絕對不允許！」
              </blockquote>
            </div>
          </AnimatedElement>
        </div>
      </div>
      
      {/* 頁腳區域 - 顯示資料來源和版權信息 */}
      <footer className="text-center mt-12 md:mt-16 text-gray-500 text-sm">
        <p>資料來源: <a href="https://zh.moegirl.org.cn/zh-tw/%E9%A9%AC%E5%89%83%E5%A4%A9%E7%88%B1%E6%98%9F" 
          className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
          萌娘百科 - 馬剃天愛星
        </a></p>
      </footer>
    </div>
  );
}
