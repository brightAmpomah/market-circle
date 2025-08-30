let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<tr><td colspan="4" class="text-center text-muted">Your cart is empty.</td></tr>`;
        cartTotal.textContent = "Total: Ghc 0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </td>
        </tr>
        `;
    });

    cartTotal.textContent = "Total: Ghc " + total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);