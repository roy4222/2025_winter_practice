/**
 * 待辦事項的類型定義
 * 
 * @property {string} id - 待辦事項的唯一識別碼
 * @property {string} content - 待辦事項的內容描述
 * @property {boolean} completed - 待辦事項的完成狀態
 * @property {Date} createdAt - 待辦事項的創建時間
 */
export type Todo = {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
}
