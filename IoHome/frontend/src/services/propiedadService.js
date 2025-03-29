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
