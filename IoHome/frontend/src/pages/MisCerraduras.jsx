import SeamConnect from "../components/SeamConnect";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import '../styles/misCerraduras.css';

const MisCerraduras = () => {
  const navigate = useNavigate();

return (
    <>
        <div className="gestion-container">
            <div className="navbar" >
                <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/inicio-propietario")}/>
                <h3 id="nombre" onClick={() => navigate("/inicio-propietario")}>IoHome</h3>
            </div>
            <h2>Mis cerraduras</h2>
            <SeamConnect />
        </div>
        
    </>
);

 
};

export default MisCerraduras;
