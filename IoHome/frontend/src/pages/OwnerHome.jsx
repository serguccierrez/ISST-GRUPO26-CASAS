import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importa useNavigate
import "../styles/ownerHome.css";
import CalendarView from "../components/CalendarView";

const OwnerHome = () => {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate(); // 👈 Usa el hook

  useEffect(() => {
    const data = localStorage.getItem("propietario");
    if (data) {
      const propietario = JSON.parse(data);
      setNombre(propietario.nombre);
    }
  }, []);

  return (
    <div className="owner-home">
      <header className="owner-header">
        <h1>Bienvenido a IOHOME, {nombre || "propietario"}</h1>
        <p>Gestiona fácilmente tus propiedades, accesos y reservas desde un solo lugar.</p>
        <CalendarView />
      </header>

      <section className="owner-services">
        <h2>Servicios</h2>
        
        <div className="service-buttons">
          <div className="card" onClick={() => navigate("/propietario/perfil")}>
            <span>Perfil y configuración</span>
            <button>GO</button>
          </div>

          <div className="card">
            <span>Seguridad</span>
            <button onClick={() => alert("Seguridad")}>GO</button>
          </div>
          <div className="card">
            <span>Gestión de usuarios</span>
            <button onClick={() => alert("Usuarios")}>GO</button>
          </div>
          <div className="card">
            <span>Gestión de propiedades</span>
            <button onClick={() => navigate("/propietario/propiedades")}>GO</button> {/* ✅ Aquí navega */}
          </div>
        </div>
      </section>

      <footer className="owner-footer">© 2025 IOHOME. Todos los derechos reservados</footer>
    </div>
  );
};

export default OwnerHome;
