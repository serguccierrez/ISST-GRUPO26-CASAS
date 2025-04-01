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
      alert("Perfil actualizado correctamente");
      localStorage.setItem("usuario", JSON.stringify(updatedUsuario));
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
          onClick={() => navigate("/inicio-propietario")}
        />
        <h3 id="nombre" onClick={() => navigate("/inicio-propietario")}>
          IoHome
        </h3>
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
