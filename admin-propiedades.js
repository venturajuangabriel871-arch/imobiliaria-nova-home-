// ===================================================
// ADMIN - GESTIÓN DE PROPIEDADES (FIX VALIDACIÓN)
// ===================================================

const STORAGE_KEY = "properties";

// ===============================
// STORAGE
// ===============================
function getProperties() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveProperties(properties) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

// ===============================
// RENDER TABLA
// ===============================
function renderTable() {
    const table = document.getElementById("propertyTable");
    if (!table) return;

    const properties = getProperties();
    table.innerHTML = "";

    properties.forEach((p, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.title}</td>
                <td>${p.type}</td>
                <td>${p.location}</td>
                <td>$${Number(p.price).toLocaleString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1"
                        onclick="editProperty(${index})">
                        ✏️
                    </button>
                    <button class="btn btn-sm btn-outline-danger"
                        onclick="deleteProperty(${index})">
                        🗑
                    </button>
                </td>
            </tr>
        `;
    });
}

// ===============================
// AGREGAR / EDITAR PROPIEDAD
// ===============================
const form = document.getElementById("propertyForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // 🔹 CAMPOS REALES DEL FORMULARIO
        const title = document.getElementById("title").value.trim();
        const type = document.getElementById("type").value;
        const location = document.getElementById("location").value.trim();
        const price = document.getElementById("price").value;
        const image = document.getElementById("image").value.trim();

        // 🔹 VALIDACIÓN CORRECTA
        if (!title || !type || !location || !price) {
            alert("Complete todos los campos obligatorios");
            return;
        }

        const properties = getProperties();

        const newProperty = {
            title,
            type,
            location,
            price: Number(price),
            image: image || "https://via.placeholder.com/400x250"
        };

        properties.push(newProperty);
        saveProperties(properties);

        form.reset();

        // Cerrar modal correctamente
        const modalEl = document.getElementById("propertyModal");
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();
        }

        renderTable();
    });
}

// ===============================
// ELIMINAR
// ===============================
function deleteProperty(index) {
    if (!confirm("¿Eliminar esta propiedad?")) return;

    const properties = getProperties();
    properties.splice(index, 1);
    saveProperties(properties);
    renderTable();
}

// ===============================
// EDITAR
// ===============================
function editProperty(index) {
    const properties = getProperties();
    const p = properties[index];

    document.getElementById("title").value = p.title;
    document.getElementById("type").value = p.type;
    document.getElementById("location").value = p.location;
    document.getElementById("price").value = p.price;
    document.getElementById("image").value = p.image;

    properties.splice(index, 1);
    saveProperties(properties);

    const modalEl = document.getElementById("propertyModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", renderTable);
