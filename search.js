document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("navbar-search");
    const categoryDropdown = document.getElementById("category-dropdown");

    if (!searchInput || !categoryDropdown) {
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const categories = [...new Set(products.map(p => p.category.toLowerCase()))];


    if (categories.length > 0) {
        categoryDropdown.innerHTML = `<div class="list-group-item fw-bold text-muted">Shop by Category</div>`;
        categories.forEach(cat => {
            categoryDropdown.innerHTML += `
            <a href="product.html?category=${encodeURIComponent(cat)}"
                class="list-group-item list-group-item-action">
                ${cat.charAt(0).toLowerCase() + cat.slice(1)}
            </a>
            `;
        });
    }
    

    searchInput.addEventListener("focus", () => {
        categoryDropdown.classList.remove("d-none");
    });

    searchInput.addEventListener("blur", () => {
        setTimeout(() => categoryDropdown.classList.add("d-none"), 200);
    });

    categoryDropdown.addEventListener("click", (e) => {
        if (e.target.dataset.category) {
            e.preventDefault();
            const category = e.target.dataset.category;
            window.location.herf = `product.html?category=${encodeURIComponent(category)}`;
        }
    });
});