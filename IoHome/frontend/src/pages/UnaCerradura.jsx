import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/unaCerradura.css"; // Asegúrate de que la ruta sea correcta
import logo from "../assets/logo.png"; // Asegúrate de que la ruta sea correcta

const CerraduraDetalle = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { device } = state || {}; // Extraemos el dispositivo
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [error, setError] = useState(null);
  const [lockSlider, setLockSlider] = useState(0);
  const [unlockSlider, setUnlockSlider] = useState(1);
  const [lockedNow, setLockedNow] = useState(null);
  const [actionType, setActionType] = useState();
  const [actionAttemptId, setActionAttemptId] = useState();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (device?.device_id) {
      fetchDevice();
    }
  }, [device?.device_id]);

  useEffect(() => {
    if (lockedNow !== undefined && actionType && actionAttemptId) {
      const wasSuccessful =
        (!lockedNow && lockSlider === 1) || (lockedNow && unlockSlider === 0);
      const newStatus = wasSuccessful ? "success" : "failed";

      guardarEvento(lockedNow, actionType, actionAttemptId, newStatus);

      setTimeout(() => {
        setUnlockSlider(1);
        setLockSlider(0);
      }, 1000);
    }
  }, [lockedNow, actionType, actionAttemptId]);

  const fetchDevice = async () => {
    try {
      const response = await fetch("http://localhost:8080/seam/devices");
      if (!response.ok)
        throw new Error("No se pudo obtener la lista de dispositivos");

      const data = await response.json();
      const filteredDevice = data.find((d) => d.device_id === device.device_id);
      if (!filteredDevice) throw new Error("Cerradura no encontrada en la API");

      setSelectedDevice(filteredDevice);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const toggleLock = async (lock) => {
    if (!selectedDevice) return;

    const endpoint = lock
      ? `http://localhost:8080/seam/lock/${device.device_id}`
      : `http://localhost:8080/seam/unlock/${device.device_id}`;

    try {
      setIsProcessing(true);
      const response = await fetch(endpoint, { method: "POST" });

      const data = await response.json();
      if (!response.ok)
        throw new Error(
          `No se pudo ${lock ? "bloquear" : "desbloquear"} la cerradura`
        );

      setTimeout(async () => {
        await fetchDevice();
        setIsProcessing(false);

        setTimeout(async () => {
          setActionType(data.action_type);
          setLockedNow(selectedDevice?.properties?.locked);
          setActionAttemptId(data.action_attempt_id);
        }, 500);
      }, 8000);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const guardarEvento = async (
    lock,
    actionType,
    action_attempt_id,
    newStatus
  ) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/eventos/guardar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            eventId: action_attempt_id || "unknown",
            deviceId: selectedDevice.device_id,
            descripcion: `Cerradura: ${
              lock
                ? "Intento de cierre de una cerradura"
                : "Intento de abrir una cerradura"
            }`,
            status: newStatus || "unknown",
            actionType: actionType || "unknown",
          }),
        }
      );

      if (!response.ok) throw new Error("No se pudo guardar el evento");

      const data = await response.json();
      console.log("Evento guardado:", data);
    } catch (err) {
      console.error("Error al guardar el evento:", err.message);
    }
  };

  const handleLockChange = (value) => {
    setLockSlider(value);
    if (value === 1) {
      toggleLock(true);
    }
  };

  const handleUnlockChange = (value) => {
    setUnlockSlider(value);
    if (value === 0) {
      toggleLock(false);
    }
  };

  const handleEliminarCerradura = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta cerradura?");
    if (!confirmacion) return;

    try {
      const response = await fetch(`http://localhost:8080/seam/device/${device.device_id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        alert("Cerradura eliminada correctamente.");
        navigate("/propietario/cerraduras");
      } else if (response.status === 404) {
        alert("La cerradura no fue encontrada.");
      } else {
        throw new Error("Error al eliminar la cerradura.");
      }
    } catch (err) {
      alert("Ocurrió un error al eliminar la cerradura.");
      console.error(err);
    }
  };

  if (error) return <div>{error}</div>;
  if (!selectedDevice) return <div>Cargando detalles de la cerradura...</div>;

  return (
    <div className="lock-container">
      <div className="lock-main">
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
        <div className="lock-card">
          <h2>Detalles de la Cerradura</h2>
          <h3>{selectedDevice.properties.name || "Sin nombre"}</h3>
          <img
            src={selectedDevice.properties.image_url}
            alt="Cerradura"
            className="lock-image"
          />
          <p>
            <strong>Tipo:</strong> {selectedDevice.device_type}
          </p>
          <p>
            <strong>ID del Dispositivo:</strong> {selectedDevice.device_id}
          </p>
          <p>
            <strong>Estado de la Cerradura:</strong>
            <span className="lock-status">
              {selectedDevice.properties.locked ? " Cerrada" : " Abierta"}
            </span>
          </p>
          <p>
            <strong>Estado de Conexión:</strong>
            {selectedDevice.properties.online ? " En línea" : " Desconectada"}
          </p>
          <p>
            <strong>Nivel de batería: </strong>
            {isNaN(selectedDevice.properties.battery_level)
              ? "Desconocido"
              : (selectedDevice.properties.battery_level * 100).toFixed(0) + "%"}
          </p>

          {isProcessing && (
            <div className="processing-message">Enviando solicitud...</div>
          )}

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

          {/* Botón para eliminar cerradura */}
          <div className="eliminar-cerradura-container">
            <button className="btn-eliminar" onClick={handleEliminarCerradura}>
              Eliminar Cerradura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CerraduraDetalle;
