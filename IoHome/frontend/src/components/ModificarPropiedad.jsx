import { useState, useEffect } from "react";
import "../styles/registrarPropiedad.css";

const ModificarPropiedad = ({ propiedad, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (propiedad) {
      setFormData(propiedad); // Inicializar con los datos actuales
    }
  }, [propiedad]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      alert("Propiedad actualizada correctamente");
    } catch (err) {
      alert("Error al actualizar la propiedad: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="property-form">
      <h3>Modificar Propiedad</h3>
      <input
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre || ""}
        onChange={handleChange}
        required
      />
      <input
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion || ""}
        onChange={handleChange}
        required
      />
      <input
        name="ciudad"
        placeholder="Ciudad"
        value={formData.ciudad || ""}
        onChange={handleChange}
        required
      />
      <input
        name="cp"
        placeholder="Código Postal"
        value={formData.cp || ""}
        onChange={handleChange}
        required
      />
      <input
        name="piso"
        placeholder="Piso"
        value={formData.piso || ""}
        onChange={handleChange}
        required
      />
      <input
        name="habitaciones"
        type="number"
        placeholder="Habitaciones"
        value={formData.habitaciones || ""}
        onChange={handleChange}
        required
      />
      <input
        name="banos"
        type="number"
        placeholder="Baños"
        value={formData.banos || ""}
        onChange={handleChange}
        required
      />

      <div className="checkbox-group">
        <label>
          <input type="checkbox" name="aireAcondicionado" checked={formData.aireAcondicionado} onChange={handleChange} />
          Aire Acondicionado
        </label>
        <label>
          <input type="checkbox" name="cocinaEquipada" checked={formData.cocinaEquipada} onChange={handleChange} />
          Cocina Equipada
        </label>
        <label>
          <input type="checkbox" name="secador" checked={formData.secador} onChange={handleChange} />
          Secador
        </label>
        <label>
          <input type="checkbox" name="plancha" checked={formData.plancha} onChange={handleChange} />
          Plancha
        </label>
        <label>
          <input type="checkbox" name="cafetera" checked={formData.cafetera} onChange={handleChange} />
          Cafetera
        </label>
        <label>
          <input type="checkbox" name="toallasYSabanas" checked={formData.toallasYSabanas} onChange={handleChange} />
          Toallas y Sábanas
        </label>
        <label>
          <input type="checkbox" name="piscina" checked={formData.piscina} onChange={handleChange} />
          Piscina
        </label>
        <label>
          <input type="checkbox" name="garaje" checked={formData.garaje} onChange={handleChange} />
          Garaje
        </label>
      </div>

      <textarea
        name="normas"
        placeholder="Normas de la propiedad"
        value={formData.normas || ""}
        onChange={handleChange}
      ></textarea>

      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ModificarPropiedad;
