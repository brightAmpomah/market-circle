function initLoginForms() {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullname = document.getElementById("signup-fullname").value;
            const username = document.getElementById("signup-username").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const type = document.getElementById("signup-type").value;

            const users = JSON.parse(localStorage.getItem("users")) || [];
            users.push({ fullname, username, email, password, type });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful! Please login");
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const loginValue = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(
                u => (u.username === loginValue || u.email === loginValue) && u.password === password
            );

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                showUserLinks(user);

                const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
                modal.hide();
            }else {
                alert("Invalide username/email or password");
            }
        });
    }
}

function initLoginState() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        showUserLinks(currentUser);
    }else {
        hideUserLinks();
    }

    document.addEventListener("click", (e) => {
        if(e.target.id === "logout-btn") {
            localStorage.removeItem("currentUser");
            hideUserLinks();
        }
    });
}

function showUserLinks(user) {
    document.getElementById("guest-links")?.classList.add("d-none");
    document.getElementById("user-links")?.classList.remove("d-none");

    const greeting = document.getElementById("account-greeting");
    if (greeting) greeting.innerText = `Welcome, ${user.username}`;

    document.getElementById("guest-links-mobile")?.classList.add("d-none");
    document.getElementById("user-links-mobile")?.classList.remove("d-none");

    const greetingMobile = document.getElementById("account-greeting-mobile");
    if (greetingMobile) greetingMobile.innerText = `Welcome, ${user.username}`;
}

function hideUserLinks() {
    document.getElementById("guest-links")?.classList.remove("d-none");
    document.getElementById("user-links")?.classList.add("d-none");

    const greeting = document.getElementById("account-greeting");
    if (greeting) greeting.innerText = "My Account";

    document.getElementById("guest-links-mobile")?.classList.remove("d-none");
    document.getElementById("user-links-mobile")?.classList.add("d-none");

    const greetingMobile = document.getElementById("account-greeting-mobile");
    if (greetingMobile) greetingMobile.innerText = "My Account";
}

