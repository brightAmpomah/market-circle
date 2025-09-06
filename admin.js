document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productTable = document.getElementById("productTable").querySelector("tbody");
    const cancelEditBtn = document.getElementById("cancelEdit");
    const formTitle = document.getElementById("formTitle");

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let editMode = false;

    function saveProduct() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function renderProducts() {
        productTable.innerHTML = "";
        products.forEach((product, index) => {
            productTable.innerHTML +=`
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><img src="${product.image || "https://via.placeholder.com/50"}" width="50"></td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" onclick="editProduct(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
            `;
        });
    }
    productForm.addEventListener("submit", e => {
        e.preventDefault();

        const newProduct = {
            name: document.getElementById("productName").value.trim(),
            category: document.getElementById("productCategory").value.trim(),
            price: document.getElementById("productPrice").value.trim(),
            stock: document.getElementById("productStock").value.trim(),
            image: document.getElementById("productImage").value.trim()
        };

        if (editMode) {
            const id = document.getElementById("productId").value;
            products[id] = newProduct;
            editMode = false;
            formTitle.textContent = "Add New Product";
            cancelEditBtn.classList.add("d-none");
        } else {
            products.push(newProduct);
        }

        saveProduct();
        renderProducts();
        productForm.reset();
    });

    cancelEditBtn.addEventListener("click", () => {
        editMode = false;
        formTitle.textContent = "Add New Product";
        productForm.reset();
        cancelEditBtn.classList.add("d-none");
    });

    window.editProduct = (id) => {
        const product = products[id];
        document.getElementById("productId").value = id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productCategory").value = product.category;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productStock").value = product.stock;
        document.getElementById("productImage").value = product.image;

        editMode = true;
        formTitle.textContent = "Edit Product";
        cancelEditBtn.classList.remove("d-none")
    };

    window.deleteProduct = (id) => {
        if (confirm("Are you sure you wante to delete this products?")) {
            products.splice(id, 1);
            saveProduct();
            renderProducts();
        }
    };
    renderProducts();
});