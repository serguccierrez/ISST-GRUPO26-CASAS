import { useEffect, useState } from "react";
import RegistrarPropiedad from "../components/RegistrarPropiedad";
import ModificarPropiedad from "../components/ModificarPropiedad";
import { obtenerPropiedades, eliminarPropiedad, actualizarPropiedad } from "../services/propiedadService";
import "../styles/gestionPropiedades.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import WorkspaceInfo from "../components/SeamConnect";

const GestionPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadEdit, setPropiedadEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const propietario = JSON.parse(localStorage.getItem("propietario"));
    if (propietario?.id) {
      obtenerPropiedades(propietario.id)
        .then(setPropiedades)
        .catch((err) => console.error("Error al obtener propiedades", err));
    }
  }, []);

  const handlePropertyCreated = (newProperty) => {
    setPropiedades((prev) => [...prev, newProperty]);
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarPropiedad(id);
      setPropiedades((prev) => prev.filter((p) => p.id !== id));
      //alert("Propiedad eliminada correctamente");
    } catch (err) {
      alert("Error al eliminar la propiedad: " + err.message);
    }
  };

  const handleUpdate = async (propiedad) => {
    try {
      await actualizarPropiedad(propiedad.id, propiedad);
      setPropiedades((prev) =>
        prev.map((p) => (p.id === propiedad.id ? propiedad : p))
      );
      setPropiedadEdit(null);
      //alert("Propiedad actualizada correctamente");
    } catch (err) {
      alert("Error al actualizar la propiedad: " + err.message);
    }
  };

  return (
    <div className="gestion-container">

       <div className="navbar" >
                <img src={logo} alt="Logo" className="logo" onClick={() => navigate("/inicio-propietario")}/>
                <h3 id="nombre" onClick={() => navigate("/inicio-propietario")} >IoHome</h3>
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
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
            <button onClick={() => setPropiedadEdit(p)}>Modificar</button>
          </div>
        </div>
      ))}

      {propiedadEdit && (
        <ModificarPropiedad
          propiedad={propiedadEdit}
          onUpdate={handleUpdate}
          onCancel={() => setPropiedadEdit(null)}
        />
      )}

      <RegistrarPropiedad onPropertyCreated={handlePropertyCreated} />
    </div>
  );
};

export default GestionPropiedades;
