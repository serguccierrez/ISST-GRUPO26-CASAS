import React, { useEffect, useState } from "react";
import "../styles/registrarPropiedad.css"; // Asegúrate de que la ruta sea correcta

const SelectCerraduras = ({ cerraduraSeleccionada, setCerraduraSeleccionada }) => {
  const [cerraduras, setCerraduras] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCerraduras = async () => {
      try {
        const propietario = JSON.parse(localStorage.getItem("propietario"));
        if (!propietario) throw new Error("No se encontró información del propietario");
        
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

    fetchCerraduras();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
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

const RegistrarPropiedad = ({ onPropertyCreated }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    cp: "",
    piso: "",
    habitaciones: 1,
    banos: 1,
    aireAcondicionado: false,
    cocinaEquipada: false,
    secador: false,
    plancha: false,
    cafetera: false,
    toallasYSabanas: false,
    piscina: false,
    garaje: false,
    normas: ""
  });
  const [cerraduraSeleccionada, setCerraduraSeleccionada] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const propietario = JSON.parse(localStorage.getItem("propietario"));
  
    try {
      // 1️⃣ Crear la propiedad
      const response = await fetch(`http://localhost:8080/api/propiedades/crear/${propietario.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Error al registrar la propiedad");
      const nuevaPropiedad = await response.json();
  
      // 2️⃣ Asociar la cerradura a la propiedad
      if (cerraduraSeleccionada) {
        const asignarResponse = await fetch(
          `http://localhost:8080/seam/cerradura/${cerraduraSeleccionada}/propiedad/${nuevaPropiedad.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (!asignarResponse.ok) throw new Error("Error al asignar cerradura a la propiedad");
      }
  
      console.log("Propiedad registrada y cerradura asociada correctamente");
      onPropertyCreated(nuevaPropiedad);
    } catch (err) {
      console.error("Error al registrar la propiedad:", err);
      console.log("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <h3>Registrar nueva propiedad</h3>
      <input name="nombre" placeholder="Nombre"  onChange={handleChange} required />
      <input name="direccion" placeholder="Dirección"  onChange={handleChange} required />
      <input name="ciudad" placeholder="Ciudad"  onChange={handleChange} required />
      <input name="cp" placeholder="Código Postal"  onChange={handleChange} required />
      <input name="piso" placeholder="Piso"  onChange={handleChange} required />
      <input name="habitaciones" type="number" placeholder="Habitaciones"  onChange={handleChange} required />
      <input name="banos" type="number" placeholder="Baños"  onChange={handleChange} required />
      
      <SelectCerraduras cerraduraSeleccionada={cerraduraSeleccionada} setCerraduraSeleccionada={setCerraduraSeleccionada} />
      
      <div className="checkbox-group">
        {Object.keys(formData).filter(key => typeof formData[key] === "boolean").map((key) => (
          <label key={key}>
            <input type="checkbox" name={key} checked={formData[key]} onChange={handleChange} /> {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
        ))}
      </div>

      <textarea name="normas" placeholder="Normas de la propiedad" value={formData.normas} onChange={handleChange}></textarea>

      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistrarPropiedad;