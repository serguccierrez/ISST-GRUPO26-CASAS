// UserHome.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userHome.css";
import logo from "../assets/logo.png";
import CerraduraUsuario from "../components/CerraduraUsuario"; // Asegúrate de la ruta correcta

const UserHome = () => {
  const [nombre, setNombre] = useState("");
  const [usuarioId, setUsuarioId] = useState(null);
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      const usuario = JSON.parse(data);
      setNombre(usuario.nombre);
      setUsuarioId(usuario.id); // Guardamos el ID del usuario
    }
  }, []);

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const redirigirHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="user-home">
      <header className="user-header">
        <div className="navbar">
        
          <img src={logo} alt="Logo" className="logo" />
          <h3>IoHome</h3>
          
          <button className="scroll-button" onClick={scrollToServices}>
            Servicios
          </button>
        
        <button onClick={redirigirHome}>🌐 </button>
      
        </div>
        <h1>Bienvenido a IOHOME, {nombre || "usuario"}</h1>

        

        <p>Gestiona tus reservas y tu alojamiento de forma sencilla.</p>
      


        <div className="infolock">
          {usuarioId ? (
            <CerraduraUsuario usuarioId={usuarioId} />
          ) : (
            <p>No hay cerradura asociada</p>
          )}
        </div>
      </header>

      <section ref={servicesRef} className="user-services">
        <h2>Servicios</h2>
        <div className="service-buttons">
          <div className="card" onClick={() => navigate("/usuario/perfil")}>
            <span>Perfil y configuración</span>
            <button>GO</button>
          </div>
          <div className="card" onClick={() => alert("Cerca de mí")}>
            <span>Cerca de mí</span>
            <button>GO</button>
          </div>
          <div className="card" onClick={() => navigate("/usuario/alojamiento")}>
            <span>Mi alojamiento</span>
            <button>GO</button>
          </div>
        </div>
      </section>

      <footer className="user-footer">
        © 2025 IOHOME. Todos los derechos reservados
      </footer>
    </div>
  );
};

export default UserHome;
