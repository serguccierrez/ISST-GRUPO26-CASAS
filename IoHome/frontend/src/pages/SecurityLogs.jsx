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
  const [prop, setProp] = useState('null');
  const navigate = useNavigate();

  

  const events = async (id = prop?.id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/eventos/all/${id}`);
      if (!response.ok)
        throw new Error("No se pudo obtener la lista de eventos");
      const data = await response.json();

      // Ordena los eventos por fecha (más reciente primero)
      const eventosOrdenados = data.sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt));
      
      setEventosOriginales(eventosOrdenados); // Guardamos los eventos originales ordenados
      setEventos(eventosOrdenados); // Establecemos los eventos filtrados inicialmente
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

useEffect(() => {
    const propietario = JSON.parse(localStorage.getItem("propietario"));
    setProp(propietario);
    if (propietario?.id) {
      obtenerPropiedades(propietario.id)
        .then(setPropiedades)
        .catch((err) => console.error("Error al obtener propiedades", err));
        console.log(propietario.id);
      events(propietario.id);
    }
  }, []);

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

        // Ordena los eventos por fecha (más reciente primero)
        const eventosOrdenados = eventosData.sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt));

        setEventosOriginales(eventosOrdenados); // Guardamos los eventos originales ordenados
        setEventos(eventosOrdenados); // Establecemos los eventos filtrados
      } catch (error) {
        console.error("Error al obtener dispositivo o eventos:", error);
        setEventos([]);
        setMensajeError("No se pudo obtener la cerradura asociada a la propiedad.");
      }
    };

    fetchDeviceAndEvents();
  }, [propiedadSeleccionada]);

  // Este useEffect se dispara cuando cambian las fechas de inicio o fin
  useEffect(() => {
    if (!fechaInicio && !fechaFin) {
      setEventos(eventosOriginales); // Si no hay fechas, mostrar todos los eventos
      return;
    }

    // Filtrar los eventos según las fechas seleccionadas
    const fechaInicioTimestamp = fechaInicio ? new Date(fechaInicio).getTime() : 0;
    const fechaFinTimestamp = fechaFin ? new Date(fechaFin).getTime() : Date.now(); // Si no hay fecha fin, usar el tiempo actual

    // Filtrar eventos dentro del rango de fechas
    const eventosFiltrados = eventosOriginales.filter((evento) => {
      const eventoTimestamp = new Date(evento.occurredAt).getTime();
      return (
        eventoTimestamp >= fechaInicioTimestamp && eventoTimestamp <= fechaFinTimestamp
      );
    });

    // Actualizar el estado de los eventos filtrados
    setEventos(eventosFiltrados);

  }, [fechaInicio, fechaFin, eventosOriginales]); // Dependencias: fechaInicio, fechaFin y eventosOriginales

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
