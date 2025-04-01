import { useEffect, useState } from "react";
import "../styles/unaCerradura.css";
import logo from "../assets/logo.png";
import { obtenerCerraduraUsuario } from "../services/cerraduraService";
import { useNavigate } from "react-router-dom";

const CerraduraUsuario = ({ usuarioId }) => {
  const [cerradura, setCerradura] = useState(null);
  const [error, setError] = useState(null);
  const [lockSlider, setLockSlider] = useState(0);
  const [unlockSlider, setUnlockSlider] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioId) {
      fetchCerradura();
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
        console.log(cerradura)
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

      <h2>Detalles de la Cerradura</h2>
      <h3>{cerradura.properties?.name || "Sin nombre"}</h3>
      <p><strong>Tipo:</strong> {cerradura.device_type}</p>
      <p><strong>ID del Dispositivo:</strong> {cerradura.device_id}</p>
      <p><strong>Estado de la Cerradura:</strong>
        <span className="lock-status">
          {cerradura.properties?.locked ? " Cerrada" : " Abierta"}
        </span>
      </p>
      <p><strong>Estado de Conexión:</strong>
        {cerradura.properties?.online ? " En línea" : " Desconectada"}
      </p>
      <p><strong>Nivel de batería: </strong>
        {(cerradura.properties?.battery_level * 100).toFixed(0)}%
      </p>

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
