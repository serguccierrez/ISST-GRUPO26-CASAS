import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (device?.device_id) {
      fetchDevice();
    }
  }, [device?.device_id]);

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
      const response = await fetch(endpoint, { method: "POST" });
      if (!response.ok)
        throw new Error(
          `No se pudo ${lock ? "bloquear" : "desbloquear"} la cerradura`
        );

      // Volver a cargar datos después de cambiar el estado
      setTimeout(() => {
        fetchDevice();
      }, 8000); // Espera 1 segundo antes de llamar a fetchDevice
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  // Manejar el slider de bloquear
  const handleLockChange = (value) => {
    setLockSlider(value);
    if (value === 1) {
      toggleLock(true);
      setTimeout(() => setLockSlider(0), 500); // Reinicia el slider
    }
  };

  // Manejar el slider de desbloquear
  const handleUnlockChange = (value) => {
    setUnlockSlider(value);
    if (value === 0) {
      toggleLock(false);
      setTimeout(() => setUnlockSlider(1), 500); // Reinicia el slider
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedDevice) {
    return <div>Cargando detalles de la cerradura...</div>;
  }

return (
    <div className="lock-container">
      <div className="lock-main">
    
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
        <div className="lock-card">
            <h2>Detalles de la Cerradura</h2>
            <h3>{selectedDevice.properties.name || "Sin nombre"}</h3>
            <img src={selectedDevice.properties.image_url} alt="Cerradura" className="lock-image" />
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
                {(selectedDevice.properties.battery_level * 100).toFixed(0)}%
            </p>

            {/* Slider para bloquear la cerradura */}
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

            {/* Slider para desbloquear la cerradura */}
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
        </div>
    </div>
);
};

export default CerraduraDetalle;
