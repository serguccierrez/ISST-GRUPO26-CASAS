import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/CercaDeMi.css';
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";



// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CercaDeMi = () => {
  const navigate = useNavigate();
  const [userPosition, setUserPosition] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const fetchNearbyPlaces = async (lat, lng) => {
    try {
      const radius = 800;
      const query = `[out:json];
        (
          node(around:${radius},${lat},${lng})[amenity~"restaurant|cafe|pub|pharmacy"];
          node(around:${radius},${lat},${lng})[shop];
        );
        out body;`;
      
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error('Error del servidor al buscar lugares');
      }

      const data = await response.json();
      const places = data.elements
        .filter(element => 
          element.tags?.name && 
          (element.tags.amenity || element.tags.shop)
        )
        .map(element => ({
          type: element.tags.amenity || element.tags.shop,
          name: element.tags.name,
          position: [element.lat, element.lon]
        }));

      return places;

    } catch (err) {
      console.error('Full API Error:', err);
      throw new Error('Error al cargar lugares cercanos');
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          await new Promise(resolve => setTimeout(resolve, 1000));
          const places = await fetchNearbyPlaces(latitude, longitude);
          
          if (places.length === 0) {
            setError('No se encontraron lugares en 30km a la redonda');
          } else {
            setUserPosition([latitude, longitude]);
            setNearbyPlaces(places);
          }
        } catch (err) {
          setError(err.message || 'Error desconocido');
        }
        setIsLoading(false);
      },
      (err) => {
        let errorMessage;
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado. Habilítalo en ajustes.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Ubicación no disponible. Revisa tu conexión.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado. Intenta nuevamente.';
            break;
          default:
            errorMessage = 'Error al obtener ubicación.';
        }
        setError(errorMessage);
        setIsLoading(false);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const MapCenterHandler = () => {
    const map = useMap();
    if (userPosition) {
      map.setView(userPosition, 13);
    }
    return null;
  };

  const handleLogout = () => {
    // Limpia el localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("propietario");
    localStorage.clear(); // Limpia todo el localStorage si es necesario

    // Redirige al usuario a la página principal
    navigate("/");
  };

  return (
    <div className="cerca-container">
        <div className="navbar">
              <img
                src={logo}
                alt="Logo"
                className="logo"
                onClick={() => navigate("/usuario")}
              />
              <h3 id="nombre" onClick={() => navigate("/usuario")}>
                IoHome
              </h3>
            
            <button className="logout-button" onClick={handleLogout }>Logout</button>

        </div>
      
      <div className="map-section">
        <button 
          className="location-button"
          onClick={handleGetLocation}
          disabled={isLoading}
          style={{
            ...(isLoading && {
              backgroundColor: '#a5d6a7',
              cursor: 'not-allowed'
            })
          }}
        >
          {isLoading ? '🔍 Buscando...' : '📍 Mostrar mi ubicación'}
        </button>

        {error && !isLoading && (
          <div className="error-box">
            <span>⚠️</span>
            <div>
              <p>{error}</p>
              <button 
                onClick={handleGetLocation}
                className="retry-button"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {userPosition ? (
          <MapContainer
            center={userPosition}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='© OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapCenterHandler />
            
            <Marker position={userPosition}>
              <Popup>
                <div className="popup-style">🎯 Tu ubicación actual</div>
              </Popup>
            </Marker>

            {nearbyPlaces.map((place, index) => (
              <Marker key={index} position={place.position}>
                <Popup>
                  <div className="popup-style">
                    <div className="popup-title">
                      {place.type}
                    </div>
                    <div>{place.name}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="map-loading-state">
            <p>Esperando tu ubicación...</p>
          </div>
        )}
      </div>

      <div className="places-list">
        <h2>Lugares cercanos</h2>
        {nearbyPlaces.map((place, index) => (
          <div 
            key={index} 
            className="place-item"
            onClick={() => mapRef.current?.setView(place.position, 16)}
          >
            <div className="place-type">
              {place.type}
            </div>
            <div className="place-name">{place.name}</div>
          </div>
        ))}
        {nearbyPlaces.length === 0 && !isLoading && (
          <div className="empty-state">
            {error ? error : 'Presiona el botón para buscar lugares'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CercaDeMi;