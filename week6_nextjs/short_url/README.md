# 短網址產生器

這是一個簡易的短網址產生器，使用者可以輸入長網址，系統會生成短網址，並能夠透過短網址重新導向至原始網址。

## 🏗 功能需求

### 1️⃣ 短網址生成

使用者透過 API 提交長網址，系統返回短網址：

`POST /api/shorten`

請求範例：
```json
{
  "originalUrl": "https://www.example.com/some-long-url"
}
```

回應範例：
```json
{
  "shortUrl": "https://short.ly/abc123"
}
```

### 2️⃣ 短網址解析與重新導向

使用者訪問短網址時，系統將其導向回原網址：

`GET /abc123  -> Redirect to https://www.example.com/some-long-url`

### 3️⃣ 基本防錯處理

- 確保短網址唯一（使用隨機生成方式）
- 若短網址不存在，回應適當的錯誤訊息（404 頁面或 API 錯誤回應）

## ⚙ 技術棧

- **前端**：
  - Next.js (App Router)
  - TypeScript
  - TailwindCSS (UI 樣式)
  
- **後端**：
  - Next.js API Routes
  - Firebase (Firestore 作為資料庫)

## 🔍 API 文件

### 短網址生成 API

- **端點**：`/api/shorten`
- **方法**：`POST`
- **請求體**：
  ```json
  {
    "originalUrl": "https://example.com/your-long-url"
  }
  ```
- **成功回應** (200 OK)：
  ```json
  {
    "shortUrl": "https://yourdomain.com/abc123"
  }
  ```
- **錯誤回應** (400 Bad Request)：
  ```json
  {
    "error": "錯誤訊息"
  }
  ```

## 📝 里程碑

### 1️⃣ 環境搭建與 Firebase 設定

- 目標：初始化 Next.js 專案，配置 Firebase SDK 並連接到 Firestore
- 步驟：
  - 建立 Firebase 專案並啟用 Firestore
  - 在 Next.js 專案中安裝 `firebase` 套件
  - 建立 `lib/firebase.ts` 檔案，初始化 Firebase app
  - 將 Firebase 設定資訊儲存於 `.env.local`

### 2️⃣ 短網址生成 API

- 目標：實現接收長網址、生成短網址、存儲至 Firestore 並返回短網址的 API
- 步驟：
  - 在 `app/api/shorten/route.ts` 中建立 `POST` 處理函式
  - 實現短網址 ID 生成邏輯（使用隨機字串）
  - 確保短網址 ID 在 Firestore 中的唯一性
  - 將「短網址 ID - 長網址」的對應關係存入 Firestore
  - 返回包含短網址的 JSON 回應

### 3️⃣ 前端介面開發

- 目標：建立簡單頁面，讓使用者可以輸入長網址，並顯示生成的短網址
- 步驟：
  - 在 `app/page.tsx` 中建立輸入框和提交按鈕
  - 處理表單提交事件，呼叫 `/api/shorten` API
  - 在頁面上顯示 API 返回的短網址

### 4️⃣ 短網址重定向功能

- 目標：實現使用者訪問短網址時，系統能解析並重定向到原始長網址
- 步驟：
  - 建立動態路由 `app/[shortId]/route.ts` 以進行伺服器端重定向
  - 從路由參數中獲取 `shortId`
  - 查詢 Firestore 中是否有對應的 `shortId`
  - 若找到，使用 Next.js 的 `redirect` 功能重定向到原始長網址
  - 若未找到，顯示 404 錯誤頁面或訊息

### 5️⃣ 基本防錯與文件完善

- 目標：加入基本的錯誤處理機制，並完成文件
- 步驟：
  - 在 API 和前端加入對無效輸入或未找到短網址的處理
  - 完善 API 文件說明
  - 加入「專案未來發展可能性」的思考

## 💡 專案未來發展可能性

1. **使用者管理**：加入註冊/登入功能，讓使用者可以管理自己建立的短網址
2. **短網址統計**：記錄點擊次數、來源 IP、裝置類型等統計資料
3. **自訂短網址**：讓使用者能自訂短網址的 ID，而不只是系統隨機生成
4. **到期機制**：為短網址設定有效期限，過期後自動失效
5. **QR Code 生成**：為每個短網址生成對應的 QR Code，方便行動裝置掃描
6. **批量處理**：支援一次處理多個長網址的批量轉換
7. **API 金鑰**：提供 API 金鑰機制，讓開發者能透過 API 整合此服務

## 🚀 快速開始

### 安裝與設定

1. 克隆專案:
   ```bash
   git clone https://github.com/yourusername/short_url.git
   cd short_url
   ```

2. 安裝相依套件:
   ```bash
   npm install
   # 或
   yarn
   ```

3. 設定 Firebase:
   - 前往 [Firebase 主控台](https://console.firebase.google.com/) 建立專案
   - 啟用 Firestore 資料庫
   - 在專案設定中獲取 Web 應用程式的設定

4. 建立 `.env.local` 檔案，填入 Firebase 設定:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

5. 啟動開發伺服器:
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

6. 在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000) 查看應用程式
