// Cerraduras.jsx
import { useState, useEffect } from "react";
import { obtenerPropiedades } from "../services/propiedadService";
import "../styles/cerraduras.css";

const Cerraduras = () => {
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        const propietario = JSON.parse(localStorage.getItem("propietario"));
        if (propietario?.id) {
            obtenerPropiedades(propietario.id)
                .then(setPropiedades)
                .catch((err) => console.error("Error al obtener propiedades", err));
        }
    }, []);

    const handleAbrirCerradura = (id) => {
        alert(`Cerradura de la propiedad ${id} abierta.`);
    };

    const handleCerrarCerradura = (id) => {
        alert(`Cerradura de la propiedad ${id} cerrada.`);
    };

    return (
        <div className="cerraduras-container">
            <h2>Cerraduras</h2>
            {propiedades.map((propiedad) => (
                <div key={propiedad.id} className="cerradura-card">
                    <div className="cerradura-info">
                        <h3>{propiedad.nombre}</h3>
                        <p>{propiedad.direccion}</p>
                    </div>
                    <div className="cerradura-actions">
                        <button onClick={() => handleAbrirCerradura(propiedad.id)}>Abrir</button>
                        <button onClick={() => handleCerrarCerradura(propiedad.id)}>Cerrar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cerraduras;
