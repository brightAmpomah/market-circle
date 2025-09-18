document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("navbar-search");
    const dropDown = document.getElementById("category-dropdown");

    const categories = ["fruits", "vegetables", "cereal", "dairy"];

    if (searchInput && dropDown) {
        searchInput.addEventListener("focus", () => {
            dropDown.innerHTML = categories.map(cat => `
                <button class="list-group-item list-group-item-action category-item" data-category="${cat}">
                    ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button> 
            `).join("");
            dropDown.classList.remove("d-none");
        });

        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !dropDown.contains(e.target)) {
                dropDown.classList.add("d-none");
            }
        });

        dropDown.addEventListener("click", (e) => {
            if (e.target.classList.contains("category-item")) {
                const category = e.target.getAttribute("data-category");
                
                localStorage.setItem("selectedCategory", category)
                window.location.href = "product.html";
            }
        });
    }
});