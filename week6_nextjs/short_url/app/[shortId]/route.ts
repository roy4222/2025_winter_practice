import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, urlsCollection } from '@/lib/firebase';

/**
 * 處理短網址重定向的 GET 請求
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } }
) {
  try {
    const { shortId } = params;

    console.log(`嘗試查找短網址: ${shortId}`);

    // 查詢短網址
    const q = query(urlsCollection, where('shortId', '==', shortId));
    const querySnapshot = await getDocs(q);

    // 如果找不到短網址，重定向到 404 頁面
    if (querySnapshot.empty) {
      console.log(`短網址 ${shortId} 不存在`);
      return NextResponse.redirect(new URL('/not-found', request.url));
    }

    // 取得原始網址
    const doc = querySnapshot.docs[0];
    const { originalUrl } = doc.data();

    console.log(`重定向到: ${originalUrl}`);

    // 重定向到原始網址
    return NextResponse.redirect(originalUrl);
  } catch (error) {
    console.error('處理短網址重定向時發生錯誤:', error);
    // 發生錯誤時重定向到 404 頁面
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
} 