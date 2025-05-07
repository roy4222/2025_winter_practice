
## Firebase Firestore 指南

### 介紹

Firebase Firestore 是 Google 提供的雲端資料庫服務，適合用於開發各種應用程式。本指南將幫助初學者理解並開始使用 Firestore。

### 設定環境變數

在項目根目錄創建 `.env.local` 檔案，並填入以下內容（請替換為您自己的 Firebase 配置）：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 基本概念

1. **文件 (Document)**: 資料的基本單位，類似於 JSON 物件
2. **集合 (Collection)**: 文件的容器，類似於資料夾
3. **參考 (Reference)**: 指向文件或集合的指標

### 基本操作

#### 1. 讀取資料

```typescript
// 讀取集合中的所有文件
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';

async function getAllItems() {
  const querySnapshot = await getDocs(collection(db, "items"));
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return items;
}
```

#### 2. 新增資料

```typescript
// 新增文件到集合
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

async function addItem(item) {
  const docRef = await addDoc(collection(db, "items"), item);
  return docRef.id;
}
```

#### 3. 更新資料

```typescript
// 更新文件
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

async function updateItem(id, data) {
  await updateDoc(doc(db, "items", id), data);
}
```

#### 4. 刪除資料

```typescript
// 刪除文件
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

async function deleteItem(id) {
  await deleteDoc(doc(db, "items", id));
}
```

### 進階使用

1. **查詢資料**：使用 `query`、`where` 等方法進行條件查詢
2. **即時更新**：使用 `onSnapshot` 監聽資料變化
3. **批量操作**：使用 `writeBatch` 進行多筆資料的原子操作

### 學習步驟建議

1. 先熟悉基本的 CRUD 操作（新增、讀取、更新、刪除）
2. 學習如何建立簡單的資料模型
3. 練習建立簡單的 React 元件來操作資料
4. 進階學習條件查詢和即時更新

### 學習資源

- [Firebase 官方文件](https://firebase.google.com/docs/firestore)
- [Firebase JavaScript SDK 參考](https://firebase.google.com/docs/reference/js)
- [Next.js 與 Firebase 整合指南](https://firebase.google.com/docs/web/setup)
