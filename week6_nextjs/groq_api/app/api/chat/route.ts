import { NextRequest, NextResponse } from 'next/server';
import { GroqApiRequest } from '../../types/chat';

// GROQ API 的端點
const GROQ_API_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * 處理聊天 API 請求
 * @param request - 接收到的 Next.js 請求
 * @returns NextResponse 包含 GROQ API 的回應
 */
export async function POST(request: NextRequest) {
  try {
    // 解析請求內容
    const body = await request.json() as GroqApiRequest;
    
    // 獲取 API 金鑰
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ API 金鑰未設定。請在 .env 檔案中配置 GROQ_API_KEY。' },
        { status: 500 }
      );
    }

    // 獲取模型名稱（使用請求中提供的或預設值）
    const model = body.model || process.env.NEXT_PUBLIC_GROQ_MODEL || 'llama3-70b-8192';

    // 準備發送到 GROQ API 的請求
    const groqRequest = {
      model,
      messages: body.messages,
      temperature: body.temperature || 0.7,
      max_tokens: body.max_tokens || 4096,
      stream: body.stream || false
    };

    // 發送請求到 GROQ API
    const response = await fetch(GROQ_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(groqRequest)
    });

    // 檢查回應狀態
    if (!response.ok) {
      const errorData = await response.json();
      console.error('GROQ API 錯誤:', errorData);
      return NextResponse.json(
        { error: `GROQ API 錯誤: ${errorData.error?.message || '未知錯誤'}` },
        { status: response.status }
      );
    }

    // 如果是流式回應，直接代理到客戶端
    if (body.stream && response.body) {
      // 創建一個新的 ReadableStream
      return new NextResponse(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    // 非流式回應，直接返回 JSON
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('處理聊天請求時發生錯誤:', error);
    return NextResponse.json(
      { error: `處理聊天請求時發生錯誤: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
