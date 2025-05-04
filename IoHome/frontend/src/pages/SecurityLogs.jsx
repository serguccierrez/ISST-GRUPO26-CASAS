import { useState, useEffect } from "react";
import { obtenerPropiedades } from "../services/propiedadService";

import "../styles/securityLogs.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const SecurityLogs = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState([]);
  const [eventos, setEventos] = useState([]); // Eventos filtrados
  const [eventosOriginales, setEventosOriginales] = useState([]); // Guardar los eventos originales
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const propietario = JSON.parse(localStorage.getItem("propietario"));
    if (propietario?.id) {
      obtenerPropiedades(propietario.id)
        .then(setPropiedades)
        .catch((err) => console.error("Error al obtener propiedades", err));
      events();
    }
  }, []);

  const events = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/eventos/all");
      if (!response.ok)
        throw new Error("No se pudo obtener la lista de eventos");
      const data = await response.json();
      setEventosOriginales(data.reverse()); // Guardamos los eventos originales
      setEventos(data.reverse()); // Establecemos los eventos filtrados inicialmente
    } catch (error) {
      console.error("Error al obtener dispositivos:", error);
    }
  };

  useEffect(() => {
    const fetchDeviceAndEvents = async () => {
      if (!propiedadSeleccionada) return;

      try {
        setMensajeError("");
        if (propiedadSeleccionada === "all") {
          events();
          return;
        }
        const deviceRes = await fetch(
          `http://localhost:8080/seam/device/propiedad/${propiedadSeleccionada}`
        );
        if (!deviceRes.ok) {
          throw new Error("No se pudo obtener el dispositivo");
        }

        const deviceData = await deviceRes.json();
        const deviceId = deviceData.device_id;
        setDispositivoSeleccionado(deviceId);

        const eventosRes = await fetch(
          `http://localhost:8080/api/eventos/${deviceId}`
        );
        if (!eventosRes.ok) {
          throw new Error("No se pudieron obtener los eventos");
        }

        const text = await eventosRes.text();
        const eventosData = text ? JSON.parse(text) : [];

        if (eventosData.length === 0) {
          setMensajeError("No hay eventos disponibles para esta cerradura.");
        }

        setEventosOriginales(eventosData.reverse()); // Guardamos los eventos originales
        setEventos(eventosData.reverse()); // Establecemos los eventos filtrados
      } catch (error) {
        console.error("Error al obtener dispositivo o eventos:", error);
        setEventos([]);
        setMensajeError(
          "No se pudo obtener la cerradura asociada a la propiedad."
        );
      }
    };

    fetchDeviceAndEvents();
  }, [propiedadSeleccionada]);

  // Este useEffect se dispara cuando cambian las fechas de inicio o fin
  useEffect(() => {
    if (!fechaInicio) return; // Si no hay fecha de inicio, no hacer nada

    // Filtrar los eventos según las fechas seleccionadas
    const fechaInicioTimestamp = new Date(fechaInicio).getTime();
    const fechaFinTimestamp = fechaFin ? new Date(fechaFin).getTime() : Date.now(); // Si no hay fecha fin, usar el tiempo actual

    // Suponiendo que los eventos están ordenados por 'occurredAt', puedes optimizar el filtrado
    const eventosFiltrados = [];
    for (const evento of eventosOriginales) { // Filtramos sobre los eventos originales
      const eventoTimestamp = new Date(evento.occurredAt).getTime();

      if (eventoTimestamp > fechaFinTimestamp) break; // Si el evento está fuera del rango, detenemos el bucle
      if (eventoTimestamp >= fechaInicioTimestamp) {
        eventosFiltrados.push(evento); // Agregar solo los eventos dentro del rango
      }
    }

    // Actualizar el estado de los eventos filtrados
    setEventos(eventosFiltrados);

  }, [fechaInicio, fechaFin, eventosOriginales]); // Dependencias: fechaInicio, fechaFin y eventosOriginales


  const handleLogout = () => {
    // Limpia el localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("propietario");
    localStorage.clear(); // Limpia todo el localStorage si es necesario

    // Redirige al usuario a la página principal
    navigate("/");
  };
  
  return (
    <div className="security-container">
      <div className="navbar">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/propietario")}
        />
        <h3 id="nombre" onClick={() => navigate("/propietario")}>
          IoHome
        </h3>
      </div>

      <button className="logout-button" onClick={() => navigate("/")}>
        Logout
      </button>

      <div className="header">
        <h2>Seguridad y Control de Accesos</h2>
        <p>
          Monitorea accesos en tiempo real, gestiona el estado de tus cerraduras
          y recibe alertas de actividad sospechosa.
        </p>
      </div>

      <div className="filter-section">
        <label>Cerradura:</label>
        <select
          value={propiedadSeleccionada}
          onChange={(e) => setPropiedadSeleccionada(e.target.value)}
          className="select-field"
        >
          <option value="all">Todas mis propiedades</option>
          {propiedades.map((prop) => (
            <option key={prop.id} value={prop.id}>
              {prop.nombre} - {prop.direccion}
            </option>
          ))}
        </select>
        <div>
        <label>Desde:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="date-field"
        />

        <label>Hasta:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="date-field"
        />
        </div>
      </div>

      <div className="logs-section">
        <div className="logs-scroll">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Cerradura</th>
                <th>Acción</th>
                <th>Estado</th>
                <th>Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              {eventos.length > 0 ? (
                eventos.map((evento, index) => (
                  <tr className="log-entry" key={index}>
                    <td>{evento.cerradura?.nombre || "Desconocida"}</td>
                    <td>{evento.actionType}</td>
                    <td>{evento.status}</td>
                    <td>{evento.occurredAt}</td>
                  </tr>
                ))
              ) : (
                <tr className="log-entry">
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", fontStyle: "italic" }}
                  >
                    {mensajeError || "Sin eventos registrados"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="disclaimer">
        La información proporcionada será eliminada una vez el huésped abandone
        la propiedad, en cumplimiento de la ley de protección de datos.
      </div>

      <footer className="footer">
        © 2025 IOHOME. Todos los derechos reservados
      </footer>
    </div>
  );
};

export default SecurityLogs;
