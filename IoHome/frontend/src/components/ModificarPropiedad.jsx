import { useState, useEffect } from "react";
import "../styles/registrarPropiedad.css";
import SelectCerradurasModificar from "./SelectCerradurasModificar";

const ModificarPropiedad = ({ propiedad, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [cerraduraSeleccionada, setCerraduraSeleccionada] = useState("");

  useEffect(() => {
    if (propiedad) {
      setFormData(propiedad);
      setCerraduraSeleccionada(propiedad.cerraduraId || "");
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
      formData.cerraduraId = cerraduraSeleccionada;

      await onUpdate(formData);

      // Asignar cerradura a la propiedad
      if (cerraduraSeleccionada) {
        const response = await fetch(
          `http://localhost:8080/seam/cerradura/${cerraduraSeleccionada}/propiedad/${formData.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Error al asignar la cerradura");
      }

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
      <SelectCerradurasModificar 
        propiedadId={formData.id} 
        cerraduraSeleccionada={cerraduraSeleccionada} 
        setCerraduraSeleccionada={setCerraduraSeleccionada} 
      />
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ModificarPropiedad;
