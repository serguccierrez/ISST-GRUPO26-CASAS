import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ownerHome.css";
import logo from "../assets/logo.png";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { obtenerReservas } from "../services/reservaService";


const localizer = momentLocalizer(moment);

const OwnerHome = () => {
  const [nombre, setNombre] = useState("");
  const [prop, setProp] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    onSuccess: async (tokenResponse) => {
      localStorage.setItem("google_token", tokenResponse.access_token);
      setProp(tokenResponse);
    
      const propietario = JSON.parse(localStorage.getItem("propietario"));
      if (propietario?.id) {
        try {
          // Sincroniza reservas primero
          await sincronizarReservasConCalendar(tokenResponse.access_token, propietario.id);  

    
          // Luego vuelve a cargar los eventos actualizados desde Google Calendar
          const resActualizado = await axios.get(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },              
            }
          );
          setCalendarEvents(resActualizado.data.items);
    
        } catch (err) {
          console.error("Error durante sincronización o carga de eventos", err);
        }
      }
    }       
  });

  const sincronizarReservasConCalendar = async (accessToken, propietarioId) => {
    try {
      const reservas = await obtenerReservas(propietarioId);
  
      const res = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }          
        }
      );
      const eventosExistentes = res.data.items;
  
      for (const reserva of reservas) {
        const yaExiste = eventosExistentes.some(ev =>
          ev.summary === `Reserva: ${reserva.propiedad?.nombre || 'Propiedad'}` &&
          ev.start?.dateTime?.startsWith(reserva.fechaInicio.slice(0, 10)) // o compara fechas completas si quieres más precisión
        );
  
        if (yaExiste) continue; // No insertes si ya está
  
        const inicio = new Date(reserva.fechaInicio).toISOString();
        const fin = new Date(reserva.fechaFin).toISOString();
  
        const evento = {
          summary: `Reserva: ${reserva.propiedad?.nombre || 'Propiedad'}`,
          description: `Check-in: ${reserva.fechaInicio} - Check-out: ${reserva.fechaFin}`,
          start: {
            dateTime: inicio,
            timeZone: 'America/Bogota'
          },
          end: {
            dateTime: fin,
            timeZone: 'America/Bogota'
          }
        };
  
        await axios.post(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          evento,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );
      }
  
      console.log("Reservas sincronizadas sin duplicados ✅");
    } catch (error) {
      console.error("Error al sincronizar reservas:", error);
    }
  };

  
  useEffect(() => {
    const data = localStorage.getItem("propietario");
    if (data) {
      const propietario = JSON.parse(data);
      setNombre(propietario.nombre);
    }
  }, []);

  const formattedEvents = calendarEvents.map(ev => ({
    title: ev.summary,
    start: new Date(ev.start.dateTime || ev.start.date),
    end: new Date(ev.end?.dateTime || ev.start.date),
  }));

  

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const redirigirHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="owner-home">
      <header className="owner-header">
        <div className="navbar">

          <img src={logo} alt="Logo" className="logo" />
          <h3>IoHome</h3>

          <button className="scroll-button" onClick={scrollToServices}>
            Servicios
          </button>

          <button onClick={redirigirHome}>🌐 </button>

        </div>
        <h1>Bienvenido a IOHOME, {nombre || "propietario"}</h1>




        <p>Gestiona fácilmente tus propiedades, accesos y reservas desde un solo lugar.</p>
        <section className="user-calendar">
                <h2>Mi Google Calendar</h2>
                {!prop ? (
                  <button onClick={login}>Conectar con Google</button>
                ) : (
                  <div>
                    
                    <Calendar
                      localizer={localizer}
                      events={formattedEvents}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 600 }}
                    />
                    <button onClick={() => { googleLogout(); setProp(null); }}>Cerrar sesión</button>

                  </div>
                )}
              </section>
      </header>


      <section ref={servicesRef} className="owner-services">
        <h2>Servicios</h2>

        <div className="service-buttons">
          <div className="card" onClick={() => navigate("/propietario/perfil")}>
            <span>Perfil y configuración</span>
            <button>GO</button>
          </div>



          <div className="card">
            <span>Seguridad</span>
            <button onClick={() => navigate("/propietario/seguridad")}>GO</button>
          </div>



          <div className="card">
            <span>Gestión de reservas</span>
            <button onClick={() => navigate("/propietario/reservas")}>GO</button>
          </div>

          <div className="card">
            <span>Gestión de propiedades</span>
            <button onClick={() => navigate("/propietario/propiedades")}>GO</button>
          </div>

          <div className="card">
            <span>Mis cerraduras</span>
            <button onClick={() => navigate("/propietario/cerraduras")}>GO</button>
          </div>

        </div>
      </section>

      <div className="contact-button-container">
        <button className="contact-button" onClick={() => window.location.href = "http://localhost:3000/contact"}>
          📞 Contacta con nosotros
        </button>
      </div>

      <footer className="owner-footer">
        © 2025 IOHOME. Todos los derechos reservados
      </footer>
    </div>
  );
};

export default OwnerHome;
