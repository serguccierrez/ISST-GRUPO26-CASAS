import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import "../styles/perfilConfiguracion.css"; // Asegúrate de que esta ruta sea correcta
import logo from "../assets/logo.png"; // Asegúrate de que el logo esté en la carpeta correcta

const PerfilConfiguracion = () => {
  const [propietario, setPropietario] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    correoElectronico: "",
    telefono: "",
  });

  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Limpia el localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("propietario");
    localStorage.clear(); // Limpia todo el localStorage si es necesario

    // Redirige al usuario a la página principal
    navigate("/");
};

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/propietarios/${propietario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propietario),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el perfil");
      const updatedPropietario = await response.json(); // Puedes recibir el propietario actualizado desde el backend

      alert("Perfil actualizado correctamente");
      localStorage.setItem("propietario", JSON.stringify(updatedPropietario)); // Guarda el nuevo propietario en localStorage
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="perfil-container">
      <div className="navbar">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/propietario")}
        />
        <h3 id="nombre" onClick={() => navigate("/propietario")}>
          IoHome
        </h3>
        <button className="logout-button" onClick={() => navigate("/")}>
         Logout
        </button>
      </div>

      <div className="perfil-card">
        <h2>Perfil y Configuración</h2>
        <div className="perfil-form">
          <label>Nombre:</label>
          <input
            name="nombre"
            value={propietario.nombre}
            onChange={handleChange}
          />

          <label>Apellidos:</label>
          <input
            name="apellidos"
            value={propietario.apellidos}
            onChange={handleChange}
          />

          <label>DNI:</label>
          <input name="dni" value={propietario.dni} onChange={handleChange} />

          <label>Correo Electrónico:</label>
          <input
            name="correoElectronico"
            value={propietario.correoElectronico}
            onChange={handleChange}
          />

          <label>Teléfono:</label>
          <input
            name="telefono"
            value={propietario.telefono}
            onChange={handleChange}
          />

          <button onClick={handleSave}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default PerfilConfiguracion;
