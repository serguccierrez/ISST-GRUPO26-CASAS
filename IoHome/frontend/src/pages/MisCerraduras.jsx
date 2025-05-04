import SeamConnect from "../components/SeamConnect";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import '../styles/misCerraduras.css';

const MisCerraduras = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpia el localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("propietario");
    localStorage.clear(); // Limpia todo el localStorage si es necesario

    // Redirige al usuario a la página principal
    navigate("/");
};

return (
    <>
        <div className="gestion-container">
            <div className="navbar" >
                <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/propietario")}/>
                <h3 id="nombre" onClick={() => navigate("/propietario")}>IoHome</h3>
            </div>

            <button onClick={handleLogout}>logout</button>
            
            <h2>Mis cerraduras</h2>
            <SeamConnect/>
        </div>
        
    </>
);

 
};

export default MisCerraduras;
