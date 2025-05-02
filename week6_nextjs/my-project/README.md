# 馬剃天愛星角色介紹頁面實作指南

本專案基於Next.js框架，使用TypeScript和Tailwind CSS構建動畫角色介紹頁面。

## 開發計劃

### 第一階段：環境設置
1. 安裝必要依賴包
   ```bash
   npm install animejs @types/animejs
   ```

2. 創建基本檔案結構
   - `/app/components/character/` - 角色相關元件
   - `/app/components/animations/` - 動畫效果
   - `/public/images/` - 角色圖片資源

### 第二階段：基礎元件開發
1. 設計角色主頁面佈局
   - 響應式設計，適應不同裝置
   - 使用Grid系統分割內容區域

2. 建立角色圖片元件
   - 添加基本動畫效果：浮動、閃光
   - 實現懸停互動效果

3. 建立角色資訊區塊
   - 角色基本資料展示
   - 添加入場動畫效果

### 第三階段：進階動畫效果
1. 角色反差萌轉換效果
   - 學生會副會長 ⟷ 腐女模式切換
   - 使用Anime.js實現翻轉動畫

2. 滾動觸發動畫
   - 建立IntersectionObserver監聽滾動
   - 實現逐項顯示效果

3. 特殊互動效果
   - 點擊互動展示冒失特質
   - 滑鼠跟隨效果

### 第四階段：優化與完善
1. 代碼優化
   - 提取共用動畫邏輯
   - 使用React Hooks管理動畫狀態

2. 性能優化
   - 圖片優化與懶加載
   - 動畫效能測試與調整

3. 可訪問性改進
   - 確保動畫可以被停用
   - 添加適當的ARIA標籤

## 專案啟動
按照標準Next.js流程運行開發伺服器：
```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看結果。

