import React, { useEffect, useState } from 'react';

const SeamConnect = () => {
  const [error, setError] = useState(null);
  const [webView, setWebView] = useState(null);
  const [webviewId, setWebviewId] = useState(null);
  const [connectedAccountId, setConnectedAccountId] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      if (connectedAccountId) {
        try {
          const response = await fetch('http://localhost:8080/seam/devices');
          if (!response.ok) {
            throw new Error('No se pudo obtener la lista de dispositivos');
          }
          const data = await response.json();
          console.log(data); // Aquí puedes manejar la lista de dispositivos

          // Filtrar dispositivos por connectedAccountId
          const filteredDevices = data.filter(device => device.account_id === connectedAccountId);
          setDevices(filteredDevices); // Guardar los dispositivos filtrados en el estado
          console.log(filteredDevices); // Aquí puedes manejar los dispositivos filtrados
        } catch (err) {
          setError('Error: ' + err.message);
        }
      }
    };

    fetchDevices();
  }, [connectedAccountId]);

  // Función para crear un WebView y guardar su ID
  const handleCreateWebView = async () => {
    try {
      const response = await fetch('http://localhost:8080/seam/webview');
      if (!response.ok) {
        throw new Error('No se pudo obtener el WebView');
      }
      const data = await response.json();
      setWebView(data); // Guardar el WebView en el estado
      setWebviewId(data.connect_webview_id); // Guardar el ID del WebView creado
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  // Función para verificar si el WebView está autorizado y obtener el connected_account_id
  const handleCheckStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/seam/webview-list');
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de WebViews');
      }
      const data = await response.json();
      console.log(data); // Aquí puedes manejar la lista de WebViews

      // Buscar el WebView con el ID guardado
      const webview = data.find(webview => webview.connect_webview_id === webviewId);
      if (webview && webview.status === "authorized") {
        setConnectedAccountId(webview.connected_account_id);
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };



  return (
    <div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button onClick={handleCreateWebView}>Conectar con Seam</button>

      {webviewId && (
        <>
          <p>WebView ID: {webviewId}</p>
          {window.open(webView.url, '_blank')}
          <button onClick={handleCheckStatus}>Actualizar estado</button>

          <p> {devices} </p>
        </>
      )}

      {connectedAccountId && (
        <p>Connected Account ID: {connectedAccountId}</p>
      )}
    </div>
  );
};

export default SeamConnect;
