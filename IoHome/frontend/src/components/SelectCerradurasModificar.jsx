import React, { useEffect, useState } from "react";

const SelectCerradurasModificar = ({ propiedadId, cerraduraSeleccionada, setCerraduraSeleccionada }) => {
  const [cerraduras, setCerraduras] = useState([]);
  const [error, setError] = useState(null);
  const [cerraduraActual, setCerraduraActual] = useState("");

  useEffect(() => {
    const fetchCerraduras = async () => {
      try {
        const propietario = JSON.parse(localStorage.getItem("propietario"));
        if (!propietario) throw new Error("No se encontró información del propietario");

        // Obtener todas las cerraduras del propietario
        const response = await fetch(
          `http://localhost:8080/seam/device/propietario/${propietario.id}`
        );
        if (!response.ok) throw new Error("No se pudo obtener la lista de cerraduras");

        const data = await response.json();
        setCerraduras(data);
      } catch (err) {
        console.error("Error al obtener cerraduras:", err);
        setError("Error: " + err.message);
      }
    };

    const fetchCerraduraActual = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/seam/device/propiedad/${propiedadId}`
        );
        if (!response.ok) throw new Error("No se pudo obtener la cerradura actual");
        
        const cerraduraData = await response.json();
        setCerraduraActual(cerraduraData.device_id);
        setCerraduraSeleccionada(cerraduraData.device_id);
      } catch (err) {
        console.error("Error al obtener cerradura actual:", err);
        setError("Error: " + err.message);
      }
    };

    fetchCerraduras();
    fetchCerraduraActual();
  }, [propiedadId]);

  return (
    <div>
      <select
        value={cerraduraSeleccionada}
        onChange={(e) => setCerraduraSeleccionada(e.target.value)}
        required
      >
        <option value="">Seleccione una cerradura</option>
        {cerraduras.map((cerradura) => (
          <option key={cerradura.device_id} value={cerradura.device_id}>
            {cerradura.nombre} - {cerradura.tipo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCerradurasModificar;
