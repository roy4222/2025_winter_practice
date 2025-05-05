# ScrollAnimation.tsx 解釋

ScrollAnimation 是一個強大的滾動觸發動畫組件，用於當使用者滾動頁面時為元素添加動畫效果，讓頁面更加生動有趣。

## 核心原理

這個組件結合了兩個關鍵技術：
1. **Intersection Observer API**：監測元素是否進入視窗範圍
2. **Framer Motion**：處理實際的動畫效果

## 運作機制

1. **元素監測**:
   ```tsx
   const [ref, inView] = useInView({
     threshold,       // 設置可見閾值
     triggerOnce: true, // 設置動畫只觸發一次，避免重複播放
   });
   ```
   - `ref` 附加到 DOM 元素
   - `inView` 表示元素是否可見
   - `threshold` 控制元素多少比例進入視窗才觸發（0.1 = 10%）
   - `triggerOnce` 確保動畫只播放一次

2. **動畫控制**:
   ```tsx
   const controls = useAnimation();
   
   useEffect(() => {
     if (inView) {
       controls.start("visible"); // 元素可見時，將動畫狀態設為"visible"
     }
   }, [controls, inView]);
   ```
   當元素進入視窗時，啟動動畫

3. **動畫變體定義**:
   ```tsx
   const variants = {
     hidden: { ... }, // 隱藏狀態
     visible: { ... }  // 可見狀態
   };
   ```
   定義了元素初始狀態和最終狀態的屬性

## 支援的動畫類型

1. **fadeIn**：淡入效果，元素從透明變為不透明
2. **slideUp**：向上滑動，元素從下方滑入
3. **slideRight**：向右滑動，元素從左側滑入
4. **slideLeft**：向左滑動，元素從右側滑入
5. **scale**：縮放效果，元素從小變大
6. **flip**：翻轉效果，元素繞 X 軸旋轉進入

## 自定義選項

組件接受多個自定義參數：
- `variant`：動畫類型（預設為 fadeIn）
- `delay`：動畫延遲時間（秒）
- `duration`：動畫持續時間（秒）
- `threshold`：觸發閾值，元素進入視窗多少比例時觸發
- `className`：附加的 CSS 類名

## 使用範例

```tsx
<ScrollAnimation 
  variant="slideUp" 
  delay={0.2} 
  duration={0.7}
  threshold={0.3}
>
  <div className="card">
    <h3>產品標題</h3>
    <p>產品描述...</p>
  </div>
</ScrollAnimation>
```

## 優點

1. **使用者體驗提升**：頁面不再呆板，元素隨著滾動自然出現
2. **注意力引導**：動畫可以引導使用者注意到重要內容
3. **性能優化**：只在元素即將進入視窗時啟動動畫，避免不必要的計算
4. **程式碼重用**：無需為每個元素獨立編寫動畫邏輯
5. **低侵入性**：不改變現有組件結構，只需包裹即可添加動畫效果

這個組件非常適合用於產品展示、特色介紹、內容列表等需要逐步顯示內容的場景。
