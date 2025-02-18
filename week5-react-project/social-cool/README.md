# 科技商城 - React + Tailwind CSS 電商網站

一個現代化的電商網站，使用 React 和 Tailwind CSS 開發，展示了豐富的互動效果和響應式設計。

## 🌟 特色功能

- 🎨 深色模式支援
- 🛍️ 完整的購物流程
- 👕 商品客製化功能
- 🎯 限時特賣活動
- 📱 響應式設計
- ✨ 豐富的動畫效果

## 🔧 技術棧

- **前端框架**: React 18
- **樣式框架**: Tailwind CSS
- **路由**: React Router v6
- **狀態管理**: React Hooks
- **開發工具**: Vite

## 📦 安裝與運行

1. 克隆專案
```bash
git clone [專案地址]
cd social-cool
```

2. 安裝依賴
```bash
npm install
```

3. 運行開發環境
```bash
npm run dev
```

4. 建置生產版本
```bash
npm run build
```

## 📂 目錄結構

```
src/
├── components/         # React 組件
│   ├── HomePage.jsx   # 首頁
│   ├── Navbar.jsx     # 導航欄
│   ├── ProductList.jsx # 商品列表
│   ├── ProductDetail.jsx # 商品詳情
│   ├── Cart.jsx       # 購物車
│   ├── Profile.jsx    # 會員中心
│   ├── About.jsx      # 關於我們
│   ├── ProductShowcase.jsx # 商品展示
│   ├── CustomProduct.jsx # 商品客製化
│   └── SaleEvent.jsx  # 特賣活動
├── context/           # React Context
│   └── DarkModeContext.jsx # 深色模式
├── App.jsx           # 主應用組件
└── main.jsx         # 應用入口
```

## 📱 頁面說明

### 1. 首頁 (HomePage)
- Hero 區塊展示
- 精選商品
- 主要功能區塊
- 訂閱區塊

### 2. 商品展示 (ProductShowcase)
- 360度商品預覽
- 動態顏色切換
- 規格展開/收合
- 互動式展示效果

### 3. 商品客製化 (CustomProduct)
- 即時預覽
- 尺寸選擇
- 顏色選擇
- 文字客製化
- 動態價格計算

### 4. 特賣活動 (SaleEvent)
- 倒數計時器
- 限時優惠價格
- 庫存顯示
- 動態背景效果

### 5. 其他頁面
- 商品列表
- 商品詳情
- 購物車
- 會員中心
- 關於我們

## ⚛️ React 特性運用

- **Hooks 使用**
  - useState 管理組件狀態
  - useEffect 處理副作用
  - useContext 管理全局狀態

- **組件設計**
  - 功能型組件
  - 可重用組件
  - 響應式組件

- **狀態管理**
  - Context API
  - Props 傳遞
  - 狀態提升

## 🎨 Tailwind CSS 特性運用

- **響應式設計**
  ```css
  sm: /* 640px */
  md: /* 768px */
  lg: /* 1024px */
  xl: /* 1280px */
  ```

- **深色模式**
  ```css
  dark:bg-gray-800
  dark:text-white
  ```

- **動畫效果**
  ```css
  animate-pulse
  animate-bounce
  transition-transform
  ```

- **Flex & Grid**
  ```css
  flex
  grid
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  ```

- **漸層背景**
  ```css
  bg-gradient-to-br
  from-indigo-500
  via-purple-500
  to-pink-500
  ```

## 📝 開發注意事項

1. **組件開發規範**
   - 使用函數式組件
   - 添加適當的註釋
   - 保持代碼整潔

2. **樣式開發規範**
   - 優先使用 Tailwind 類名
   - 保持一致的命名規範
   - 注意響應式設計

3. **性能優化**
   - 使用 React.memo 優化渲染
   - 適當使用 useMemo 和 useCallback
   - 避免不必要的重渲染

4. **代碼提交規範**
   - 清晰的提交信息
   - 遵循 Git Flow 工作流
   - 及時處理衝突

## 🤝 貢獻指南

1. Fork 專案
2. 創建特性分支
3. 提交更改
4. 發起 Pull Request

## 📄 授權

本專案採用 MIT 授權條款
