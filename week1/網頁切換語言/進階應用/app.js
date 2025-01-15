// ===== 全域變數 =====
// 儲存當前使用的語言，預設為中文
let currentLang = 'zh-TW';

// ===== 核心功能：更新頁面內容 =====
/**
 * 根據選擇的語言更新頁面所有文字內容
 * @param {string} lang - 目標語言代碼（zh-TW/en-US/ja-JP）
 */
function updateContent(lang) {
    // 尋找所有帶有 data-lang-key 屬性的元素
    // data-lang-key 用來標記需要翻譯的文字
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        // 獲取翻譯用的鍵值
        const key = element.getAttribute('data-lang-key');
        // 檢查該語言和鍵值是否存在於翻譯檔中
        if (translations[lang] && translations[lang][key]) {
            // 更新元素的文字內容
            element.textContent = translations[lang][key];
        }
    });

    // 更新 HTML 標籤的語言屬性
    document.documentElement.lang = lang;

    // 根據不同語言更新輸入框的提示文字
    if (lang === 'zh-TW') {
        document.getElementById('amount').placeholder = '輸入金額';
    } else if (lang === 'en-US') {
        document.getElementById('amount').placeholder = 'Enter amount';
    } else if (lang === 'ja-JP') {
        document.getElementById('amount').placeholder = '金額を入力';
    }
}

// ===== 語言切換功能 =====
/**
 * 處理語言切換的函數
 * 當使用者從下拉選單選擇新語言時觸發
 */
function changeLanguage() {
    // 獲取使用者選擇的語言
    const selectedLang = document.getElementById('languageSelect').value;
    // 更新當前語言
    currentLang = selectedLang;
    // 更新頁面內容
    updateContent(selectedLang);
    
    // 將語言偏好儲存到 localStorage，下次訪問時可以直接使用
    localStorage.setItem('preferredLanguage', selectedLang);
}

// ===== 貨幣換算功能 =====
/**
 * 執行貨幣換算計算
 * 將台幣轉換為選擇的目標貨幣
 */
function convertCurrency() {
    // 獲取輸入金額和目標貨幣
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    
    // 設定匯率（相對於台幣）
    const rates = {
        TWD: 1,
        USD: 0.033,  // 1 TWD = 0.033 USD
        JPY: 3.6     // 1 TWD = 3.6 JPY
    };

    // 根據當前語言格式化輸出結果
    let result = '';
    if (currentLang === 'zh-TW') {
        result = `${amount} TWD = ${(amount * rates[currency]).toFixed(2)} ${currency}`;
    } else if (currentLang === 'en-US') {
        result = `${amount} TWD = ${(amount * rates[currency]).toFixed(2)} ${currency}`;
    } else if (currentLang === 'ja-JP') {
        result = `${amount} TWD = ${(amount * rates[currency]).toFixed(2)} ${currency}`;
    }

    // 顯示結果
    document.getElementById('conversion-result').textContent = result;
}

// ===== 天氣資訊功能 =====
/**
 * 更新天氣資訊
 * 這是一個模擬功能，實際應用中應該從氣象 API 獲取真實數據
 */
function updateWeather() {
    // 定義各語言版本的天氣資訊
    const cities = {
        'zh-TW': {
            city: '台北',
            temp: Math.floor(Math.random() * 10 + 20),  // 隨機生成 20-30 度
            condition: '晴天'
        },
        'en-US': {
            city: 'Taipei',
            temp: Math.floor(Math.random() * 10 + 20),
            condition: 'Sunny'
        },
        'ja-JP': {
            city: '台北',
            temp: Math.floor(Math.random() * 10 + 20),
            condition: '晴れ'
        }
    };

    // 獲取當前語言的天氣資訊
    const weather = cities[currentLang];
    const weatherInfo = document.getElementById('weather-info');
    
    // 根據不同語言格式化天氣資訊
    if (currentLang === 'zh-TW') {
        weatherInfo.textContent = `${weather.city}: ${weather.temp}°C，${weather.condition}`;
    } else if (currentLang === 'en-US') {
        weatherInfo.textContent = `${weather.city}: ${weather.temp}°C, ${weather.condition}`;
    } else if (currentLang === 'ja-JP') {
        weatherInfo.textContent = `${weather.city}: ${weather.temp}°C、${weather.condition}`;
    }
}

// ===== 頁面初始化 =====
/**
 * 當 DOM 完全載入後執行初始化
 */
document.addEventListener('DOMContentLoaded', () => {
    // 檢查 localStorage 中是否有儲存的語言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        // 如果有，使用儲存的語言偏好
        currentLang = savedLang;
        document.getElementById('languageSelect').value = savedLang;
        updateContent(savedLang);
    }

    // 初次更新天氣資訊
    updateWeather();
    // 設定定時器，每 30 秒更新一次天氣資訊
    setInterval(updateWeather, 30000);
});
