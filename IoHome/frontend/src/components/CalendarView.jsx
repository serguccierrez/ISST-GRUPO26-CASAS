import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';



export default function CalendarPage() {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cerraduras, setCerraduras] = useState([]);
  const [huespedes, setHuespedes] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    casa: '',
    fechaInicio: '',
    fechaFin: '',
    huespedes: []
  });

  useEffect(() => {
    // Inicializa el calendario
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      events: '/reservas',
      eventClick: function (info) {
        setSelectedEvent(info.event);
        setShowEventModal(true);
      }
    });
    calendar.render();

    // fetch data for cerraduras & huespedes
    fetch('/api/cerraduras').then(res => res.json()).then(setCerraduras);
    fetch('/api/huespedes').then(res => res.json()).then(setHuespedes);
  }, []);

  const handleDelete = () => {
    if (window.confirm('¿Estás segura de que quieres eliminar esta reserva?')) {
      fetch('/calendar/eliminar', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `id=${selectedEvent.id}`
      }).then(res => {
        if (res.ok) {
          selectedEvent.remove();
          setShowEventModal(false);
        } else {
          alert('Error al eliminar la reserva');
        }
      });
    }
  };

  return (
    <div id="main">
      <h2 className="h2-white">Gestión de Reservas</h2>
      <button id="addEvent" className="btn" onClick={() => setShowAccessModal(true)}>
        <span className="material-icons">add</span>Añadir Reserva
      </button>

      <div id="calendar"></div>

      <form method="post" action="/calendar/sincronizar">
        <button type="submit" className="btn">
          <span className="material-icons">autorenew</span> Sincronizar con Google Calendar
        </button>
      </form>

      {showEventModal && (
        <div id="eventModal" className="calendar-modal">
          <div className="modal-content">
            <h3>{selectedEvent.title}</h3>
            <p>
              Inicio: {selectedEvent.startStr}<br />
              Fin: {selectedEvent.endStr}<br />
              Huéspedes: {(selectedEvent.extendedProps?.huespedes || []).map(h => h.nombre).join(', ') || 'Sin asignar'}
            </p>
            <button onClick={() => setFormData({
              id: selectedEvent.id,
              fechaInicio: selectedEvent.startStr.substring(0, 10),
              fechaFin: selectedEvent.endStr?.substring(0, 10),
              casa: selectedEvent.extendedProps?.cerraduraId || '',
              huespedes: selectedEvent.extendedProps?.huespedIds || []
            })}>Modificar</button>
            <button onClick={handleDelete}>Eliminar</button>
            <button onClick={() => setShowEventModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {showAccessModal && (
        <div id="accessModal" className="modal-calendar">
          <div className="modal-calendar-content">
            <button className="close" onClick={() => setShowAccessModal(false)}>
              <span className="material-icons">close</span>
            </button>
            <h3>Programar Acceso</h3>

            <form method="post" action="/calendar/guardar" className="access-form">
              <label>Casa:</label>
              <select name="casa" required>
                {cerraduras.map(c => (
                  <option key={c.id} value={c.id}>{c.ubicacion}</option>
                ))}
              </select>

              <label>Fecha de Inicio:</label>
              <input type="date" name="fechaInicio" required />

              <label>Fecha de Fin:</label>
              <input type="date" name="fechaFin" required />

              <label>Huéspedes:</label>
              <select name="huespedes" multiple required>
                {huespedes.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>

              <div className="modal-calendar-actions">
                <button type="button" onClick={() => setShowAccessModal(false)}>Cancelar</button>
                <button type="submit">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
