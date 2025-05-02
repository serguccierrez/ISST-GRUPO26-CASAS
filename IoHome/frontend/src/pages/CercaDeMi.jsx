import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CercaDeMi = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [direccion, setDireccion] = useState(null);
  const [cp, setCp] = useState(null);
  const [ciudad, setCiudad] = useState(null);
  const [nombre, setNombre] = useState("");
  const [usuarioId, setUsuarioId] = useState(null); // <--- NUEVO ESTADO
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.id) {
      obtenerUltimaReservaActiva(usuario.id)
        .then(setReserva)
        .catch((err) =>
          console.error("Error al obtener la reserva activa", err)
        );
    }
  }, []);

  useEffect(() => {
    // Inicializar el mapa
    const mapInstance = L.map("map").setView([40.9412, -4.1328], 13); // Coordenadas iniciales (Segovia)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);
    setMap(mapInstance);

    // Obtener la ubicación desde el backend
    fetchLocationFromBackend(mapInstance);
  }, []);

  useEffect(() => {
    if (reserva?.propiedad) {
      setDireccion(reserva.propiedad.direccion);
      setCp(reserva.propiedad.cp);
      setCiudad(reserva.propiedad.ciudad);
    }
  }, [reserva]);

  return (
    <div>
      <h1>Cerca de mí</h1>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      {direccion && cp && ciudad && (
        <div>
          <h2>Detalles de la ubicación:</h2>
          <p><strong>Dirección:</strong> {direccion}</p>
          <p><strong>Código Postal:</strong> {cp}</p>
          <p><strong>Ciudad:</strong> {ciudad}</p>
        </div>
      )}
    </div>
  );
};

export default CercaDeMi;