import React from "react";

const Services = () => (
  <div className="text-container">
    <h1>Nuestros servicios</h1>
    <p style={{ fontSize: "1.15rem" }}>
      En IoHome, ofrecemos una variedad de servicios diseñados para hacer tu hogar más inteligente y eficiente. Nuestro objetivo es brindarte soluciones tecnológicas que se adapten a tus necesidades.
    </p>
    <ul style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
      <li><strong>Registro de propiedades:</strong> Si eres propietario podras registar todas tus propiedades en un mismo lugar, ver de un vistazo su estado actual, y añadir detalles e informacion para cada una de ellas.</li>
      <li><strong>Programacion de acceso:</strong> El acceso se podra configurar para que tanto huespeds como propierarios puedan desbloquear la cerradura previamente configurado el acceso.</li>
      <li><strong>Asistencia técnica:</strong> Instalación, configuración y soporte para todos nuestros productos.</li>
      <li><strong>Integración con cerradura Nuki:</strong> Conexion e integracion con una de las cerraduras lideres del sector.</li>
      <li><strong>Aplicacion a gran escala:</strong> Te ayudamos a diseñar la solución perfecta para tu hogar.</li>
    </ul>



        {/* Mapa interactivo con el tiempo meteorológico */}
        <div style={{ marginTop: "20px" }}>
      <h2>Mapa interactivo del tiempo en España</h2>
      <iframe
        width="100%"
        height="450"
        src="https://embed.windy.com/embed2.html?lat=40.4168&lon=-3.7038&detailLat=40.4168&detailLon=-3.7038&width=650&height=450&zoom=5&level=surface&overlay=rain&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
        frameBorder="0"
        title="Mapa del tiempo en España"
      ></iframe>
    </div>


    <div style={{ marginTop: "40px" }}>
  <h2>Últimas Noticias</h2>
  <ul style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
    <li><a href="/blog/1" style={{ textDecoration: "none", color: "#007bff" }}>Cómo IoHome está revolucionando la gestión de propiedades</a></li>
    <li><a href="/blog/2" style={{ textDecoration: "none", color: "#007bff" }}>5 consejos para mejorar la seguridad de tu hogar</a></li>
    <li><a href="/blog/3" style={{ textDecoration: "none", color: "#007bff" }}>Las mejores cerraduras inteligentes del mercado</a></li>
  </ul>
</div>


<div style={{ marginTop: "40px", textAlign: "center" }}>
  <h2>Hora Actual en España</h2>
  <p style={{ fontSize: "1.5rem" }}>{new Date().toLocaleTimeString("es-ES", { timeZone: "Europe/Madrid" })}</p>
</div>

    <div style={{ marginTop: "40px" }}>
  <h2>Galería de Imágenes</h2>
  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
    <img src="/images/service1.jpg" alt="Servicio 1" style={{ width: "30%", borderRadius: "8px" }} />
    <img src="/images/service2.jpg" alt="Servicio 2" style={{ width: "30%", borderRadius: "8px" }} />
    <img src="/images/service3.jpg" alt="Servicio 3" style={{ width: "30%", borderRadius: "8px" }} />
  </div>
</div>

    <p style={{ fontSize: "1.15rem" }}>
      ¿Tienes dudas o necesitas ayuda? Nuestro equipo está aquí para asistirte. Contáctanos a través de nuestro formulario o correo electrónico y te responderemos lo antes posible.
    </p>

    <div style={{ marginTop: "40px" }}>
  <h2>Testimonios de nuestros clientes</h2>
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <blockquote style={{ fontStyle: "italic", borderLeft: "4px solid #007bff", paddingLeft: "10px" }}>
      "IoHome ha transformado la manera en que gestiono mis propiedades. ¡Altamente recomendado!"
      <br />
      <strong>- Beatriz Fernandez</strong>
    </blockquote>
    <blockquote style={{ fontStyle: "italic", borderLeft: "4px solid #007bff", paddingLeft: "10px" }}>
      "Gracias a IoHome, ahora puedo controlar el acceso a mi hogar de manera segura y eficiente."
      <br />
      <strong>- Ana Virginia</strong>
    </blockquote>
    <blockquote style={{ fontStyle: "italic", borderLeft: "4px solid #007bff", paddingLeft: "10px" }}>
      "En mis 10 años que llevo gestionando propiedades, por fin encuentro un servicio que me proporciona todo lo que necesito."
      <br />
      <strong>- J.R. Montejo Garai</strong>
    </blockquote>
  </div>
</div>
    
  </div>
);

export default Services;