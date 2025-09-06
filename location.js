document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.querySelector("#locationModal input");
    const currentLocation = document.getElementById("current-location");
    const currentLocationMobile = document.getElementById("current-location-mobile");
    const locationModalEl = document.getElementById("locationModal");

    const map = L.map("map").setView([5.6037, -0.1870], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let marker = L.marker([5.6037, -0.1870]).addTo(map);

    locationModalEl.addEventListener("shown.bs.modal", () => {
        setTimeout(() => {
            map.invalidateSize();
        }, 200)
    });

    const savedLocation = localStorage.getItem("userLocation");
    if(savedLocation) {
        if(currentLocation) currentLocation.textContent = savedLocation;
        if(currentLocationMobile) currentLocationMobile.textContent = savedLocation;
    }

    async function updateMap(address) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();
            if(data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                map.setView([lat, lon], 15);
                marker.setLatLng([lat, lon]);
            }
        } catch (error) {
            console.error("Map error:", error);
        }
    }

    locationInput.addEventListener("keypress", function (e) {
        if(e.key === "Enter") {
            e.preventDefault();
            const newLocation = locationInput.value.trim();
            if (newLocation) {
                localStorage.setItem("userLocation", newLocation);

                if(currentLocation) currentLocation.textContent = newLocation;
                if(currentLocationMobile) currentLocationMobile.textContent = newLocation;

                updateMap(newLocation);

                const modal = bootstrap.Modal.getInstance(locationModalEl);
                modal.hide();
            }
        }
    });

    map.on("click", async function (e) {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            const address = data.display_name || `Lat: ${lat}, Lng: ${lng}`;

            localStorage.setItem("userLocation", address);
            if (currentLocation) currentLocation.textContent = address;
            if (currentLocationMobile) currentLocationMobile.textContent = address;

            locationInput.value = address;
        } catch (err) {
            console.error("Reverse geocode error:", err);
        }
    });
});