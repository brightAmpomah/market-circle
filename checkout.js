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
        const lineTotal = item.price * item.quantity;
        total += lineTotal;

        checkoutItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${item.name} (X ${item.quantity})</span>
                <span>Ghc ${lineTotal}</span>
            </li>
        `;
    });

    checkoutTotal.textContent = "Total: Ghc " + total;
}

document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener("change", () => {
        document.getElementById("time-slot-container").style.display = 
        document.getElementById("later").checked ? "block" : "none";
    });
});

document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const delivery = document.querySelector('input[name="delivery"]:checked').value;
    const timeSlot = delivery === "Later Today" ? document.getElementById("time-slot").value : "Within 60 minutes";

    if (cart.length === 0) {
        showModal("Cart Empty", "Your cart is empty. Please add items before checkout.", "danger");
        return;
    }

    if (!name || !phone || !address) {
        showModal("Incomplete Form", "Please fill in all fields before confirming your order.", "warning");
        return;
    }

    showModal(
        "Order Confirmed",
        `Thank you <strong>${name}</strong>! Your order has been placed.<br>
        <strong>Delivery:</strong> ${delivery}<br>
        <strong>Time:</strong> ${timeSlot}<br>
        <strong>Address:</strong> ${address}\<br>
        We will contact you on <strong>${phone}</strong>.`, 
        "success"
    );

    localStorage.removeItem("cart");
    cart = [];
    loadCheckout();
    document.getElementById("checkout-form").reset();
    document.getElementById("time-slot-container").style.display = "none";
});

function showModal(title, message, type) {
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalHeader = document.getElementById("modal-header");

    modalTitle.innerHTML = title;
    modalBody.innerHTML = message;

    modalHeader.className = "modal-header";
    if (type === "success") modalHeader.classList.add("bg-success", "text-white");
    if (type === "danger") modalHeader.classList.add("bg-danger", "text-white");
    if (type === "warning") modalHeader.classList.add("bg-warning");

    const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));
    modal.show();
    
}

function initMap() {
    const defaultLocation = [5.6037, -0.1870];

    const map = L.map("map").setView(defaultLocation, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const marker = L.marker(defaultLocation, { draggable: true }).addTo(map);

    function updateAdress(lat, lng) {
        document.getElementById("address").value = `${lat}, ${lng}`;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.display_name) {
                document.getElementById("address").value = data.display_name;
            }
        })
        .catch(err => console.error("Geocoding error: ", err));
    }

    marker.on("dragend", function () {
        const pos = marker.getLatLng();
        updateAdress(pos.lat, pos.lng);
    });

    updateAdress(defaultLocation[0], defaultLocation[1]);
}

document.addEventListener("DOMContentLoaded", () => {
    loadCheckout();
    initMap();
});