import { useEffect, useState } from "react";
import "../styles/unaCerradura.css";
import logo from "../assets/logo.png";
import { obtenerCerraduraUsuario } from "../services/cerraduraService";
import { obtenerPropiedadDeUltimaReserva } from "../services/reservaService";
import { useNavigate } from "react-router-dom";

const CerraduraUsuario = ({ usuarioId }) => {
  const [cerradura, setCerradura] = useState(null);
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState(null);
  const [lockSlider, setLockSlider] = useState(0);
  const [unlockSlider, setUnlockSlider] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioId) {
      fetchCerradura();
      fetchPropiedad();
    }
  }, [usuarioId]);

  const fetchCerradura = async () => {
    try {
      const data = await obtenerCerraduraUsuario(usuarioId);
      if (data) {
        setCerradura(data);
      } else {
        setError("No se encontró una cerradura asociada a la última reserva.");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const fetchPropiedad = async () => {
    try {
      const data = await obtenerPropiedadDeUltimaReserva(usuarioId);
      if (data) {
        setPropiedad(data);
      } else {
        setError("No se encontró una propiedad asociada a la última reserva.");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const toggleLock = async (lock) => {
    if (!cerradura) return;

    const endpoint = lock
      ? `http://localhost:8080/seam/lock/${cerradura.device_id}`
      : `http://localhost:8080/seam/unlock/${cerradura.device_id}`;

    try {
      console.log("Llamando a la API para cambiar el estado de la cerradura...");
      console.log("Endpoint:", cerradura);
      const response = await fetch(endpoint, { method: "POST" });
      if (!response.ok) {
        throw new Error(
          `No se pudo ${lock ? "bloquear" : "desbloquear"} la cerradura`
        );
      }
      setTimeout(() => {
        fetchCerradura();
        console.log(cerradura);
      }, 10000);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleLockChange = (value) => {
    setLockSlider(value);
    if (value === 1) {
      toggleLock(true);
      setTimeout(() => setLockSlider(0), 500);
    }
  };

  const handleUnlockChange = (value) => {
    setUnlockSlider(value);
    if (value === 0) {
      toggleLock(false);
      setTimeout(() => setUnlockSlider(1), 500);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!cerradura) {
    return <div>Cargando detalles de la cerradura...</div>;
  }

  return (
    <div className="lock-card">
      <div className="navbar">
        
      </div>

      <h2>
        Cerradura de {propiedad?.nombre || "Propiedad desconocida"} 
        {propiedad?.direccion ? ` (${propiedad.direccion})` : ""}
      </h2>
      <img src={cerradura.properties.image_url} alt="Cerradura" className="lock-image" />
      <h3>{cerradura.properties?.name || "Sin nombre"}</h3>
      <div className="lock-info">
        <p className="lock-detail">
          <strong>Estado de la Cerradura:</strong>
          <span className="lock-status">
            {cerradura.properties?.locked ? " Cerrada" : " Abierta"}
          </span>
        </p>
        <p className="lock-detail">
          <strong>Estado de Conexión:</strong>
          <span className="lock-connection">
            {cerradura.properties?.online ? " En línea" : " Desconectada"}
          </span>
        </p>
        <p className="lock-detail">
          <strong>Nivel de batería:</strong>
          <span className="lock-battery">
            {(cerradura.properties?.battery_level * 100).toFixed(0)}%
          </span>
        </p>
      </div>

      <div className="lock-slider-container">
        <label className="lock-slider-label">Bloquear Cerradura</label>
        <input
          type="range"
          min="0"
          max="1"
          step="1"
          value={lockSlider}
          onChange={(e) => handleLockChange(Number(e.target.value))}
          className="lock-slider"
        />
      </div>

      <div className="lock-slider-container">
        <label className="lock-slider-label">Desbloquear Cerradura</label>
        <input
          type="range"
          min="0"
          max="1"
          step="1"
          value={unlockSlider}
          onChange={(e) => handleUnlockChange(Number(e.target.value))}
          className="lock-slider"
        />
      </div>
    </div>
  );
};

export default CerraduraUsuario;
