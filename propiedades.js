// ==================================================
// CATÁLOGO DE PROPIEDADES + FILTROS + VER DETALLE
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

    const propertyList = document.getElementById("propertyList");

    const filterType = document.getElementById("filterType");
    const filterCity = document.getElementById("filterCity");
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");

    // Obtener propiedades
    let properties = JSON.parse(localStorage.getItem("properties")) || [];

    // ======================
    // CARGAR CIUDADES
    // ======================
    const cities = [...new Set(properties.map(p => p.location))];

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        filterCity.appendChild(option);
    });

    // ======================
    // RENDER PROPIEDADES
    // ======================
    function render(list) {
        propertyList.innerHTML = "";

        if (list.length === 0) {
            propertyList.innerHTML =
                `<p class="text-muted">No se encontraron propiedades.</p>`;
            return;
        }

        list.forEach((property, index) => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${property.image || 'https://via.placeholder.com/400x250'}"
                         class="card-img-top" alt="${property.title}">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-warning text-dark mb-2 align-self-start">
                            ${property.type}
                        </span>
                        <h5 class="fw-bold">${property.title}</h5>
                        <p class="text-muted">${property.location}</p>
                        <h5 class="text-success fw-bold mb-3">
                            $${Number(property.price).toLocaleString()}
                        </h5>
                        <button class="btn btn-dark mt-auto"
                                onclick="verDetalle(${index})">
                            Ver detalle
                        </button>
                    </div>
                </div>
            `;

            propertyList.appendChild(col);
        });
    }

    // ======================
    // GUARDAR SELECCIÓN
    // ======================
    window.verDetalle = function (index) {
        localStorage.setItem(
            "selectedProperty",
            JSON.stringify(properties[index])
        );
        window.location.href = "propiedad-detalle.html";
    };

    // ======================
    // FILTROS
    // ======================
    function applyFilters() {
        let filtered = [...properties];

        const type = filterType.value;
        const city = filterCity.value;
        const minPrice = minPriceInput.value;
        const maxPrice = maxPriceInput.value;

        if (type) {
            filtered = filtered.filter(p => p.type === type);
        }

        if (city) {
            filtered = filtered.filter(p => p.location === city);
        }

        if (minPrice) {
            filtered = filtered.filter(p => Number(p.price) >= Number(minPrice));
        }

        if (maxPrice) {
            filtered = filtered.filter(p => Number(p.price) <= Number(maxPrice));
        }

        render(filtered);
    }

    // ======================
    // EVENTOS
    // ======================
    filterType.addEventListener("change", applyFilters);
    filterCity.addEventListener("change", applyFilters);
    minPriceInput.addEventListener("input", applyFilters);
    maxPriceInput.addEventListener("input", applyFilters);

    // ======================
    // INICIAL
    // ======================
    render(properties);
});
