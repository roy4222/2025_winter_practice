// 獲取 DOM 元素
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

// 定義產品列表
const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

// 動態生成產品卡片
products.forEach(
  ({ name, id, price, category }) => {
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
  }
);

// 定義購物車類
class ShoppingCart {
  // 構造函數初始化購物車
  constructor() {
    this.items = [];        // 存儲購物車中的商品
    this.total = 0;         // 購物車總金額
    this.taxRate = 8.25;    // 稅率（百分比）
  }

  // 添加商品到購物車
  addItem(id, products) {
    // 根據 id 在產品列表中查找對應的商品
    const product = products.find((item) => item.id === id);
    const { name, price } = product;

    // 將商品添加到購物車
    this.items.push(product);

    // 計算每種商品的數量
    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      // 使用對象來統計每種商品的數量
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    // 獲取當前添加商品的數量
    const currentProductCount = totalCountPerProduct[product.id];
    // 獲取顯示當前商品數量的 DOM 元素
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    // 更新購物車顯示
    if (currentProductCount > 1) {
      // 如果商品數量大於 1，更新數量顯示
      currentProductCountSpan.textContent = `${currentProductCount}x`;
    } else {
      // 如果是新添加的商品，創建新的 DOM 元素
      productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `;
    }
  }

  // 獲取購物車商品數量
  getCounts() {
    return this.items.length;
  }

  // 清空購物車
  clearCart() {
    if (!this.items.length) {
      alert("您的購物車已經是空的");
      return;
    }

    const isCartCleared = confirm(
      "您確定要清空購物車中的所有商品嗎？"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  // 計算稅金
  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  // 計算總價
  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

// 創建購物車實例
const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

// 為每個添加到購物車按鈕添加點擊事件
[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // 獲取被點擊按鈕的 ID，並轉換為數字
    const productId = Number(event.target.id);
    
    // 將商品添加到購物車
    cart.addItem(productId, products);
    
    // 更新購物車中的商品總數顯示
    totalNumberOfItems.textContent = cart.getCounts();
    
    // 重新計算購物車總價並更新顯示
    cart.calculateTotal();
  });
});

// 切換購物車顯示/隱藏
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

// 清空購物車按鈕事件
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));
