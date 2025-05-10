// ReservaForm.jsx
import { useState } from "react";
import { crearReserva, obtenerUsuarioPorCorreo } from "../services/reservaService";


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


const ReservaForm = ({ propiedades, onReservaCreada }) => {
    //const [correoUsuario, setCorreoUsuario] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [propiedadSeleccionada, setPropiedadSeleccionada] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Obtener el ID del usuario a partir del correo
            //const usuario = await obtenerUsuarioPorCorreo(correoUsuario);
            //const usuarioId = usuario.id;
    
            // Crear el objeto reserva con los datos necesarios
            const reserva = {
                fechaInicio: formatFecha(fechaInicio),
                fechaFin: formatFecha(fechaFin),
                observaciones,
            };
            console.log("Reserva a crear:", reserva);
    
            // Llamar al servicio para crear la reserva
            await crearReserva(propiedadSeleccionada, reserva);
            if (onReservaCreada) {
                onReservaCreada(); // Llama al callback
              }
              
            alert("Reserva creada con éxito");
        } catch (err) {
            console.log("Error al crear la reserva: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
            />
            <label>Fecha de Fin:</label>
            <input
                type="datetime-local"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
            />
            <label>Observaciones:</label>
            <input
                type="text"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
            />
            <button type="submit">Crear Reserva</button>
        </form>
    );
};

export default ReservaForm;
