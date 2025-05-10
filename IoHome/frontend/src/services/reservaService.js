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


export const sincronizarReservasConCalendar = async (accessToken, propietarioId) => {
    try {
      const reservas = await obtenerReservas(propietarioId);
  
      const res = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }          
        }
      );
      const eventosExistentes = res.data.items;
  
      for (const reserva of reservas) {
        const yaExiste = eventosExistentes.some(ev =>
          ev.summary === `Reserva: ${reserva.propiedad?.nombre || 'Propiedad'}` &&
          ev.start?.dateTime?.startsWith(reserva.fechaInicio.slice(0, 10)) // o compara fechas completas si quieres más precisión
        );
  
        if (yaExiste) continue; // No insertes si ya está
  
        const inicio = new Date(reserva.fechaInicio).toISOString();
        const fin = new Date(reserva.fechaFin).toISOString();
  
        const evento = {
          summary: `Reserva: ${reserva.propiedad?.nombre || 'Propiedad'}`,
          description: `Check-in: ${reserva.fechaInicio} - Check-out: ${reserva.fechaFin}`,
          start: {
            dateTime: inicio,
            timeZone: 'America/Bogota'
          },
          end: {
            dateTime: fin,
            timeZone: 'America/Bogota'
          }
        };
  
        await axios.post(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          evento,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );
      }
  
      console.log("Reservas sincronizadas sin duplicados ✅");
    } catch (error) {
      console.error("Error al sincronizar reservas:", error);
    }
  };



  
export const eliminarEventoDeGoogleCalendar = async (reserva) => {
    const accessToken = localStorage.getItem("google_token");
    if (!accessToken) {
        console.warn("No hay token de Google disponible");
        return;
    }

    try {
        // Obtener todos los eventos
        const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await res.json();
        const eventos = data.items;

        // Buscar evento por título y fecha
        const evento = eventos.find(ev =>
            ev.summary === `Reserva: ${reserva.propiedad?.nombre || "Propiedad"}` &&
            ev.start?.dateTime?.startsWith(reserva.fechaInicio.slice(0, 10))
        );

        if (!evento) {
            console.warn("No se encontró el evento en Google Calendar");
            return;
        }

        // Eliminar evento
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${evento.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log("Evento eliminado de Google Calendar ✅");
    } catch (err) {
        console.error("Error eliminando evento de Calendar:", err);
    }
};

export const actualizarEventoDeGoogleCalendar = async (reserva) => {
    const accessToken = localStorage.getItem("google_token");
    if (!accessToken) return;

    const eventIdAnterior = localStorage.getItem(`reserva_event_${reserva}`);
    
    // Eliminar evento anterior si existe
    if (eventIdAnterior) {
        await eliminarEventoDeGoogleCalendar(eventIdAnterior);
        localStorage.removeItem(`reserva_event_${reserva}`);  // Limpiar el ID almacenado
    }

    // Crear el evento nuevo con las fechas actualizadas
    const nuevoEvento = await sincronizarReservasConCalendar(accessToken, reserva.propiedad);
    localStorage.setItem(`reserva_event_${reserva}`, nuevoEvento);  // Guardar el nuevo ID
    
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