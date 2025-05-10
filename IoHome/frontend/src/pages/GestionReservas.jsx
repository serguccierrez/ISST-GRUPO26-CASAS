// GestionReservas.jsx
import { useEffect, useState, useRef } from "react";
import { obtenerReservas, eliminarReserva } from "../services/reservaService";
import ReservaForm from "../components/ReservaForm";
import ModificarReservaForm from "../components/ModificarReservaForm";
import { obtenerPropiedades } from "../services/propiedadService";
import "../styles/gestionReservas.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { eliminarEventoDeGoogleCalendar} from "../services/reservaService";



const GestionReservas = () => {
  const reservasRefs = useRef({}); // Refs dinámicos para cada reserva
  const modifierRef = useRef(null);
  const [reservas, setReservas] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [reservaEdit, setReservaEdit] = useState(null);
  const navigate = useNavigate();

  const scrollToModifyForm2 = () => {
    setTimeout(() => {
      if (modifierRef.current) {
        modifierRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const scrollToReserva = (id) => {
    if (reservasRefs.current[id]) {
      reservasRefs.current[id].scrollIntoView({ behavior: "smooth" });
    }
  };

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
      const reservaAEliminar = reservas.find(r => r.id === id);
      if (reservaAEliminar) {
        await eliminarEventoDeGoogleCalendar(reservaAEliminar);
      }
      await eliminarReserva(id);
      setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
      console.log("Reserva eliminada correctamente");
    } catch (err) {
      console.log("Error al eliminar la reserva: " + err.message);
    }
  };

  const handleEdit = (reserva) => {
    setReservaEdit(reserva);
  };

  const handleCancelEdit = () => {
    setReservaEdit(null);
  };

  const handleUpdate = async () => {
    try {
      // Primero, actualiza la reserva en el backend (si es necesario)
      const propietario = JSON.parse(localStorage.getItem("propietario"));
      await actualizarReserva(reservaEdit.id, reservaEdit);

  
      // Actualizar la lista de reservas
      obtenerReservas(propietario.id)
        .then(setReservas)
        .catch((err) => console.error("Error al obtener reservas", err));
  
      setReservaEdit(null);
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };
  

  

  const handleReservaCreada = (newReservaId) => {
    const propietario = JSON.parse(localStorage.getItem("propietario"));
    obtenerReservas(propietario.id)
      .then((nuevasReservas) => {
        setReservas(nuevasReservas);
        scrollToReserva(newReservaId); // Hacer scroll a la nueva reserva
      })
      .catch((err) => console.error("Error al obtener reservas", err));
  };

  return (
    <div className="gestion-container">
      <div className="navbar" onClick={() => navigate("/propietario")}>
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/propietario")}
        />
        <h3 id="nombre" onClick={() => navigate("/propietario")}>
          IoHome
        </h3>
      </div>
      <h2>Gestionar Reservas</h2>
      <div>
        {reservas.map((reserva) => (
          <div
            key={reserva.id}
            ref={(el) => (reservasRefs.current[reserva.id] = el)} // Asignar ref dinámico
            className="reserva-card"
          >
            <h3>Reserva en {reserva.propiedad?.nombre}</h3>
            <div className="reserva-detalles">
              <p>Dirección: {reserva.propiedad?.direccion}</p>
              {reserva.usuario ? (
                <p>
                  Usuario: {reserva.usuario?.nombre} {reserva.usuario?.apellidos} ({reserva.usuario?.correoElectronico})
                </p>
              ) : (
                <p><strong>Usuario:</strong> No asignado aún</p>
              )}
              <p>Fecha de Inicio: {reserva.fechaInicio}</p>
              <p>Fecha de Fin: {reserva.fechaFin}</p>
              <p>Observaciones: {reserva.observaciones}</p>
              <p><strong>Token de acceso:</strong> {reserva.token || "No disponible"}</p>
            </div>
            <button id="Modificar" onClick={() => { handleEdit(reserva); scrollToModifyForm2(); }}>Modificar</button>
            <button onClick={() => handleEliminar(reserva.id)}>Eliminar</button>
            <hr />
          </div>
        ))}
      </div>
      {reservaEdit && (
        <div ref={modifierRef} className="modificar-reserva">
          <div className="reserva-form">
            <ModificarReservaForm
              reserva={reservaEdit}
              onUpdate={(updatedReservaId) => handleUpdate(updatedReservaId)}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
      <h3>Crear Nueva Reserva</h3>
      <div className="reserva-form">
        <ReservaForm 
          propiedades={propiedades} 
          onReservaCreada={(newReservaId) => handleReservaCreada(newReservaId)} 
        />
      </div>
    </div>
  );
};



export default GestionReservas;
