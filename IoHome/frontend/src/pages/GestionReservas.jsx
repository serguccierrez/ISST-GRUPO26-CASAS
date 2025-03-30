// GestionReservas.jsx
import { useEffect, useState } from "react";
import { obtenerReservas } from "../services/reservaService";
import ReservaForm from "../components/ReservaForm";
import { obtenerPropiedades } from "../services/propiedadService";
import "../styles/gestionReservas.css";

const GestionReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        const propietario = JSON.parse(localStorage.getItem("propietario"));
        if (propietario?.id) {
            obtenerReservas(propietario.id)
                .then(setReservas)
                .catch((err) => console.error("Error al obtener reservas", err));

            obtenerPropiedades(propietario.id)
                .then(setPropiedades)
                .catch((err) => console.error("Error al obtener propiedades", err));
        }
    }, []);

    return (
        <div className="gestion-container">
            <h2>Gestionar Reservas</h2>
            <div>
                {reservas.map((reserva) => (
                    <div key={reserva.id} className="reserva-card">
                        <h3>Reserva en {reserva.propiedad?.nombre}</h3>
                        <div className="reserva-detalles">
                            <p>Dirección: {reserva.propiedad?.direccion}</p>
                            <p>Usuario: {reserva.usuario?.nombre} {reserva.usuario?.apellidos} ({reserva.usuario?.correoElectronico})</p>
                            <p>Fecha de Inicio: {reserva.fechaInicio}</p>
                            <p>Fecha de Fin: {reserva.fechaFin}</p>
                            <p>Observaciones: {reserva.observaciones}</p>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <h3>Crear Nueva Reserva</h3>
            <div className="reserva-form">
                <ReservaForm propiedades={propiedades} />
            </div>
        </div>
    );
};

export default GestionReservas;
