const products = [
    {id: 1, name: "Tomatoes", price: 10, category: "vegetables", image: "assets/images/tomatoes.jpg"},
    {id: 2, name: "Milk", price: 20, category: "dairy", image: "assets/images/milk.jpg"},
    {id: 3, name: "Rice", price: 9, category: "cereal", image: "assets/images/cereal.jpg"},
    {id: 4, name: "Fruit", price: 5, category: "fruits", image: "assets/images/fruits.jpg"},
    {id: 5, name: "Onions", price: 8, category: "vegetables", image: "assets/images/onions.jpg"},
    {id: 6, name: "Lettuces", price: 10, category: "vegetables", image: "assets/images/lettuce.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const searchbar = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filter");

function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-3 col-sm-6";

    const cartItem = cart.find(item => item.id === product.id);

    col.innerHTML = `
    <div class="card text-white border-0 shadow-sm overflow-hidden product-card h-100">
        <img src="${product.image}" class="card-img h-100" alt="${product.name}">
        <div class="card-img-overlay d-flex flex-column justify-content-end text-center">
            <h5 class="fw-bold">${product.name}</h5>
            <p class="mb-2">Ghc ${product.price}</p>

            <div id="action-${product.id}">
                ${cartItem
                    ? `
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <button class="btn btn-outline-light btn-sm" onclick="updateQuantity(${product.id}, -1)">-</button>
                        <span class="fw-bold">${cartItem.quantity}</span>
                        <button class="btn btn-outline-light btn-sm" onclick="updateQuantity(${product.id}, 1)">+</button>
                        <a href="cart.html" class="btn btn-success btn-sm">View Cart</a>
                    </div>
                    `
                    : `<button class="btn btn-success btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>`
                }
            </div>
        </div>
    </div>
    `;
    productList.appendChild(col);
    });
}

displayProducts(products);

function filterProducts() {
    const keyword = searchbar.value.toLowerCase();
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    if (selectedCategory !== "all") {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    displayProducts(filtered);
}

if (searchbar) searchbar.addEventListener("input", filterProducts);
if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    }else{
        cart.push({ ...product, quantity: 1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    filterProducts();
}

function updateQuantity(productId, change) {
    const item = cart.find(p => p.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== productId);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    filterProducts();
}