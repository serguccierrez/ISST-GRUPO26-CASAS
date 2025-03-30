import { useEffect, useState } from "react";
import RegistrarPropiedad from "../components/RegistrarPropiedad";
import "../styles/gestionPropiedades.css";
import logo from "../assets/logo.png"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import WorkspaceInfo from "../components/workSpace";


const GestionPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const propietario = JSON.parse(localStorage.getItem("propietario"));
    if (propietario?.id) {
      fetch(`http://localhost:8080/api/propiedades/propietario/${propietario.id}`)
        .then((res) => res.json())
        .then(setPropiedades)
        .catch((err) => console.error("Error al obtener propiedades", err));
    }
  }, []);

  const handlePropertyCreated = (newProperty) => {
    setPropiedades((prev) => [...prev, newProperty]);
  };

  return (
    <div className="gestion-container">
       <div className="navbar" onClick={() => navigate("/inicio-propietario")}>
                <img src={logo} alt="Logo" className="logo" />
                <h3>IoHome</h3>
        </div>
      <h2>Mis propiedades</h2>
      {propiedades.map((p, index) => (
        <div key={p.id} className="propiedad-card">
          <h3>{index + 1}. {p.direccion}</h3>
          <div className="detalles">
            <ul>
              <li>{p.habitaciones} habitaciones</li>
              <li>{p.banos} baños</li>
              {p.aireAcondicionado && <li>Aire acondicionado</li>}
              {p.cocinaEquipada && <li>Cocina equipada</li>}
              {p.secador && <li>Secador</li>}
              {p.plancha && <li>Plancha</li>}
              {p.cafetera && <li>Cafetera</li>}
              {p.toallasYSabanas && <li>Toallas y sábanas</li>}
              {p.piscina && <li>Piscina</li>}
              {p.garaje && <li>Garaje</li>}
            </ul>
            <p><strong>Normas:</strong> {p.normas || "No especificadas"}</p>
          </div>
        </div>
      ))}
      <RegistrarPropiedad onPropertyCreated={handlePropertyCreated} />

      <WorkspaceInfo />
    </div>
  );
};

export default GestionPropiedades;
