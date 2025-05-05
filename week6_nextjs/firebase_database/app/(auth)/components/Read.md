# 認證系統重構文件

## 架構概覽

認證系統已經從原本分散在各組件中的邏輯重構為集中式管理的架構，主要分為以下幾個部分：

### 1. AuthContext (認證上下文)

位置：`app/(auth)/context/AuthContext.tsx`

這是整個認證系統的核心，負責：
- 維護用戶登入狀態
- 提供所有認證相關的操作方法（登入、註冊、登出等）
- 處理認證錯誤
- 在整個應用中共享認證狀態

### 2. 認證表單組件

位置：`app/(auth)/components/AuthFormRefactored.tsx`

負責渲染登入和註冊表單的 UI，並通過 AuthContext 執行實際的認證操作。
主要功能：
- 接收 `isLogin` 屬性決定顯示登入或註冊模式
- 管理表單輸入狀態
- 使用 AuthContext 提供的方法進行認證操作
- 處理表單驗證和提交

### 3. 頭部用戶區域組件

分為兩個部分：

#### a. 桌面版用戶區域
位置：`app/(auth)/components/HeaderUserSection.tsx`

- 根據用戶登入狀態顯示對應的 UI
- 登入後顯示用戶頭像和下拉選單
- 未登入時顯示登入和註冊按鈕

#### b. 行動裝置用戶區域
位置：`app/(auth)/components/MobileUserSection.tsx`

- 專為行動裝置視圖設計
- 根據用戶登入狀態顯示對應的 UI
- 提供用戶操作選項（個人資料、設定、登出）

### 4. 頁面導航欄組件

位置：`app/components/HeaderRefactored.tsx`

- 使用拆分出的用戶區域組件
- 適應不同螢幕尺寸
- 集成導航連結和用戶操作界面

## 使用方法

### 1. 訪問認證狀態和方法

在任何組件中使用 `useAuth` hook 即可獲取認證狀態和方法：

```tsx
import { useAuth } from '路徑/到/(auth)/context/AuthContext';

function MyComponent() {
  const { currentUser, loading, error, signIn, signOut } = useAuth();
  
  // 現在可以訪問用戶狀態並使用認證方法
  // ...
}
```

### 2. 使用認證表單

在頁面中直接引入 `AuthFormRefactored` 組件：

```tsx
import AuthFormRefactored from '路徑/到/(auth)/components/AuthFormRefactored';

export default function SignInPage() {
  return <AuthFormRefactored isLogin={true} />;
}
```

### 3. 顯示用戶資訊

系統會自動根據用戶登入狀態顯示相應的界面：
- 已登入：顯示用戶頭像、名稱和下拉選單
- 未登入：顯示登入和註冊按鈕

## 認證流程

1. **登入流程**：
   - 用戶填寫電子郵件和密碼
   - 表單驗證通過後調用 `signIn` 方法
   - 認證成功後自動跳轉到首頁
   
2. **註冊流程**：
   - 用戶填寫電子郵件、密碼和確認密碼
   - 表單驗證通過後調用 `signUp` 方法
   - 註冊成功後自動跳轉到首頁

3. **第三方登入**：
   - 點擊 Google 或 GitHub 按鈕
   - 調用 `socialSignIn` 方法
   - 認證成功後自動跳轉到首頁

4. **登出流程**：
   - 用戶點擊登出按鈕
   - 調用 `signOut` 方法
   - 界面自動更新為未登入狀態

## 錯誤處理

認證過程中的錯誤由 AuthContext 統一處理，並通過 `error` 狀態暴露給組件使用。
表單組件會自動顯示這些錯誤信息，包括：

- 電子郵件格式錯誤
- 密碼強度不足
- 帳號不存在或密碼錯誤
- 電子郵件已被使用
- 第三方登入相關錯誤

## 擴展建議

1. **用戶資料管理**：
   - 創建 `/profile` 頁面顯示和編輯用戶資料
   - 實現修改密碼功能
   
2. **權限管理**：
   - 建立角色和權限系統
   - 實現基於角色的頁面訪問控制

3. **記住登入**：
   - 增加「記住我」選項
   - 實現自動登入功能

4. **多語言支持**：
   - 將認證相關的文本抽取到語言檔案
   - 實現多語言切換功能
