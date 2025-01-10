// 模擬商品數據，實際應用中通常從後端API獲取
const products = [
    { id: 1, name: '智慧手錶', price: 3999, image: 'https://via.placeholder.com/200' },
    { id: 2, name: '無線耳機', price: 2499, image: 'https://via.placeholder.com/200' },
    { id: 3, name: '藍牙喇叭', price: 1999, image: 'https://via.placeholder.com/200' },
    { id: 4, name: '行動電源', price: 999, image: 'https://via.placeholder.com/200' },
    { id: 5, name: '手機支架', price: 299, image: 'https://via.placeholder.com/200' },
    { id: 6, name: '充電線', price: 199, image: 'https://via.placeholder.com/200' },
    { id: 7, name: '保護殼', price: 499, image: 'https://via.placeholder.com/200' },
    { id: 8, name: '螢幕保護貼', price: 299, image: 'https://via.placeholder.com/200' },
];

// 當DOM完全載入後初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();        // 載入使用者的主題偏好
    displayProducts();  // 顯示商品列表
    loadCart();         // 載入購物車內容
    loadSearchHistory();// 載入搜尋歷史
    loadRecentlyViewed();// 載入最近瀏覽商品
});

// ===== 主題切換功能 =====
// 從cookie載入使用者的主題偏好
function loadTheme() {
    // 獲取儲存的主題，如果沒有則預設為淺色
    const theme = Cookies.get('theme') || 'light';
    // 設置body的data-theme屬性來切換主題
    document.body.setAttribute('data-theme', theme);
    // 更新切換按鈕的文字
    document.getElementById('theme-toggle').textContent = 
        theme === 'light' ? '切換深色模式' : '切換淺色模式';
}

// 監聽主題切換按鈕的點擊事件
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    // 更新主題
    document.body.setAttribute('data-theme', newTheme);
    // 將主題偏好保存到cookie，有效期365天
    Cookies.set('theme', newTheme, { expires: 365 });
    // 更新按鈕文字
    document.getElementById('theme-toggle').textContent = 
        newTheme === 'light' ? '切換深色模式' : '切換淺色模式';
});

// ===== 商品展示功能 =====
// 在頁面上顯示所有商品
function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = createProductCard(product);
        productsContainer.appendChild(productElement);
    });
}

// 創建單個商品卡片的HTML元素
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'col';
    div.innerHTML = `
        <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">加入購物車</button>
            </div>
        </div>
    `;
    // 點擊商品卡片時添加到最近瀏覽
    div.querySelector('.card').addEventListener('click', () => addToRecentlyViewed(product));
    return div;
}

// ===== 購物車功能 =====
// 從cookie載入購物車內容
function loadCart() {
    // 獲取購物車數據，如果沒有則使用空陣列
    const cart = JSON.parse(Cookies.get('cart') || '[]');
    updateCartDisplay(cart);
}

// 添加商品到購物車
function addToCart(productId) {
    const cart = JSON.parse(Cookies.get('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // 如果商品已在購物車中，增加數量
        existingItem.quantity += 1;
    } else {
        // 否則添加新商品
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, quantity: 1 });
    }
    
    // 保存購物車到cookie，有效期7天
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
    updateCartDisplay(cart);
}

// 更新購物車顯示
function updateCartDisplay(cart) {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    // 為每個購物車項目創建HTML元素
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h6>${item.name}</h6>
                <p>$${item.price} × ${item.quantity}</p>
            </div>
            <div class="quantity-controls">
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    // 更新購物車總數和總金額
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total;
}

// 更新購物車中商品的數量
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(Cookies.get('cart') || '[]');
    
    if (newQuantity <= 0) {
        // 如果數量為0或負數，從購物車中移除該商品
        cart = cart.filter(item => item.id !== productId);
    } else {
        // 否則更新數量
        const item = cart.find(item => item.id === productId);
        if (item) item.quantity = newQuantity;
    }
    
    // 更新cookie和顯示
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
    updateCartDisplay(cart);
}

// ===== 搜尋歷史功能 =====
// 監聽搜尋框的Enter鍵事件
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
        addToSearchHistory(e.target.value.trim());
        e.target.value = '';
    }
});

// 載入搜尋歷史
function loadSearchHistory() {
    const searchHistory = JSON.parse(Cookies.get('searchHistory') || '[]');
    displaySearchHistory(searchHistory);
}

// 添加新的搜尋詞到歷史記錄
function addToSearchHistory(term) {
    let searchHistory = JSON.parse(Cookies.get('searchHistory') || '[]');
    if (!searchHistory.includes(term)) {
        // 將新搜尋詞添加到開頭
        searchHistory.unshift(term);
        // 只保留最近5筆記錄
        searchHistory = searchHistory.slice(0, 5);
        // 保存到cookie，有效期30天
        Cookies.set('searchHistory', JSON.stringify(searchHistory), { expires: 30 });
        displaySearchHistory(searchHistory);
    }
}

// 顯示搜尋歷史
function displaySearchHistory(history) {
    const container = document.getElementById('search-tags');
    container.innerHTML = '';
    history.forEach(term => {
        const tag = document.createElement('span');
        tag.className = 'search-tag';
        tag.textContent = term;
        // 點擊標籤時自動填入搜尋框
        tag.onclick = () => document.getElementById('search-input').value = term;
        container.appendChild(tag);
    });
}

// ===== 最近瀏覽功能 =====
// 載入最近瀏覽的商品
function loadRecentlyViewed() {
    const recentlyViewed = JSON.parse(Cookies.get('recentlyViewed') || '[]');
    displayRecentlyViewed(recentlyViewed);
}

// 添加商品到最近瀏覽
function addToRecentlyViewed(product) {
    let recentlyViewed = JSON.parse(Cookies.get('recentlyViewed') || '[]');
    // 移除已存在的相同商品（如果有）
    recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);
    // 添加到開頭
    recentlyViewed.unshift(product);
    // 只保留最近4個商品
    recentlyViewed = recentlyViewed.slice(0, 4);
    // 保存到cookie，有效期7天
    Cookies.set('recentlyViewed', JSON.stringify(recentlyViewed), { expires: 7 });
    displayRecentlyViewed(recentlyViewed);
}

// 顯示最近瀏覽的商品
function displayRecentlyViewed(products) {
    const container = document.getElementById('recently-viewed');
    container.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h6 class="card-title">${product.name}</h6>
                    <p class="card-text">$${product.price}</p>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// ===== 結帳功能 =====
// 監聽結帳按鈕點擊事件
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('感謝您的購買！');
    // 清空購物車
    Cookies.remove('cart');
    updateCartDisplay([]);
});
