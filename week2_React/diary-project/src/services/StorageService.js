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

export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};
