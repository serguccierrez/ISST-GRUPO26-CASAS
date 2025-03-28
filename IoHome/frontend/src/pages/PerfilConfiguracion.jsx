import { useEffect, useState } from "react";
import "../styles/perfilConfiguracion.css";

const PerfilConfiguracion = () => {
  const [propietario, setPropietario] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    correoElectronico: "",
    telefono: "",
  });

  useEffect(() => {
    const propietarioData = JSON.parse(localStorage.getItem("propietario"));
    if (propietarioData) {
      setPropietario(propietarioData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropietario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/propietarios/${propietario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propietario),
      });

      if (!response.ok) throw new Error("Error al actualizar el perfil");
      alert("Perfil actualizado correctamente");
      localStorage.setItem("propietario", JSON.stringify(propietario));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="perfil-container">
      <h2>Perfil y Configuración</h2>
      <div className="perfil-form">
        <label>Nombre:</label>
        <input name="nombre" value={propietario.nombre} onChange={handleChange} />

        <label>Apellidos:</label>
        <input name="apellidos" value={propietario.apellidos} onChange={handleChange} />

        <label>DNI:</label>
        <input name="dni" value={propietario.dni} onChange={handleChange} />

        <label>Correo Electrónico:</label>
        <input name="correoElectronico" value={propietario.correoElectronico} onChange={handleChange} />

        <label>Teléfono:</label>
        <input name="telefono" value={propietario.telefono} onChange={handleChange} />

        <button onClick={handleSave}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default PerfilConfiguracion;
