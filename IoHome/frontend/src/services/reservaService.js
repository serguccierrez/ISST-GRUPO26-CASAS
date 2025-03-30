// reservaService.js
const API_BASE = "http://localhost:8080/api/reservas";

export const obtenerReservas = async (propietarioId) => {
    const res = await fetch(`${API_BASE}/propietario/${propietarioId}`);
    if (!res.ok) throw new Error("Error al obtener reservas");
    return res.json();
};

// reservaService.js

export const crearReserva = async (usuarioId, propiedadId, reserva) => {
    const res = await fetch(`${API_BASE}/crear/${usuarioId}/${propiedadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva), // Solo enviar los campos de la reserva
    });
    if (!res.ok) throw new Error("Error al crear la reserva");
    return res.json();
};


// Obtener el ID del usuario a partir de su correo
export const obtenerUsuarioPorCorreo = async (correo) => {
    const res = await fetch(`http://localhost:8080/api/usuarios/correo/${correo}`);
    if (!res.ok) throw new Error("Usuario no encontrado");
    return res.json();
};
