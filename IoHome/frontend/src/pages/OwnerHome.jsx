import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ownerHome.css";
import CalendarView from "../components/CalendarView";
import logo from "../assets/logo.png";

const OwnerHome = () => {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("propietario");
    if (data) {
      const propietario = JSON.parse(data);
      setNombre(propietario.nombre);
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
    <div className="owner-home">
      <header className="owner-header">
        <div className="navbar">
          <img src={logo} alt="Logo" className="logo" />
          <h3>IoHome</h3>
          <button className="scroll-button" onClick={scrollToServices}>
            Nuestros Servicios
          </button>
        </div>
        <h1>Bienvenido a IOHOME, {nombre || "propietario"}</h1>

        <div className="home-button">
        <button onClick={redirigirHome}>🌐  Accede a nuestra Página Web</button>
      </div>


        <p>Gestiona fácilmente tus propiedades, accesos y reservas desde un solo lugar.</p>
        <CalendarView />
      </header>


      <section ref={servicesRef} className="owner-services">
        <h2>Servicios</h2>

        <div className="service-buttons">
          <div className="card" onClick={() => navigate("/propietario/perfil")}>
            <span>Perfil y configuración</span>
            <button>GO</button>
          </div>



          <div className="card">
            <span>Seguridad</span>
            <button onClick={() => navigate("/propietario/seguridad")}>GO</button>
          </div>



          <div className="card">
            <span>Gestión de reservas</span>
            <button onClick={() => navigate("/propietario/reservas")}>GO</button>
          </div>

          <div className="card">
            <span>Gestión de propiedades</span>
            <button onClick={() => navigate("/propietario/propiedades")}>GO</button>
          </div>

          <div className="card">
            <span>Mis cerraduras</span>
            <button onClick={() => navigate("/propietario/cerraduras")}>GO</button>
          </div>

        </div>
      </section>

      <footer className="owner-footer">
        © 2025 IOHOME. Todos los derechos reservados
      </footer>
    </div>
  );
};

export default OwnerHome;
