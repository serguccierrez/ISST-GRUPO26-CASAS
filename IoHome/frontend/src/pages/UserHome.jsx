// UserHome.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userHome.css";
import logo from "../assets/logo.png";
import CerraduraUsuario from "../components/CerraduraUsuario"; // Asegúrate de la ruta correcta
import { obtenerUltimaReservaActivaCompleta, asociarReservaPorToken } from "../services/reservaService";

const UserHome = () => {
  const [nombre, setNombre] = useState("");
  const [usuarioId, setUsuarioId] = useState(null);
  const [mostrarCerradura, setMostrarCerradura] = useState(false); // <--- NUEVO ESTADO
  const [token, setToken] = useState(""); // <-- NUEVO ESTADO PARA TOKEN
  const [errorToken, setErrorToken] = useState(""); // <-- NUEVO ESTADO PARA ERRORES
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      const usuario = JSON.parse(data);
      setNombre(usuario.nombre);
      setUsuarioId(usuario.id); // Guardamos el ID del usuario
      validarReserva(usuario.id); // <--- NUEVA FUNCIÓN
    }
  }, []);
  
  const handleLogout = () => {
    // Limpia el localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("propietario");
    localStorage.clear(); // Limpia todo el localStorage si es necesario

    // Redirige al usuario a la página principal
    navigate("/");
};

  const validarReserva = async (usuarioId) => {
    try {
      const reserva = await obtenerUltimaReservaActivaCompleta(usuarioId);
      const hoy = new Date();
      const fechaInicio = new Date(reserva.fechaInicio);
      const fechaFin = new Date(reserva.fechaFin);

      if (hoy >= fechaInicio && hoy <= fechaFin) {
        setMostrarCerradura(true); // Está dentro del rango
      } else {
        setMostrarCerradura(false); // Fuera del rango
      }
    } catch (error) {
      console.error("Error al validar la reserva activa:", error.message);
      setMostrarCerradura(false);
    }
  };

  const handleAsociarToken = async () => {
    if (!token) {
      setErrorToken("Introduce un token válido.");
      return;
    }
    try {
      await asociarReservaPorToken(usuarioId, token);
      setErrorToken("");

      await validarReserva(usuarioId); // Volvemos a validar si ahora sí tiene reserva válida

      const reserva = await obtenerUltimaReservaActivaCompleta(usuarioId);
      const hoy = new Date();
      const fechaInicio = new Date(reserva.fechaInicio);
      const fechaFin = new Date(reserva.fechaFin);

      if (hoy < fechaInicio || hoy > fechaFin) {
        // El token era válido pero la reserva está fuera de fecha
        setErrorToken("La reserva está expirada o no es válida en la fecha actual.");
      } else {
        setErrorToken(""); // Todo correcto
      }

      setToken(""); // Limpiar el input
    } catch (error) {
      // Aquí sí es un error real (token no encontrado, backend lanza error 400)
      setErrorToken("Token inválido o ya utilizado.");
    }
  };

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
          <button onClick={handleLogout }>Logout</button>
          </div>
          
        <h1>Bienvenido a IOHOME, {nombre || "usuario"}</h1>

        <p>Gestiona tus reservas y tu alojamiento de forma sencilla.</p>


        <div className="infolock">
          {usuarioId && mostrarCerradura ? (
            <CerraduraUsuario usuarioId={usuarioId} />
          ) : (
            <div className="token-container">
              <p>No tienes una cerradura activa actualmente.</p>
              <div className="token-form">
                <input
                  className="token-input"
                  type="text"
                  placeholder="Introduce tu token de reserva"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <button className="token-button" onClick={handleAsociarToken}>
                  Asociar Reserva
                </button>
              </div>
              {errorToken && <p className="token-error">{errorToken}</p>}
            </div>

          )}
        </div>
      </header >

      <section ref={servicesRef} className="user-services">
        <h2>Servicios</h2>
        <div className="service-buttons">
          <div className="card" onClick={() => navigate("/usuario/perfil")}>
            <span>Perfil y configuración</span>
            <button>GO</button>
          </div>
          <div className="card" onClick={() => navigate("/usuario/CercaDeMi")}>
            <span>Cerca de mí</span>
            <button>GO</button>
          </div>
          <div className="card" onClick={() => navigate("/usuario/alojamiento")}>
            <span>Mi alojamiento</span>
            <button>GO</button>
          </div>
        </div>
      </section>

      <div className="contact-button-container">
        <button className="contact-button" onClick={() => window.location.href = "http://localhost:3000/contact"}>
          📞 Contacta con nosotros
        </button>
      </div>

      <footer className="user-footer">
        © 2025 IOHOME. Todos los derechos reservados
      </footer>
    </div >
  );
};

export default UserHome;
