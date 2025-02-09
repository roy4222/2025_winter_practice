# 垃圾郵件過濾器測試範例

以下提供多個測試案例，幫助您測試和驗證垃圾郵件過濾器的功能。每個案例都標註了預期會觸發的規則和大致的垃圾郵件指數範圍。

## 高風險垃圾郵件範例

### 1. 典型詐騙郵件
```
Dear friend,

I am pleased to inform you that you've won 1 million dollars in our lottery! 
Please send your bank account details for immediate transfer.

Urgent action required!
```
預期結果：
- 觸發規則：可疑稱謂、中獎詐騙、銀行轉帳相關、緊急行動
- 垃圾指數：85-95

### 2. 藥品廣告
```
Buy V1AGRA and C1AL1S now! 
Best prices, free shipping worldwide.
Limited time offer - 90% discount!
```
預期結果：
- 觸發規則：藥品廣告、緊急行動
- 垃圾指數：70-80

### 3. 賭博推廣
```
Try your luck at our online casino!
Poker, slots and more with 500 dollars free bonus.
Bet now and win big!
```
預期結果：
- 觸發規則：賭博相關、金錢相關
- 垃圾指數：75-85

## 中等風險垃圾郵件範例

### 4. 股票推薦
```
STOCK ALERT!!!
Don't miss this amazing investment opportunity.
Buy XYZ stocks now before the price goes up!
```
預期結果：
- 觸發規則：股票詐騙、緊急行動
- 垃圾指數：50-60

### 5. 求助詐騙
```
Please help me transfer 5000 dollars.
I am stuck in a foreign country and need urgent assistance.
I will pay you back double the amount!
```
預期結果：
- 觸發規則：求助類型、金錢相關、緊急行動
- 垃圾指數：40-50

## 低風險範例

### 6. 促銷郵件
```
Special offer this weekend!
20% off on all products.
Don't miss out!
```
預期結果：
- 觸發規則：緊急行動
- 垃圾指數：20-30

## 正常郵件範例

### 7. 一般業務郵件
```
Hi John,

Following up on our meeting yesterday. I've attached the project timeline and budget for your review.

Best regards,
Mary
```
預期結果：
- 不應觸發任何規則
- 垃圾指數：0

### 8. 朋友間的對話
```
嗨！

這週末要不要一起去看電影？
新上映的那部聽說很好看。

期待你的回覆！
```
預期結果：
- 不應觸發任何規則
- 垃圾指數：0

## 自定義規則測試範例

### 9. 測試特定關鍵詞規則
假設添加了以下自定義規則：
- 模式：`免費|優惠|特價`
- 描述：促銷關鍵詞
- 權重：3

測試文本：
```
限時優惠！
全場商品特價中！
買就送免費贈品！
```
預期結果：
- 應觸發自定義規則
- 垃圾指數：取決於權重設定

### 10. 測試電話號碼規則
假設添加了以下自定義規則：
- 模式：`\d{4}[-\s]?\d{3}[-\s]?\d{3}`
- 描述：電話號碼
- 權重：5

測試文本：
```
請撥打服務專線：
0900-123-456
有任何問題都可以聯繫我們！
```
預期結果：
- 應觸發自定義規則
- 垃圾指數：取決於權重設定

## 使用建議

1. 建議按順序測試這些範例，觀察系統的反應
2. 可以嘗試修改範例內容，測試系統的靈敏度
3. 使用自定義規則範例來測試規則添加功能
4. 觀察不同組合的規則如何影響最終的垃圾指數
5. 特別注意系統對正常郵件的處理，確保不會誤判

## 注意事項

- 實際的垃圾指數可能會因規則權重設定而與預期值有所差異
- 系統判斷是基於規則匹配，可能需要根據實際使用情況調整規則
- 建議定期使用這些測試案例來驗證系統的穩定性和準確性
