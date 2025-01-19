// 購物車類別
class ShoppingCart {
    // 建構函式
    constructor() {
        // 從 localStorage 讀取購物車內容，如果沒有則初始化為空陣列
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        // 初始化購物車
        this.init();
    }

    // 初始化購物車
    init() {
        // 更新購物車 UI
        this.updateCartUI();
        // 設定事件監聽器
        this.setupEventListeners();
    }

    // 加入商品到購物車
    addItem(product) {
        // 檢查商品是否已存在於購物車中
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            // 如果商品已存在，增加數量
            existingItem.quantity += 1;
        } else {
            // 如果商品不存在，新增商品到購物車
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        // 儲存購物車內容
        this.saveCart();
        // 更新購物車 UI
        this.updateCartUI();
        // 顯示提示訊息
        this.showToast(`已將 ${product.name} 加入購物車`);
    }

    // 從購物車移除商品
    removeItem(productId) {
        // 找到要移除的商品索引
        const index = this.items.findIndex(item => item.id === productId);
        if (index > -1) {
            // 如果找到商品，記錄被移除的商品
            const removedItem = this.items[index];
            // 從陣列中移除該商品
            this.items.splice(index, 1);
            // 儲存購物車內容
            this.saveCart();
            // 更新購物車 UI
            this.updateCartUI();
            // 顯示提示訊息
            this.showToast(`已將 ${removedItem.name} 從購物車移除`);
        }
    }

    // 更新商品數量
    updateQuantity(productId, quantity) {
        // 找到要更新數量的商品
        const item = this.items.find(item => item.id === productId);
        if (item) {
            // 更新商品數量
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                // 如果數量小於等於 0，移除該商品
                this.removeItem(productId);
            } else {
                // 儲存購物車內容
                this.saveCart();
                // 更新購物車 UI
                this.updateCartUI();
            }
        }
    }

    // 清空購物車
    clearCart() {
        // 清空購物車內容
        this.items = [];
        // 儲存購物車內容
        this.saveCart();
        // 更新購物車 UI
        this.updateCartUI();
        // 顯示提示訊息
        this.showToast('購物車已清空');
    }

    // 計算總金額
    calculateTotal() {
        // 使用 reduce 方法計算總金額
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // 儲存購物車到 localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // 更新購物車 UI
    updateCartUI() {
        // 更新購物車圖標上的數量
        const cartCount = this.items.reduce((total, item) => total + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = cartCount;
        }

        // 更新購物車頁面的內容
        const cartContent = document.querySelector('.cart-content');
        if (cartContent) {
            if (this.items.length === 0) {
                // 如果購物車為空，顯示空購物車訊息
                cartContent.innerHTML = `
                    <div class="text-center py-5">
                        <i class="bi bi-cart-x display-1 text-muted mb-4"></i>
                        <h3>購物車是空的</h3>
                        <p class="text-muted">快去選購喜歡的商品吧！</p>
                        <a href="product.html" class="btn btn-primary">
                            <i class="bi bi-shop me-2"></i>繼續購物
                        </a>
                    </div>
                `;
            } else {
                // 如果購物車有商品，顯示商品列表
                cartContent.innerHTML = `
                    <div class="table-responsive">
                        <table class="table align-middle">
                            <thead>
                                <tr>
                                    <th>商品</th>
                                    <th>價格</th>
                                    <th>數量</th>
                                    <th>小計</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.items.map(item => `
                                    <tr class="align-middle">
                                        <td style="min-width: 300px;">
                                            <div class="d-flex align-items-center gap-3">
                                                <img src="${item.image}" alt="${item.name}" 
                                                     class="rounded shadow-sm" 
                                                     style="width: 100px; height: 100px; object-fit: cover;">
                                                <div>
                                                    <h6 class="mb-1 fw-bold">${item.name}</h6>
                                                    <span class="text-muted small">商品編號：${item.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-primary fw-semibold" style="min-width: 150px;">
                                            NT$ ${item.price.toLocaleString()}
                                        </td>
                                        <td style="min-width: 150px;">
                                            <div class="input-group input-group-sm">
                                                <!-- 減少數量按鈕 -->
                                                <button class="btn btn-outline-secondary px-3" type="button" 
                                                        onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                                                    <i class="bi bi-dash"></i>
                                                </button>
                                                <!-- 數量輸入框 -->
                                                <input type="number" class="form-control text-center fw-bold" value="${item.quantity}" 
                                                       min="1" max="99"
                                                       onchange="cart.updateQuantity(${item.id}, this.value)">
                                                <!-- 增加數量按鈕 -->
                                                <button class="btn btn-outline-secondary px-3" type="button"
                                                        onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                                                    <i class="bi bi-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <!-- 小計金額 -->
                                        <td class="text-success fw-bold" style="min-width: 150px;">
                                            NT$ ${(item.price * item.quantity).toLocaleString()}
                                        </td>
                                        <td>
                                            <!-- 移除商品按鈕 -->
                                            <button class="btn btn-outline-danger" 
                                                    onclick="cart.removeItem(${item.id})"
                                                    title="移除商品">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <!-- 購物車底部操作區 -->
                    <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                        <!-- 清空購物車按鈕 -->
                        <button class="btn btn-outline-danger btn-lg" onclick="cart.clearCart()">
                            <i class="bi bi-trash me-2"></i>清空購物車
                        </button>
                        <!-- 總計金額和結帳按鈕 -->
                        <div class="text-end">
                            <div class="text-muted mb-2">總計金額</div>
                            <h3 class="text-success mb-3">NT$ ${this.calculateTotal().toLocaleString()}</h3>
                            <!-- 前往結帳按鈕 -->
                            <button class="btn btn-primary btn-lg px-5" onclick="cart.checkout()">
                                <i class="bi bi-credit-card me-2"></i>前往結帳
                            </button>
                        </div>
                    </div>
                `;
            }
        }
    }

    // 結帳功能
    checkout() {
        if (this.items.length === 0) {
            // 如果購物車為空，顯示提示訊息
            this.showToast('購物車是空的，請先加入商品');
            return;
        }
        // 這裡可以添加結帳邏輯
        this.showToast('前往結帳...');
        // 導向結帳頁面（目前被註解掉）
        // window.location.href = 'checkout.html';
    }

    // 顯示提示訊息
    showToast(message) {
        // 建立 Toast HTML
        const toastHTML = `
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">購物車通知</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            </div>
        `;
        
        // 將 Toast 插入到 body 中
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        // 獲取 Toast 元素
        const toastElement = document.querySelector('.toast');
        // 建立 Bootstrap Toast 實例
        const toast = new bootstrap.Toast(toastElement);
        // 顯示 Toast
        toast.show();
        
        // 3 秒後移除 Toast 元素
        setTimeout(() => {
            toastElement.parentElement.remove();
        }, 1500);
    }

    // 設定事件監聽器
    setupEventListeners() {
        // 為所有加入購物車按鈕添加點擊事件監聽器
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                // 從按鈕的 data 屬性中獲取商品資訊
                const productId = parseInt(button.dataset.productId);
                const product = {
                    id: productId,
                    name: button.dataset.productName,
                    price: parseInt(button.dataset.productPrice),
                    image: button.dataset.productImage
                };
                // 將商品加入購物車
                this.addItem(product);
            });
        });
    }
}

// 創建購物車實例
const cart = new ShoppingCart();
