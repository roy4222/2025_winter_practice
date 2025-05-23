/**
 * 生成隨機短網址 ID
 * @param length 生成的短網址長度，預設為 6
 * @returns 隨機生成的短網址 ID
 */
export function generateShortId(length: number = 6): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  
  return result;
}

/**
 * 驗證網址格式
 * @param url 要驗證的網址
 * @returns 布林值，表示網址是否有效
 */
export function isValidUrl(url: string): boolean {
  try {
    // 檢查是否為有效的 URL
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 格式化完整短網址
 * @param shortId 短網址 ID
 * @param baseUrl 基礎網址
 * @returns 完整的短網址
 */
export function formatShortUrl(shortId: string, baseUrl: string = ''): string {
  // 如果沒有提供 baseUrl，嘗試從環境變數中取得
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${base}/${shortId}`;
} 