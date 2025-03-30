// propiedadService.js
const API_BASE = "http://localhost:8080/api/propiedades";

// Obtener propiedades de un propietario
export const obtenerPropiedades = async (propietarioId) => {
    try {
        const res = await fetch(`${API_BASE}/propietario/${propietarioId}`);
        if (!res.ok) throw new Error("Error al obtener propiedades");
        return await res.json();
    } catch (err) {
        console.error("Error en obtenerPropiedades:", err);
        throw err;
    }
};
export const eliminarPropiedad = async (id) => {
    await fetch(`${API_BASE}/eliminar/${id}`, {
        method: "DELETE",
    });
};

export const actualizarPropiedad = async (id, propiedad) => {
    const res = await fetch(`${API_BASE}/actualizar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propiedad),
    });
    if (!res.ok) throw new Error("Error al actualizar la propiedad");
    return res.json();
};