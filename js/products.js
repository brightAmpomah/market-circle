const products = [
    {id: 1, name: "Tomatoes", price: 10, category: "vegetables", image: "../assets/images/tomatoes.jpg"},
    {id: 2, name: "Apple", price: 15, category: "fruits", image: "../assets/images/fruits.jpg"},
    {id: 3, name: "Milk", price: 12, category: "dairy", image: "../assets/images/milk.jpg"},
    {id: 4, name: "Rice", price: 20, category: "cereal", image: "../assets/images/cereal.jpg"},
    {id: 5, name: "Onions", price: 8, category: "vegetables", image: "../assets/images/onions.jpg"},
    {id: 6, name: "Lettuces", price: 10, category: "vegetables", image: "../assets/images/lettuce.jpg"}
];

const productList = document.getElementById("product-list");
const searchbar = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filter");

function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    if (filteredProducts.length === 0) {
        productList.innerHTML = `<p class="text-center text-muted">No products found.</p>`;
        return;
    }

    filteredProducts.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-3 col-sm-6";

    col.innerHTML = `
    <div class="card text-white border-0 shadow-sm overflow-hidden product-card h-100">
        <img src="${product.image}" class="card-img h-100" alt="${product.name}">
        <div class="card-img-overlay d-flex flex-column justify-content-end text-center">
            <h5 class="fw-bold">${product.name}</h5>
            <p class="mb-2">Ghc ${product.price}</p>
            <button class="btn btn-success btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    </div>
    `;
    productList.appendChild(col)
    });
}

displayProducts(products);

function filterProducts() {
    const keyword = searchbar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    if (selectedCategory !== "all") {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    displayProducts(filtered);
}

searchbar.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
}