'use client';

import { useState, useEffect, useRef } from 'react';
import { CharacterImage } from './components/character/CharacterImage';
import { ChatBubble } from './components/chat/ChatBubble';
import { motion } from 'framer-motion';
import { AnimatedElement } from './components/animations/AnimatedElement';

interface DialogueItem {
  message: string;
}

export default function Home() {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  // 對話內容
  const dialogues: DialogueItem[] = [
    { message: '哼！才不是因為想見你才來的呢！' },
    { message: '只是剛好經過而已，別誤會了！' },
    { message: '...你、你在看什麼啦！' },
    { message: '好啦，其實我是有一點點，只有一點點想見你的...' },
    { message: '但這不代表什麼特別的意思喔！' },
    { message: '不、不要一直盯著我看啦！真是的...' },
    { message: '你、你是不是覺得我很有趣啊？才不是為了你開心才這樣做的！' },
  ];

  // 初始化顯示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 使用CSS動畫觸發驚喜動畫
  const triggerSurpriseAnimation = () => {
    if (characterRef.current && !animationTriggered) {
      setAnimationTriggered(true);
      
      characterRef.current.classList.add('animate-surprise');
      
      // 動畫完成後移除類名
      setTimeout(() => {
        if (characterRef.current) {
          characterRef.current.classList.remove('animate-surprise');
          setAnimationTriggered(false);
        }
      }, 1200);
    }
  };

  // 處理角色點擊
  const handleCharacterClick = () => {
    triggerSurpriseAnimation();
    
    if (!hasInteracted) {
      setHasInteracted(true);
    } else {
      setCurrentDialogueIndex((prev) => (prev + 1) % dialogues.length);
    }
  };

  // 確保對話索引有效
  const safeDialogueIndex = Math.min(currentDialogueIndex, dialogues.length - 1);
  const currentDialogue = dialogues[safeDialogueIndex];

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-blue-50 to-purple-50">
      {/* 頂部裝飾條 */}
      <div className="w-full h-10 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 mb-6 md:mb-8"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedElement
          animation="fadeIn"
          duration={800}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">馬剃天愛星 - 傲嬌版</h1>
          <p className="text-gray-500 text-md md:text-lg">「口是心非的學生會副會長」</p>
        </AnimatedElement>

        <div className="flex flex-col items-center justify-center mb-10">
          {/* 聊天氣泡區域 - 放在最上方，添加足夠的高度 */}
          <div className="w-full max-w-lg mb-10 min-h-24 flex items-center justify-center">
            {showChat && currentDialogue && (
              <ChatBubble 
                message={currentDialogue.message}
              />
            )}
          </div>

          {/* 角色圖片 - 放在中間 */}
          <div ref={characterRef} className="relative">
            <AnimatedElement animation="float" duration={4000} loop={true}>
              <CharacterImage onClick={handleCharacterClick} />
            </AnimatedElement>
            
            {/* 互動提示 */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* 角色資料卡片 */}
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
              <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-600 my-4">
                「才、才不是因為想見你才特地來的呢！這種誤會絕對不允許！」
              </blockquote>
            </div>
          </AnimatedElement>
        </div>
      </div>
      
      <footer className="text-center mt-12 md:mt-16 text-gray-500 text-sm">
        <p>資料來源: <a href="https://zh.moegirl.org.cn/zh-tw/%E9%A9%AC%E5%89%83%E5%A4%A9%E7%88%B1%E6%98%9F" 
          className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
          萌娘百科 - 馬剃天愛星
        </a></p>
      </footer>
    </div>
  );
}
