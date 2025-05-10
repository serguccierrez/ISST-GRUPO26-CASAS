import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SeamConnect = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [webView, setWebView] = useState(null);
  const [webviewId, setWebviewId] = useState(null);
  const [connectedAccountId, setConnectedAccountId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [userDevices, setUserDevices] = useState([]);

  const handleSubmit = async () => {
    const propietario = JSON.parse(localStorage.getItem("propietario"));
    try {
      for (const device of devices) {
        const nuevoBbddData = {
          device_id: device.device_id,
          nombre:
            device.properties.name ||
            device.properties.display_name ||
            "Sin nombre",
          tipo: device.device_type,
          propiedad_id: null,
          propietario_id: propietario.id,
        };

        const response = await fetch(
          `http://localhost:8080/seam/device/crear/${propietario.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoBbddData),
          }
        );

        if (!response.ok) throw new Error("Error al registrar la propiedad");
      }
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

 // Modificación del handleCerraduraClick
const handleCerraduraClick = (device) => {
  navigate(`/cerradura/${device.device_id}`, { state: { device } }); // Pasamos el dispositivo completo a la ruta de detalles
};


  const getUserDevices = async () => {
    try {
      const propietario = JSON.parse(localStorage.getItem("propietario"));
      const response = await fetch(
        `http://localhost:8080/seam/device/propietario/${propietario.id}`
      );
      if (!response.ok)
        throw new Error("No se pudo obtener la lista de dispositivos");
      const data = await response.json();
      setUserDevices(data); // Guardamos los dispositivos del propietario
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:8080/seam/devices");
      if (!response.ok)
        throw new Error("No se pudo obtener la lista de dispositivos");
      const data = await response.json();

      const filteredDevices = data.filter(
        (device) => device.connected_account_id === connectedAccountId
      );

      setDevices(filteredDevices);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  useEffect(() => {
    getUserDevices(); // Llamar a getUserDevices cuando el componente se monte
  }, []); // Este useEffect solo se ejecuta una vez cuando el componente se carga

  useEffect(() => {
    if (connectedAccountId) {
      fetchDevices(); // Solo ejecutamos la función si hay un `connectedAccountId`
    }
  }, [connectedAccountId]); // Se ejecuta cuando `connectedAccountId` cambia

  useEffect(() => {
    if (webView?.url) {
      window.open(webView.url, "_blank");
    }
  }, [webView]);

  const handleCreateWebView = async () => {
    try {
      const response = await fetch("http://localhost:8080/seam/webview");
      if (!response.ok) {
        throw new Error("No se pudo obtener el WebView");
      }
      const data = await response.json();
      setWebView(data);
      setWebviewId(data.connect_webview_id);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleCheckStatus = async () => {
    try {
      const response = await fetch("http://localhost:8080/seam/webview-list");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de WebViews");
      }
      const data = await response.json();
      const webview = data.find(
        (webview) => webview.connect_webview_id === webviewId
      );
      if (webview && webview.status === "authorized") {
        setConnectedAccountId(webview.connected_account_id);
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleUpdate = async () => {
    await handleCheckStatus();
    await fetchDevices();
    await handleSubmit();
    await getUserDevices(); // Llamar a getUserDevices para obtener dispositivos actualizados
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="seam-connect-container">
        <button onClick={handleCreateWebView}>Añade un dispositivo</button>
        <button onClick={handleUpdate}>Actualizar</button>
      </div>

      {/* Mostrar los dispositivos del propietario */}
      <div className="device-cards-container">
        {userDevices.length > 0 &&
          userDevices.map((device) => (
            <div
            key={device.device_id}
            className="device-card"
            onClick={() => handleCerraduraClick(device)} // Hacer clic redirige al detalle
          >
              <h3>{device.nombre || "Sin nombre"}</h3>
              <p>
                <strong>Tipo:</strong> {device.tipo}
              </p>
              <p>
                <strong>ID del Dispositivo:</strong> {device.device_id}
              </p>
              <p>
                <strong>Propietario:</strong> {device.propietario.nombre}
              </p>
            </div>
          ))}
        {userDevices.length === 0 && <p>No tienes dispositivos registrados.</p>}
      </div>
    </div>
  );
};

export default SeamConnect;
