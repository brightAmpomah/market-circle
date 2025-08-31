let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCheckout() {
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    checkoutItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        checkoutItems.innerHTML = `<li class="list-group-item text-center text-muted">Your cart is empty.</li>`;
        checkoutTotal.textContent = "Total: Ghc 0";
        return;
    }

    cart.forEach(item => {
        total += item.price;
        checkoutItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name}
                <span>Ghc ${item.price}</span>
            </li>
        `;
    });

    checkoutTotal.textContent = "Total: Ghc" + total;
}

document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const delivery = document.querySelector('input[name="delivery"]:checked').value;

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checkout.");
        return;
    }

    if (!name || !phone || !address) {
        alert("Please fill in all fields before confirming your order.");
        return;
    }

    alert(`Thank you ${name}! Your order has been placed.\n\nDelivery: ${delivery}\nAddress: ${address}\nWe will contact you on ${phone}.`);

    localStorage.removeItem("cart");
    cart = [];
    loadCheckout();
    document.getElementById("checkout-form").reset();
});

document.addEventListener("DOMContentLoaded", loadCheckout)