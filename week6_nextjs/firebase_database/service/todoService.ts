/**
 * 引入 Firebase Firestore 相關功能
 * 用於資料庫操作和文件管理
 */
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  getDoc,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Todo } from '../app/types';

/**
 * 定義集合名稱和集合參考
 * 用於所有待辦事項的資料庫操作
 */
const COLLECTION_NAME = 'todos';
const todosCollection = collection(db, COLLECTION_NAME);

/**
 * 獲取所有待辦事項
 * 按創建時間降序排列
 * @returns {Promise<Todo[]>} 待辦事項陣列
 */
export const getTodos = async (): Promise<Todo[]> => {
  // 創建查詢，按創建時間降序排列
  const q = query(todosCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  // 將文件數據轉換為 Todo 對象
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      content: data.content,
      completed: data.completed,
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  });
};

/**
 * 創建新的待辦事項
 * @param {string} content 待辦事項內容
 * @returns {Promise<Todo>} 新創建的待辦事項
 */
export const createTodo = async (content: string): Promise<Todo> => {
  // 準備新待辦事項數據
  const newTodo = {
    content,
    completed: false,
    createdAt: serverTimestamp(),
  };
  
  // 添加到資料庫並獲取引用
  const docRef = await addDoc(todosCollection, newTodo);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as DocumentData;
  
  // 返回格式化的待辦事項對象
  return {
    id: docRef.id,
    content: data.content,
    completed: data.completed,
    createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
  };
};

/**
 * 更新待辦事項的完成狀態
 * @param {string} id 待辦事項ID
 * @param {boolean} completed 完成狀態
 * @returns {Promise<void>}
 */
export const toggleTodoCompletion = async (id: string, completed: boolean): Promise<void> => {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(todoRef, { completed });
};

/**
 * 刪除待辦事項
 * @param {string} id 待辦事項ID
 * @returns {Promise<void>}
 */
export const deleteTodo = async (id: string): Promise<void> => {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(todoRef);
}; 