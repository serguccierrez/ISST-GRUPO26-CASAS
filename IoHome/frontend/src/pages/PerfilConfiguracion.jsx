import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/perfilConfiguracion.css";
import logo from "../assets/logo.png";

const PerfilConfiguracion = () => {
  const [propietario, setPropietario] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    correoElectronico: "",
    telefono: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
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

  const deleteUser = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/propietarios/${propietario.id}`,
          {
            method: "DELETE",
          }
        );
        navigate("/"); // Redirige a la página de inicio después de eliminar el usuario
        if (!response.ok) throw new Error("Error al eliminar el usuario");
        console.log("Usuario eliminado correctamente");
        localStorage.removeItem("propietario"); // Elimina el propietario de localStorage
      } catch (err) {
        console.log("Error: " + err.message);
      }
    }
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
      const updatedPropietario = await response.json();

      console.log("Perfil actualizado correctamente");
      localStorage.setItem("propietario", JSON.stringify(updatedPropietario));

      // Mostrar mensaje de éxito
      setSuccessMessage("Cambios guardados");

      // Ocultar el mensaje después de 1 segundo
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);

    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  const handleLogout = () => {
    // Limpia el localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("propietario");
    navigate("/");
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
          <button className="delete-button" onClick={deleteUser}>Eliminar Usuario</button>
        </div>

        {/* Mostrar mensaje de éxito */}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default PerfilConfiguracion;
