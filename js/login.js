document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    const users = [
        { name: "Administrador", email: "admin@nova.com", password: "1234", role: "admin" },
        { name: "Cliente", email: "cliente@nova.com", password: "1234", role: "cliente" }
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Credenciales incorrectas");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    window.location.href = "panel.html";
});

