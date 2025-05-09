// UserProfile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/perfilConfiguracion.css";
import logo from "../assets/logo.png";

const UserProfile = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    correoElectronico: "",
    telefono: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioData) {
      setUsuario(usuarioData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/usuarios/${usuario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el perfil");
      const updatedUsuario = await response.json();
      console.log("Perfil actualizado correctamente");
      localStorage.setItem("usuario", JSON.stringify(updatedUsuario));
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  const deleteUser = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/usuarios/${usuario.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Error al eliminar el usuario");
        console.log("Usuario eliminado correctamente");
        localStorage.removeItem("usuario");
        navigate("/login");
      } catch (err) {
        console.log("Error: " + err.message);
      }
    }
  }

  const handleLogout = () => {
  // Limpia el localStorage
  localStorage.removeItem("usuario");
  localStorage.removeItem("propietario");
  localStorage.clear(); // Limpia todo el localStorage si es necesario

  // Redirige al usuario a la página principal
  navigate("/");
  };

  return (
    <div className="perfil-container">
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
         <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>

      </div>
      <div className="perfil-card">
        <h2>Perfil y Configuración de Usuario</h2>
        <div className="perfil-form">
          <label>Nombre:</label>
          <input name="nombre" value={usuario.nombre} onChange={handleChange} />

          <label>Apellidos:</label>
          <input
            name="apellidos"
            value={usuario.apellidos}
            onChange={handleChange}
          />

          <label>DNI:</label>
          <input name="dni" value={usuario.dni} onChange={handleChange} />

          <label>Correo Electrónico:</label>
          <input
            name="correoElectronico"
            value={usuario.correoElectronico}
            onChange={handleChange}
          />

          <label>Teléfono:</label>
          <input
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
          />

          <button onClick={handleSave}>Guardar Cambios</button>

          <button className="delete-button" onClick={deleteUser}>Eliminar Usuario</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
