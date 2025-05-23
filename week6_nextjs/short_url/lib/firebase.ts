// Firebase 設定
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

// Firebase 設定，從環境變數讀取
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// 初始化 Firebase 應用 (避免重複初始化)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 取得 Firestore 實例
const db = getFirestore(app);

// Firestore 短網址集合參考
const urlsCollection = collection(db, 'urls');

export { db, urlsCollection }; 