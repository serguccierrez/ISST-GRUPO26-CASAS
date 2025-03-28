import { useState } from "react";

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
      const response = await fetch(`http://localhost:8080/api/propiedades/crear/${propietario.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al registrar la propiedad");
      const nuevaPropiedad = await response.json();
      alert("Propiedad registrada correctamente");
      onPropertyCreated(nuevaPropiedad); // Actualiza la lista de propiedades
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <h3>Registrar nueva propiedad</h3>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="direccion" placeholder="Dirección" onChange={handleChange} required />
      <input name="ciudad" placeholder="Ciudad" onChange={handleChange} required />
      <input name="cp" placeholder="Código Postal" onChange={handleChange} required />
      <input name="piso" placeholder="Piso" onChange={handleChange} required />
      <input name="habitaciones" type="number" placeholder="Habitaciones" onChange={handleChange} required />
      <input name="banos" type="number" placeholder="Baños" onChange={handleChange} required />
      
      <label><input type="checkbox" name="aireAcondicionado" onChange={handleChange} /> Aire Acondicionado</label>
      <label><input type="checkbox" name="cocinaEquipada" onChange={handleChange} /> Cocina Equipada</label>
      <label><input type="checkbox" name="secador" onChange={handleChange} /> Secador</label>
      <label><input type="checkbox" name="plancha" onChange={handleChange} /> Plancha</label>
      <label><input type="checkbox" name="cafetera" onChange={handleChange} /> Cafetera</label>
      <label><input type="checkbox" name="toallasYSabanas" onChange={handleChange} /> Toallas y Sábanas</label>
      <label><input type="checkbox" name="piscina" onChange={handleChange} /> Piscina</label>
      <label><input type="checkbox" name="garaje" onChange={handleChange} /> Garaje</label>

      <textarea name="normas" placeholder="Normas de la propiedad" onChange={handleChange}></textarea>

      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistrarPropiedad;
