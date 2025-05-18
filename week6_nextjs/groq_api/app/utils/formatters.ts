/**
 * 格式化日期顯示
 * @param timestamp - 時間戳記 (毫秒)
 * @returns 格式化後的日期字串，格式為 "YYYY/MM/DD HH:mm"
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

/**
 * 取得相對時間顯示 (例如：剛剛、5分鐘前、2小時前等)
 * @param timestamp - 時間戳記 (毫秒)
 * @returns 相對時間字串
 */
export function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  // 轉換時間差為各個單位
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  // 根據時間差返回相應的描述
  if (seconds < 60) {
    return '剛剛';
  } else if (minutes < 60) {
    return `${minutes}分鐘前`;
  } else if (hours < 24) {
    return `${hours}小時前`;
  } else if (days < 30) {
    return `${days}天前`;
  } else if (months < 12) {
    return `${months}個月前`;
  } else {
    return `${years}年前`;
  }
}

/**
 * 格式化聊天標題 (將過長的標題截斷)
 * @param title - 原始標題
 * @param maxLength - 最大長度 (預設為 25)
 * @returns 格式化後的標題
 */
export function formatChatTitle(title: string, maxLength: number = 25): string {
  if (title.length <= maxLength) {
    return title;
  }
  
  return title.substring(0, maxLength) + '...';
}
