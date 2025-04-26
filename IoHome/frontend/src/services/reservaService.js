// reservaService.js
const API_BASE = "http://localhost:8080/api/reservas";

export const obtenerReservas = async (propietarioId) => {
    const res = await fetch(`${API_BASE}/propietario/${propietarioId}`);
    if (!res.ok) throw new Error("Error al obtener reservas");
    return res.json();
};

// reservaService.js

export const crearReserva = async (propiedadId, reserva) => {
    const res = await fetch(`${API_BASE}/crear/${propiedadId}`, {
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

// Eliminar una reserva
export const eliminarReserva = async (reservaId) => {
    await fetch(`${API_BASE}/eliminar/${reservaId}`, {
        method: "DELETE",
    });
};


// reservaService.js
export const actualizarReserva = async (reservaId, reserva) => {
    const res = await fetch(`${API_BASE}/actualizar/${reservaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
    });
    if (!res.ok) throw new Error("Error al actualizar la reserva");
    return res.json();
};


export const obtenerUltimaReservaActiva = async (usuarioId) => {
    const res = await fetch(`http://localhost:8080/api/reservas/usuario/${usuarioId}/ultima-activa`);
    if (!res.ok) throw new Error("No hay reservas activas");
    return res.json();
};

export const obtenerCerraduraDeUltimaReserva = async (usuarioId) => {
    try {
        const res = await fetch(`http://localhost:8080/seam/device/usuario/${usuarioId}/ultima-reserva`);
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
        return await res.json();
    } catch (error) {
        console.error("Error al obtener la cerradura de la última reserva activa:", error.message);
        return null;
    }
};

export const obtenerPropiedadDeUltimaReserva = async (usuarioId) => {
    try {
        const res = await fetch(`http://localhost:8080/api/reservas/usuario/${usuarioId}/ultima-activa`);
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
        const reserva = await res.json();
        return reserva.propiedad;
    } catch (error) {
        console.error("Error al obtener la propiedad de la última reserva activa:", error.message);
        return null;
    }
};


// reservaService.js
export const obtenerUltimaReservaActivaCompleta = async (usuarioId) => {
    const res = await fetch(`http://localhost:8080/api/reservas/usuario/${usuarioId}/ultima-activa`);
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
    }
    return res.json(); // Devolver toda la reserva, no solo propiedad
};

export const asociarReservaPorToken = async (usuarioId, token) => {
    const res = await fetch(`http://localhost:8080/api/reservas/asociar-por-token/${usuarioId}?token=${token}`, {
        method: "POST",
    });
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Error al asociar la reserva por token");
    }
    return res.json();
};