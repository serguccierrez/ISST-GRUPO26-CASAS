// SecurityLogs.jsx
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
  const [eventos, setEventos] = useState([]);
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
      const sinceISO = fechaInicio
        ? new Date(`${fechaInicio}T00:00:00Z`).toISOString()
        : null;

      const response = await fetch("http://localhost:8080/api/eventos/all");
      if (!response.ok)
        throw new Error("No se pudo obtener la lista de eventos");
      const data = await response.json();
      console.log(data); // Puedes manejar los datos aquí
      setEventos(data);
    } catch (error) {
      console.error("Error al obtener dispositivos:", error);
    }
  };

  useEffect(() => {
    const fetchDevice = async () => {
      if (!propiedadSeleccionada) return;
      if (!fechaInicio) return;

      try {
        const response = await fetch(
          `http://localhost:8080/seam/device/propiedad/${propiedadSeleccionada}`
        );
        if (!response.ok) throw new Error("No se pudo obtener el dispositivo");

        const data = await response.json();
        setDispositivoSeleccionado(data.device_id);

        const sinceISO = fechaInicio
          ? new Date(`${fechaInicio}T00:00:00Z`).toISOString()
          : null;
        events(data.device_id, sinceISO);
      } catch (error) {
        console.error("Error al obtener dispositivo:", error);
      }
    };

    fetchDevice();
  }, [propiedadSeleccionada, fechaInicio]);

  return (
    <div className="security-container">
      <div className="navbar">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/inicio-propietario")}
        />
        <h3 id="nombre" onClick={() => navigate("/inicio-propietario")}>
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
          <option value="">Seleccione una propiedad</option>
          {propiedades.map((prop) => (
            <option key={prop.id} value={prop.id}>
              {prop.nombre} - {prop.direccion}
            </option>
          ))}
        </select>

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

      <div className="logs-section">
  
  <div className="logs-scroll">
    {eventos.length > 0 ? (
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
          {eventos.map((evento, index) => (
            <tr className="log-entry" key={index}>
              <td>{evento.cerradura?.nombre || "Desconocida"}</td>
              <td>{evento.actionType}</td>
              <td>{evento.status}</td>
              <td>{evento.occurredAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="log-entry">Sin eventos registrados</div>
    )}
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
