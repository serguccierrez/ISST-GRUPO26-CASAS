import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/unaCerradura.css";
import logo from "../assets/logo.png";
import { obtenerCerraduraUsuario } from "../services/cerraduraService";
import { obtenerPropiedadDeUltimaReserva } from "../services/reservaService";

const CerraduraUsuario = ({ usuarioId }) => {
  const [cerradura, setCerradura] = useState(null);
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState(null);
  const [lockSlider, setLockSlider] = useState(0);
  const [unlockSlider, setUnlockSlider] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioId) {
      fetchCerradura();
      fetchPropiedad();
    }
  }, [usuarioId]);

  useEffect(() => {
    if (cerradura?.properties?.locked !== undefined) {
      const wasSuccessful =
        (cerradura.properties.locked && lockSlider === 1) ||
        (!cerradura.properties.locked && unlockSlider === 0);

      if (wasSuccessful) {
        setTimeout(() => {
          setLockSlider(0);
          setUnlockSlider(1);
        }, 5000); // Resetea los sliders después de 5 segundos
      }
    }
  }, [cerradura?.properties?.locked, lockSlider, unlockSlider]);

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

  const guardarEvento = async (lock, actionType, actionAttemptId, newStatus) => {
    try {
      const response = await fetch("http://localhost:8080/api/eventos/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          eventId: actionAttemptId || "unknown",
          deviceId: cerradura.device_id,
          descripcion: `Cerradura: ${
            lock
              ? "Intento de cierre de una cerradura"
              : "Intento de abrir una cerradura"
          }`,
          status: newStatus || "unknown",
          actionType: actionType || "unknown",
        }),
      });

      if (!response.ok) throw new Error("No se pudo guardar el evento");

      const data = await response.json();
      console.log("Evento guardado:", data);
    } catch (err) {
      console.error("Error al guardar el evento:", err.message);
    }
  };

  const toggleLock = async (lock) => {
    if (!cerradura) return;

    const endpoint = lock
      ? `http://localhost:8080/seam/lock/${cerradura.device_id}`
      : `http://localhost:8080/seam/unlock/${cerradura.device_id}`;

    try {
      setIsProcessing(true);
      const response = await fetch(endpoint, { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `No se pudo ${lock ? "bloquear" : "desbloquear"} la cerradura`
        );
      }

      const actionType = data.action_type;
      const actionAttemptId = data.action_attempt_id;

      setTimeout(async () => {
        await fetchCerradura();
        setIsProcessing(false);

        const wasSuccessful =
          (!lock && cerradura.properties?.locked) ||
          (lock && !cerradura.properties?.locked);
        const newStatus = wasSuccessful ? "success" : "failed";

        guardarEvento(lock, actionType, actionAttemptId, newStatus);
      }, 8000);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleLockChange = (value) => {
    setLockSlider(value);
    if (value === 1) {
      toggleLock(true);
      setTimeout(() => {
        setLockSlider(0); // Regresa el slider a la posición inicial
      }, 5000); // Mantiene el slider en la posición 1 durante 5 segundos
    }
  };

  const handleUnlockChange = (value) => {
    setUnlockSlider(value);
    if (value === 0) {
      toggleLock(false);
      setTimeout(() => {
        setUnlockSlider(1); // Regresa el slider a la posición inicial
      }, 5000); // Mantiene el slider en la posición 0 durante 5 segundos
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
      <h2>
        Cerradura de {propiedad?.nombre || "Propiedad desconocida"}
        {propiedad?.direccion ? ` (${propiedad.direccion})` : ""}
      </h2>
      <img
        src={cerradura.properties.image_url}
        alt="Cerradura"
        className="lock-image"
      />
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
    </div>
  );
};

export default CerraduraUsuario;
