// ModificarReservaForm.jsx
import { useState, useEffect } from "react";
import { actualizarReserva, obtenerUsuarioPorCorreo } from "../services/reservaService";
import { obtenerPropiedades } from "../services/propiedadService";

// Formato correcto de fecha: yyyy-MM-dd HH:mm:ss
const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const ModificarReservaForm = ({ reserva, onUpdate, onCancel }) => {
    //const [correoUsuario, setCorreoUsuario] = useState(reserva.usuario?.correoElectronico);
    const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(reserva.propiedad?.id);
    const [fechaInicio, setFechaInicio] = useState(reserva.fechaInicio);
    const [fechaFin, setFechaFin] = useState(reserva.fechaFin);
    const [observaciones, setObservaciones] = useState(reserva.observaciones);
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        const propietario = JSON.parse(localStorage.getItem("propietario"));
        if (propietario?.id) {
            obtenerPropiedades(propietario.id)
                .then(setPropiedades)
                .catch((err) => console.error("Error al obtener propiedades", err));
        }

        const fetchCerraduras = async () => {
            try {
                const propiedadesData = await obtenerPropiedades(propietario.id);
                setPropiedades(propiedadesData);
            } catch (error) {
                console.error("Error al obtener propiedades:", error);
            }
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Obtener el ID del usuario a partir del correo ingresado
            //const usuario = await obtenerUsuarioPorCorreo(correoUsuario);
            //const usuarioId = usuario.id;

            const reservaActualizada = {
                fechaInicio: formatFecha(fechaInicio),
                fechaFin: formatFecha(fechaFin),
                observaciones,
            };

            await actualizarReserva(reserva.id, reservaActualizada);
            console.log("Reserva actualizada con éxito");
            onUpdate();
        } catch (err) {
            console.log("Error al actualizar la reserva: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Modificar Reserva</h3>

            <label>Propiedad:</label>
            <select
                value={propiedadSeleccionada}
                onChange={(e) => setPropiedadSeleccionada(e.target.value)}
                required
            >
                <option value="">Seleccione una propiedad</option>
                {propiedades.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                        {prop.nombre} - {prop.direccion}
                    </option>
                ))}
            </select>

            <label>Fecha de Inicio:</label>
            <input
                type="datetime-local"
                value={new Date(fechaInicio).toISOString().slice(0, 16)}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
            />
            <label>Fecha de Fin:</label>
            <input
                type="datetime-local"
                value={new Date(fechaFin).toISOString().slice(0, 16)}
                onChange={(e) => setFechaFin(e.target.value)}
                required
            />
            <label>Observaciones:</label>
            <input
                type="text"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
            />
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default ModificarReservaForm;
