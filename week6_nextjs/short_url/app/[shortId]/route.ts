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

    // 如果找不到短網址，返回 404 HTML 頁面
    if (querySnapshot.empty) {
      console.log(`短網址 ${shortId} 不存在`);
      
      // 返回自定義的 404 HTML 頁面
      const html404 = `
        <!DOCTYPE html>
        <html lang="zh-TW">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>短網址不存在 - 404</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
            <div class="max-w-lg w-full text-center">
              <div class="mb-8">
                <div class="text-6xl mb-4">🔗❌</div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">短網址不存在</h1>
                <p class="text-gray-600 mb-8">
                  抱歉，您訪問的短網址 <code class="bg-gray-200 px-2 py-1 rounded">${shortId}</code> 無法找到。
                </p>
              </div>
              
              <div class="space-y-4 mb-8">
                <a href="/" class="inline-block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  🏠 返回首頁
                </a>
                <a href="/" class="inline-block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  ➕ 創建新的短網址
                </a>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="font-semibold text-gray-900 mb-4 flex items-center justify-center">
                  <span class="mr-2">💡</span>可能的原因
                </h3>
                <div class="grid grid-cols-1 gap-3 text-sm text-gray-600">
                  <div class="flex items-start">
                    <span class="text-red-500 mr-2">•</span>
                    <span>短網址輸入錯誤或不完整</span>
                  </div>
                  <div class="flex items-start">
                    <span class="text-orange-500 mr-2">•</span>
                    <span>短網址已過期或被刪除</span>
                  </div>
                  <div class="flex items-start">
                    <span class="text-yellow-500 mr-2">•</span>
                    <span>原始網址已失效</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      
      return new NextResponse(html404, {
        status: 404,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    // 取得原始網址
    const doc = querySnapshot.docs[0];
    const { originalUrl } = doc.data();

    console.log(`重定向到: ${originalUrl}`);

    // 重定向到原始網址
    return NextResponse.redirect(originalUrl);
  } catch (error) {
    console.error('處理短網址重定向時發生錯誤:', error);
    
    // 返回錯誤頁面
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>服務器錯誤 - 500</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div class="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center px-4">
          <div class="max-w-md w-full text-center">
            <div class="text-6xl mb-4">⚠️</div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">服務器錯誤</h1>
            <p class="text-gray-600 mb-8">處理您的請求時發生錯誤，請稍後再試。</p>
            <a href="/" class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              返回首頁
            </a>
          </div>
        </div>
      </body>
      </html>
    `;
    
    return new NextResponse(errorHtml, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }
} 