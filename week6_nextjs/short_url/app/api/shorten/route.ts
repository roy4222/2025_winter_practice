import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, urlsCollection } from '@/lib/firebase';
import { generateShortId, isValidUrl, formatShortUrl } from '@/lib/utils';

/**
 * 處理生成短網址的 POST 請求
 */
export async function POST(request: NextRequest) {
  try {
    // 解析請求體
    const body = await request.json();
    const { originalUrl } = body;

    // 驗證網址格式
    if (!originalUrl || !isValidUrl(originalUrl)) {
      return NextResponse.json({ error: '請提供有效的網址' }, { status: 400 });
    }

    // 生成短網址 ID 並確保唯一性
    let shortId = generateShortId();
    let isUnique = false;
    
    // 檢查 ID 是否已存在 (最多嘗試 5 次)
    for (let attempt = 0; attempt < 5 && !isUnique; attempt++) {
      // 查詢是否已存在相同的 shortId
      const q = query(urlsCollection, where('shortId', '==', shortId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        isUnique = true;
      } else {
        // 如果已存在，重新生成
        shortId = generateShortId();
      }
    }
    
    if (!isUnique) {
      return NextResponse.json({ error: '無法生成唯一的短網址，請稍後再試' }, { status: 500 });
    }

    // 儲存到 Firestore
    await addDoc(urlsCollection, {
      shortId,
      originalUrl,
      createdAt: new Date().toISOString()
    });

    // 回傳完整短網址
    const shortUrl = formatShortUrl(shortId);
    
    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error('生成短網址時發生錯誤:', error);
    return NextResponse.json({ error: '處理請求時發生錯誤' }, { status: 500 });
  }
} 