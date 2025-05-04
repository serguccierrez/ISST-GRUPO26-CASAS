import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CercaDeMi = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // Style definitions
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      width: '100%',
      backgroundColor: '#f0f2f5',
      padding: '20px',
      boxSizing: 'border-box',
    },
    leftPanel: {
      flex: 1,
      height: '100%',
      marginRight: '20px',
      minWidth: '300px',
      maxWidth: '400px',
    },
    rightPanel: {
      flex: 2,
      height: '100%',
      position: 'relative',
    },
    placesList: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      height: 'calc(100% - 40px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflowY: 'auto',
    },
    placeItem: {
      padding: '12px',
      marginBottom: '10px',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#e9ecef',
      }
    },
    button: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      padding: '12px 24px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    errorBox: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      padding: '15px 25px',
      backgroundColor: '#ffebee',
      border: '2px solid #ff5252',
      borderRadius: '8px',
      color: '#ff5252',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      maxWidth: '400px'
    },
    mapContainer: {
      height: '100%',
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    popupStyle: {
      fontWeight: '600',
      fontSize: '14px',
      color: '#2c3e50',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '2px solid #4CAF50'
    }
  };

  const fetchNearbyPlaces = async (lat, lng) => {
    try {
      const radius = 1000; // 30km radius
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
      console.log('Raw API Data:', data);

      // Process the results
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

      console.log('Processed Places:', places);
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
          console.log('User Coordinates:', latitude, longitude);

          // Add delay to avoid rate limiting
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

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.placesList}>
          <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Lugares cercanos</h2>
          {nearbyPlaces.map((place, index) => (
            <div 
              key={index} 
              style={styles.placeItem}
              onClick={() => mapRef.current?.setView(place.position, 16)}
            >
              <div style={{ color: '#4CAF50', fontWeight: '600' }}>
                {place.type}
              </div>
              <div style={{ fontSize: '14px' }}>{place.name}</div>
            </div>
          ))}
          {nearbyPlaces.length === 0 && !isLoading && (
            <div style={{ 
              color: '#6c757d', 
              textAlign: 'center',
              padding: '20px'
            }}>
              {error ? error : 'Presiona el botón para buscar lugares'}
            </div>
          )}
        </div>
      </div>

      <div style={styles.rightPanel}>
        <button 
          onClick={handleGetLocation}
          disabled={isLoading}
          style={{
            ...styles.button,
            ...(isLoading && {
              backgroundColor: '#a5d6a7',
              cursor: 'not-allowed'
            })
          }}
        >
          {isLoading ? '🔍 Buscando...' : '📍 Mostrar mi ubicación'}
        </button>

        {error && !isLoading && (
          <div style={styles.errorBox}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div>
              <p style={{ margin: 0, fontWeight: '600' }}>{error}</p>
              <button 
                onClick={handleGetLocation}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#ff5252',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
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
            style={styles.mapContainer}
            ref={mapRef}
          >
            <TileLayer
              attribution='© OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapCenterHandler />
            
            <Marker position={userPosition}>
              <Popup>
                <div style={styles.popupStyle}>🎯 Tu ubicación actual</div>
              </Popup>
            </Marker>

            {nearbyPlaces.map((place, index) => (
              <Marker key={index} position={place.position}>
                <Popup>
                  <div style={styles.popupStyle}>
                    <div style={{ 
                      color: '#4CAF50',
                      fontSize: '16px',
                      marginBottom: '4px',
                      fontWeight: '600'
                    }}>
                      {place.type}
                    </div>
                    <div>{place.name}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div style={{ 
            ...styles.mapContainer,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            color: '#6c757d'
          }}>
            <p>Esperando tu ubicación...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CercaDeMi;