

document.addEventListener("DOMContentLoaded", () => {
    
    const productContainer = document.getElementById("product-list");
    const searchBar = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let SEED_PRODUCTS = [
        {stock: 100, name: "Apple", price: 5, category: "fruits", image: "assets/images/apple.jpg"},
        {stock: 100, name: "Avocado", price: 10, category: "vegetables", image: "assets/images/avocado.jpg"},
        {stock: 100, name: "Banana", price: 7, category: "fruits", image: "assets/images/banana.jpg"},
        {stock: 100, name: "Cabbage", price: 15, category: "vegetables", image: "assets/images/cabbage.jpg"},
        {stock: 100, name: "Carrot", price: 5, category: "vegetables", image: "assets/images/carrot.jpg"},
        {stock: 100, name: "Cauli Flower", price: 15, category: "vegetables", image: "assets/images/cauliflower.jpg"},
        {stock: 100, name: "Cheese", price: 8, category: "dairy", image: "assets/images/cheese.jpg"},
        {stock: 100, name: "Corn", price: 6, category: "vegetables", image: "assets/images/corn.jpg"},
        {stock: 100, name: "Corn Flakes", price: 18.89, category: "cereal", image: "assets/images/cornflakes.jpg"},
        {stock: 100, name: "Cucumber", price: 8.69, category: "vegetables", image: "assets/images/cucumber.jpg"},
        {stock: 100, name: "Dates", price: 5.99, category: "fruits", image: "assets/images/dates.jpg"},
        {stock: 100, name: "Garlic", price: 9.59, category: "vegetables", image: "assets/images/garlic.jpg"},
        {stock: 100, name: "Granola", price: 11.89, category: "cereal", image: "assets/images/granola.jpg"},
        {stock: 100, name: "Grapes", price: 10.99, category: "fruits", image: "assets/images/grapes.jpg"},
        {stock: 100, name: "Green Beans", price: 12.49, category: "vegetables", image: "assets/images/greenbeans.jpg"},
        {stock: 100, name: "Lemon", price: 7.89, category: "fruits", image: "assets/images/lemon.jpg"},
        {stock: 100, name: "Lettuce", price: 12.74, category: "vegetables", image: "assets/images/lettuce.jpg"},
        {stock: 100, name: "Mango", price: 7.85, category: "fruits", image: "assets/images/mango.jpg"},
        {stock: 100, name: "Mushroom", price: 20.38, category: "vegetables", image: "assets/images/mushroom.jpg"},
        {stock: 100, name: "Oat", price: 10.72, category: "cereal", image: "assets/images/oat.jpg"},
        {stock: 100, name: "Okro", price: 13.85, category: "vegetables", image: "assets/images/okro.jpeg"},
        {stock: 100, name: "Onion", price: 7.58, category: "vegetables", image: "assets/images/onions.jpg"},
        {stock: 100, name: "Orange", price: 5.99, category: "fruits", image: "assets/images/orange.jpg"},
        {stock: 100, name: "Pepper", price: 9.38, category: "vegetables", image: "assets/images/pepper.jpg"},
        {stock: 100, name: "Pineapple", price: 4.98, category: "fruits", image: "assets/images/fruits.jpg"},
        {stock: 100, name: "Potato", price: 7.88, category: "vegetables", image: "assets/images/potato.jpg"},
        {stock: 100, name: "Rice", price: 8.98, category: "cereal", image: "assets/images/cereal.jpg"},
        {stock: 100, name: "Tomatoes", price: 7.68, category: "vegetables", image: "assets/images/tomatoes.jpg"},
        {stock: 100, name: "Water Melon", price: 5.68, category: "fruits", image: "assets/images/watermelon.jpg"},
        {stock: 100, name: "Wheat", price: 10.78, category: "cereal", image: "assets/images/wheat.jpg"},
        {stock: 100, name: "Yogurt", price: 11.93, category: "dairy", image: "assets/images/yogurt.jpg"},
    ];

    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    let products = [...SEED_PRODUCTS];
    storedProducts.forEach(sp => {
        const idx = products.findIndex(p => p.name.toLowerCase() === sp.name.toLowerCase());
        if (idx >= 0) {
            products[idx] = sp;
        } else {
            products.push(sp);
        }
    });

    localStorage.setItem("products", JSON.stringify(products));

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function populateCategories() {
        if (!categoryFilter) return;

        let categories = ["all", ...new Set(
            products
            .filter(prod => prod.category)
            .map(prod => prod.category.toLowerCase()))];

        categoryFilter.innerHTML = categories
        .map(cat => `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`)
        .join("");
    }

    function renderProducts() {
        productContainer.innerHTML = "";

        let filtered = products.filter(product => {
            let matchesSearch = !searchBar || searchBar.value.trim() === ""
                || product.name.toLowerCase().includes(searchBar.value.toLowerCase());
                
            let matchesCategory = !categoryFilter || categoryFilter.value === "all"
                || (product.category && product.category.toLowerCase() === categoryFilter.value.toLowerCase());
            return matchesSearch && matchesCategory;
        });


        filtered.forEach((product, index) => {
        const inCart = cart.find(item => item.name === product.name);

        productContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
            <div class="card shadow-sm bg-light">
                <img src="${product.image || "https://via.placeholder.com/150"}" 
                class="card-img-top fixed-img" alt="${product.name}">
                <div class="card-body d-flex flex-column align-items-center">
                    <h6 class="card-title">${product.name}</h6>
                    <p class="card-text fw-semibold">Ghc ${Number(product.price).toFixed(2)}</p>

                    <div class="mt-auto">
                        ${
                            inCart
                            ? `
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-outline-secondary btn-sm me-2" onclick="updateCart(${index}, -1)">-</button>
                                <span>${inCart.quantity}</span>
                                <button class="btn btn-outline-secondary btn-sm ms-2" onclick="updateCart(${index}, 1)">+</button>
                                <button class="btn btn-sm btn-success ms-2" onclick="viewCart()">View Cart</button>
                            </div>
                            `
                            : `<button class="btn btn-primary" onclick="addToCart(${index})">Add to Cart</button>`
                        }
                    </div>
                </div>
            </div>
        </div>
        `;
        });
    }

    window.addToCart = (id) => {
        const product = products[id]
        const existing = cart.find(item => item.id === product.name);

        if (existing) {
            existing.quantity++;
        }else{
            cart.push({ ...product, quantity: 1});
        }

        saveCart();
        renderProducts();
    };

    window.updateCart = (id, change) => {
        const product = products[id];
        const item = cart.find(i => i.name === product.name);

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.name !== product.name)
            }
        }

        saveCart();
        renderProducts();
    };

    window.viewCart = () => {
        window.location.href = "cart.html";
    };

    if (searchBar) {
        searchBar.addEventListener("input", renderProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", renderProducts);
    }

    populateCategories();

    const selectedCategory = localStorage.getItem("selectedCategory");

    if (selectedCategory && categoryFilter) {
        categoryFilter.value = selectedCategory.toLowerCase();
    }
    
    renderProducts();
});

