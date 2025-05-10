import { useEffect, useState } from "react";
import { obtenerUltimaReservaActiva } from "../services/reservaService";
import "../styles/miAlojamiento.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const MiAlojamiento = () => {
  const [reserva, setReserva] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.id) {
      obtenerUltimaReservaActiva(usuario.id)
        .then(setReserva)
        .catch((err) =>
          console.error("Error al obtener la reserva activa", err)
        );
    }
  }, []);

  return (
    <div className="gestion-container">
      <div className="navbar">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/usuario")}
        />
        <h3 id="nombre" onClick={() => navigate("/usuario")}>
          IoHome
        </h3>
      </div>
      <h2>Mi Alojamiento</h2>
      {reserva ? (
        <div className="reserva-card">
          <h3>Alojamiento: {reserva.propiedad?.nombre}</h3>
          <p>Dirección: {reserva.propiedad?.direccion}</p>
          <p>Fecha de Inicio: {reserva.fechaInicio}</p>
          <p>Fecha de Fin: {reserva.fechaFin}</p>
          <p>Observaciones: {reserva.observaciones}</p>
        </div>
      ) : (
        <p>No hay reservas activas en este momento.</p>
      )}
    </div>
  );
};

export default MiAlojamiento;
