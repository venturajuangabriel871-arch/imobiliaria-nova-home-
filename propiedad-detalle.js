
let editingPropertyId = null;
   
   // ===============================
// ADMIN - PROPIEDADES (LISTAR)
// ===============================

// Obtener tabla
const propertyTable = document.getElementById("propertyTable");

// Obtener propiedades del localStorage
const properties = getProperties();
properties.push(newProperty);
// Si no hay propiedades, crear datos iniciales
if (properties.length === 0) {
    properties = [
        {
            id: 1,
            title: "Casa Moderna",
            type: "Casa",
            location: "Sucre",
            price: 120000
           
        },
        {
            id: 2,
            title: "Departamento Céntrico",
            type: "Departamento",
            location: "Cochabamba",
            price: 85000
        },
        {
            id: 3,
            title: "Terreno Amplio",
            type: "Terreno",
            location: "Santa Cruz",
            price: 60000
        },
        {
            id: 4,
            title: "Lote Residencial",
            type: "Lote",
            location: "La Paz",
            price: 45000
        }

    ];
    saveProperties(properties);
}
// ===============================
// STORAGE CONFIG (CLAVE ÚNICA)
// ===============================
const STORAGE_KEY = "properties";

// Obtener propiedades
function getProperties() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guardar propiedades
function saveProperties(properties) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

// Función para renderizar tabla

function renderTable() {
    propertyTable.innerHTML = "";

    properties.forEach(property => {
        const row = document.createElement("tr");
        const properties = getProperties();

        row.innerHTML = `
            <td>${property.id}</td>
            <td>${property.title}</td>
            <td>${property.type}</td>
            <td>${property.location}</td>
            <td>$${property.price.toLocaleString()}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2"
                    onclick="editProperty(${property.id})">
                    <i class="bi bi-pencil"></i>
                </button>

                <button class="btn btn-sm btn-outline-danger"
                    onclick="deleteProperty(${property.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>


        `;

        propertyTable.appendChild(row);
    });
}

// ===============================
// EDITAR PROPIEDAD
// ===============================

function editProperty(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    // Guardar ID que se está editando
    editingPropertyId = id;

    // Cargar datos en el formulario
    document.getElementById("title").value = property.title;
    document.getElementById("type").value = property.type;
    document.getElementById("location").value = property.location;
    document.getElementById("price").value = property.price;

    // Cambiar título del modal
    document.querySelector("#propertyModal .modal-title")
        .textContent = "Editar Propiedad";

    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById("propertyModal"));
    modal.show();
}


// ===============================
// AGREGAR NUEVA PROPIEDAD
// ===============================

const propertyForm = document.getElementById("propertyForm");

if (propertyForm) {
    propertyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const type = document.getElementById("type").value;
        const location = document.getElementById("location").value;
        const price = parseInt(document.getElementById("price").value);
       const image = document.getElementById("image").value;



        if (editingPropertyId) {
    // EDITAR
    const index = properties.findIndex(p => p.id === editingPropertyId);
    if (index !== -1) {
        properties[index] = {
            id: editingPropertyId,
            title,
            type,
            location,
            price,
            image
        };
    }
    editingPropertyId = null;
} else {
    // CREAR
    const newProperty = {
        id: properties.length > 0 ? properties[properties.length - 1].id + 1 : 1,
        title,
        type,
        location,
        price,
        image
    };
    properties.push(newProperty);
    }

        localStorage.setItem("properties", JSON.stringify(properties));

        renderTable();

        // Resetear formulario
        propertyForm.reset();

        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("propertyModal"));
        modal.hide();
        document.querySelector("#propertyModal .modal-title")
        .textContent = "Nueva Propiedad";


    });
}


// Eliminar propiedad
function deleteProperty(id) {
    if (confirm("¿Eliminar esta propiedad?")) {
        properties = properties.filter(p => p.id !== id);
        localStorage.setItem("properties", JSON.stringify(properties));
        renderTable();
    }
}

// Mostrar tabla al cargar
renderTable();
