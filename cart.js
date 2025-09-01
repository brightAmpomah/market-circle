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
        total += item.price * item.quantity;
        cartItems.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-success" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-success" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </td>
            <td>Ghc ${item.price * item.quantity}
        </tr>
        `;
    });

    cartTotal.textContent = "Total: Ghc " + total;
}

function updateQuantity(productId, change) {
    const item = cart.find(p => p.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== productId);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);