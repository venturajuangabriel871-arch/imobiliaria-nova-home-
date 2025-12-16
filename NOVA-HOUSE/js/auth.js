// Obtener usuario logueado
function getUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}

// Verificar sesión
function requireAuth() {
    const user = getUser();
    if (!user) {
        window.location.href = "login.html";
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

// Mostrar contenido según rol
function applyRoleUI() {
    const user = getUser();
    if (!user) return;

    // Texto de bienvenida
    const welcome = document.getElementById("welcomeText");
    if (welcome) {
        welcome.textContent = `Bienvenido, ${user.name}`;
    }

    // Rol
    const roleText = document.getElementById("roleText");
    if (roleText) {
        roleText.textContent = user.role.toUpperCase();
    }

    // Admin only
    if (user.role !== "admin") {
        document.querySelectorAll(".admin-only").forEach(el => {
            el.style.display = "none";
        });
    }
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", () => {
    applyRoleUI();
});
