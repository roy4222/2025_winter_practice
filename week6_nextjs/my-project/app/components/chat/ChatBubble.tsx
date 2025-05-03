import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  typingSpeed?: number;
  onComplete?: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  typingSpeed = 50,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // 打字機效果
  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText((prev) => prev + message[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [message, typingSpeed, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="chat-bubble chat-bubble-appear"
    >
      <p className="text-xl md:text-2xl font-medium relative">
        {displayedText || ''}
        {isTyping && (
          <span className="absolute inline-block w-2 h-6 ml-1 bg-gray-500 animate-pulse">
            &nbsp;
          </span>
        )}
      </p>
    </motion.div>
  );
};

export default ChatBubble; 