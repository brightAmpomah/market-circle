document.addEventListener("DOMContentLoaded", () => {

    fetch("login.html")
        .then(res => res.text())
        .then(data => {
        const loginPlaceHolder = document.getElementById("login-placeholder");
        if(loginPlaceHolder) {
            loginPlaceHolder.innerHTML = data;

            const signupForm = document.getElementById("signup-form");
            const loginForm = document.getElementById("login-form");

            if(signupForm) {
                signupForm.addEventListener("submit", signupHandler);
            }

            if (loginForm) {
                loginForm.addEventListener("submit", loginHandler);
            }
        }     
    })
    .catch(err => console.error("Error loading logins:", err));

});

function signupHandler(e) {
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
}

function loginHandler(e) {
    e.preventDefault();
    const loginValue = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
        u => (u.username === loginValue || u.email === loginValue) && u.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert(`Welcome back, ${user.username}`)

    }else {
        alert("Invalide username/email or password");
    }
    
}






