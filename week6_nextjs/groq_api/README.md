# GROQ API 聊天應用實作指南

這是一個使用 [Next.js](https://nextjs.org) 框架和 [GROQ API](https://console.groq.com/) 建立的聊天應用。本專案使用 TypeScript 提供強型別支援，並實作完整的聊天歷史記錄功能。

## 開始使用

首先，啟動開發伺服器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

瀏覽器打開 [http://localhost:3000](http://localhost:3000) 即可查看結果。

## GROQ API 串接和聊天紀錄實作步驟

### 1. 設定 GROQ API 環境 ✅
1. ✅ 註冊 GROQ 並獲取 API 金鑰
2. ✅ 在 `.env` 檔案中配置環境變數：
   - GROQ_API_KEY
   - NEXT_PUBLIC_GROQ_MODEL（例如 llama3-70b-8192）

### 2. 建立基本專案結構 ✅
1. ✅ 建立類型定義檔 (`types/chat.ts`)
2. ✅ 建立工具函數目錄 (`utils/`)
3. ✅ 建立元件目錄 (`components/`)
4. ✅ 建立 API 路由目錄 (`api/`)

### 3. 實作 API 路由 ✅
1. ✅ 建立 `app/api/chat/route.ts` 處理與 GROQ API 的通訊
2. ✅ 實作 POST 端點來接收聊天請求並轉發至 GROQ
3. ✅ 處理錯誤情況和回應格式化

### 4. 建立聊天相關實用工具 ✅
1. ✅ 實作日期格式化工具 (`utils/formatters.ts`)
2. ✅ 實作聊天記錄管理工具 (`utils/chatUtils.ts`)：
   - ✅ 儲存聊天記錄至 localStorage
   - ✅ 讀取聊天記錄
   - ✅ 刪除聊天記錄
   - ✅ 建立新聊天功能
   - ✅ 發送訊息至 GROQ API 的輔助函數

### 5. 建立聊天介面元件 ✅
1. ✅ 聊天訊息氣泡元件 (`components/ChatMessage.tsx`)
2. ✅ 聊天輸入框元件 (`components/ChatInput.tsx`)
3. ✅ 聊天記錄列表元件 (`components/ChatHistoryList.tsx`)

### 6. 實作主聊天頁面 ✅
1. ✅ 建立狀態管理（目前選中的聊天、訊息列表等）
2. ✅ 整合所有元件
3. ✅ 實作發送訊息和接收回應的邏輯
4. ✅ 實作聊天記錄的切換功能
5. ✅ 實作新增/刪除聊天記錄的功能

### 7. 優化和改進 ✅
1. ✅ 添加載入狀態顯示
2. ✅ 添加錯誤處理和提示
3. ✅ 實作訊息流式傳輸（streaming）功能
4. ✅ 優化聊天介面的響應式設計
5. ✅ 添加簡單的持久化存儲功能

### 8. 測試與除錯
1. ⏳ 測試 API 連接
2. ⏳ 測試聊天功能
3. ⏳ 測試聊天記錄管理
4. ⏳ 檢查各類錯誤情境處理

## 專案實作完成度
✅ 所有基本功能已實現：聊天介面、API 串接、資料存儲、響應式設計
⏳ 待完成：最終測試與除錯

## 專案結構

```
/app
  /api
    /chat
      route.ts       # API 路由處理 GROQ 請求
  /components
    ChatInput.tsx    # 聊天輸入框元件
    ChatMessage.tsx  # 聊天氣泡元件
    ChatHistoryList.tsx  # 聊天記錄列表元件
  /types
    chat.ts         # 聊天相關類型定義
  /utils
    chatUtils.ts    # 聊天記錄管理工具
    formatters.ts   # 日期格式化工具
  page.tsx          # 主聊天頁面
```

## 相關資源

- [GROQ API 文件](https://console.groq.com/docs/)
- [Next.js 文件](https://nextjs.org/docs)
- [TypeScript 文件](https://www.typescriptlang.org/docs/)

## 部署

最簡單的部署方式是使用 [Vercel 平台](https://vercel.com/new)。

注意：部署時需要設定 GROQ_API_KEY 環境變數。
