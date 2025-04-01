 
// cerraduraService.js
export const obtenerCerraduraUsuario = async (usuarioId) => {
    try {
      // 1. Obtener el device_id desde la última reserva activa
      const response = await fetch(`http://localhost:8080/seam/device/usuario/${usuarioId}/ultima-reserva`);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const data = await response.json();
  
      // Extraer el device_id
      const deviceId = data.device_id;
      if (!deviceId) {
        throw new Error("No se encontró el ID de la cerradura en la última reserva.");
      }
  
      // 2. Usar el device_id para obtener los detalles completos de la cerradura
      const deviceResponse = await fetch(`http://localhost:8080/seam/devices`);
      if (!deviceResponse.ok) {
        throw new Error("Error al obtener la lista de dispositivos.");
      }
      const devices = await deviceResponse.json();
  
      // Filtrar el dispositivo con el ID obtenido
      const deviceDetails = devices.find((d) => d.device_id === deviceId);
      if (!deviceDetails) {
        throw new Error("No se encontró el dispositivo con el ID proporcionado.");
      }
  
      return deviceDetails;
    } catch (error) {
      console.error("Error al obtener la cerradura del usuario:", error.message);
      return null;
    }
  };
  