const STORAGE_KEY = 'learning_diary';

export const getStoredData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const calculateTotalDays = (startDate) => {
  if (!startDate) return 0;
  
  const start = new Date(startDate);
  const today = new Date();
  
  // 將時間設置為每天的開始，避免時區問題
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(today - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 是因為要包含起始日
  
  return diffDays;
};

export const calculateStreak = (days) => {
  if (!days) return 0;
  
  const dates = Object.keys(days).sort();
  if (dates.length === 0) return 0;
  
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 從最近的日期開始往回數
  for (let i = dates.length - 1; i >= 0; i--) {
    const date = new Date(dates[i]);
    date.setHours(0, 0, 0, 0);
    
    if (days[dates[i]].learned) {
      currentStreak++;
    } else {
      break;
    }
    
    // 如果日期不連續，中斷計算
    if (i > 0) {
      const prevDate = new Date(dates[i - 1]);
      prevDate.setHours(0, 0, 0, 0);
      const dayDiff = Math.abs(date - prevDate) / (1000 * 60 * 60 * 24);
      if (dayDiff > 1) break;
    }
  }
  
  return currentStreak;
};

export const exportData = () => {
  const data = getStoredData();
  if (!data) return;
  
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `learning_diary_${formatDate(new Date())}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};
