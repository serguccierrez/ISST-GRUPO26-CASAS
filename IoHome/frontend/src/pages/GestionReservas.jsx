// GestionReservas.jsx
import { useEffect, useState } from "react";
import { obtenerReservas, eliminarReserva } from "../services/reservaService";
import ReservaForm from "../components/ReservaForm";
import ModificarReservaForm from "../components/ModificarReservaForm";
import { obtenerPropiedades } from "../services/propiedadService";
import "../styles/gestionReservas.css";

const GestionReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [propiedades, setPropiedades] = useState([]);
    const [reservaEdit, setReservaEdit] = useState(null);

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

    const handleEliminar = async (id) => {
        try {
            await eliminarReserva(id);
            setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
            alert("Reserva eliminada correctamente");
        } catch (err) {
            alert("Error al eliminar la reserva: " + err.message);
        }
    };

    const handleEdit = (reserva) => {
        setReservaEdit(reserva);
    };

    const handleCancelEdit = () => {
        setReservaEdit(null);
    };

    const handleUpdate = () => {
        const propietario = JSON.parse(localStorage.getItem("propietario"));
        obtenerReservas(propietario.id)
            .then(setReservas)
            .catch((err) => console.error("Error al obtener reservas", err));
        setReservaEdit(null);
    };

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
                        <button onClick={() => handleEdit(reserva)}>Modificar</button>
                        <button onClick={() => handleEliminar(reserva.id)}>Eliminar</button>
                        <hr />
                    </div>
                ))}
            </div>
            {reservaEdit && (
                <div className="reserva-form">
                    <ModificarReservaForm 
                        reserva={reservaEdit} 
                        onUpdate={handleUpdate} 
                        onCancel={handleCancelEdit} 
                    />
                </div>
            )}
            <h3>Crear Nueva Reserva</h3>
            <div className="reserva-form">
                <ReservaForm propiedades={propiedades} />
            </div>
        </div>
    );
};

export default GestionReservas;
