// 購物車類別
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    // 初始化購物車
    init() {
        this.updateCartUI();
        this.setupEventListeners();
    }

    // 加入商品到購物車
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        this.saveCart();
        this.updateCartUI();
        this.showToast(`已將 ${product.name} 加入購物車`);
    }

    // 從購物車移除商品
    removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index > -1) {
            const removedItem = this.items[index];
            this.items.splice(index, 1);
            this.saveCart();
            this.updateCartUI();
            this.showToast(`已將 ${removedItem.name} 從購物車移除`);
        }
    }

    // 更新商品數量
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    // 清空購物車
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
        this.showToast('購物車已清空');
    }

    // 計算總金額
    calculateTotal() {
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
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img src="${item.image}" alt="${item.name}" 
                                                     class="rounded me-3" style="width: 80px; height: 80px; object-fit: cover;">
                                                <div>
                                                    <h6 class="mb-0">${item.name}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>NT$ ${item.price.toLocaleString()}</td>
                                        <td>
                                            <div class="input-group" style="width: 120px;">
                                                <button class="btn btn-outline-secondary" type="button" 
                                                        onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                                <input type="number" class="form-control text-center" value="${item.quantity}" 
                                                       onchange="cart.updateQuantity(${item.id}, this.value)">
                                                <button class="btn btn-outline-secondary" type="button"
                                                        onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                            </div>
                                        </td>
                                        <td>NT$ ${(item.price * item.quantity).toLocaleString()}</td>
                                        <td>
                                            <button class="btn btn-outline-danger btn-sm" onclick="cart.removeItem(${item.id})">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-4">
                        <button class="btn btn-outline-danger" onclick="cart.clearCart()">
                            <i class="bi bi-trash me-2"></i>清空購物車
                        </button>
                        <div class="text-end">
                            <h4>總計：NT$ ${this.calculateTotal().toLocaleString()}</h4>
                            <button class="btn btn-primary btn-lg mt-2" onclick="cart.checkout()">
                                <i class="bi bi-credit-card me-2"></i>結帳
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
            this.showToast('購物車是空的，請先加入商品');
            return;
        }
        // 這裡可以添加結帳邏輯
        this.showToast('前往結帳...');
        // window.location.href = 'checkout.html';
    }

    // 顯示提示訊息
    showToast(message) {
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
        
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        const toastElement = document.querySelector('.toast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        setTimeout(() => {
            toastElement.parentElement.remove();
        }, 3000);
    }

    // 設定事件監聽器
    setupEventListeners() {
        // 加入購物車按鈕
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(button.dataset.productId);
                const product = {
                    id: productId,
                    name: button.dataset.productName,
                    price: parseInt(button.dataset.productPrice),
                    image: button.dataset.productImage
                };
                this.addItem(product);
            });
        });
    }
}

// 創建購物車實例
const cart = new ShoppingCart();
