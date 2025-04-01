// SecurityLogs.jsx
import { useState, useEffect } from "react";
import { obtenerPropiedades } from "../services/propiedadService";
import "../styles/securityLogs.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const SecurityLogs = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState("");
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const propietario = JSON.parse(localStorage.getItem("propietario"));
    if (propietario?.id) {
      obtenerPropiedades(propietario.id)
        .then(setPropiedades)
        .catch((err) => console.error("Error al obtener propiedades", err));
    }
  }, []);

  return (
    <div className="security-container">
      <div className="navbar">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/inicio-usuario")}
        />
        <h3 id="nombre" onClick={() => navigate("/inicio-usuario")}>
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

        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="date-field"
        />
      </div>

      <div className="logs-section">
        <h3>Logs</h3>
        <div className="log-entry">Cerradura 301 | Acceso concedido</div>
        <div className="log-entry">Cerradura 302 | Acceso no autorizado</div>
        <div className="log-entry">
          Cerradura 303 | Token caducado | Ana Torres
        </div>
        <div className="log-entry">
          Cerradura 304 | Bloqueo de seguridad activado
        </div>
        <div className="log-entry">
          Cerradura 305 | Acceso denegado - Usuario no registrado
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
