import React from "react";

const Contact = () => (
  <main>
    <div className="text-container">
      <h1>Contáctanos</h1>
      <p style={{ fontSize: "1.15rem" }}>
        ¿Tienes dudas o necesitas ayuda? Nuestro equipo está aquí para asistirte. Contáctanos a través de nuestro formulario o correo electrónico y te responderemos lo antes posible.
      </p>
    </div>

    <section className="flex items-center justify-between mt-8 w-[85%] mx-auto">
      <img src="/images/contact.png" alt="Soporte" className="image-style" />
      <div className="text-container">
        <h1>Soporte rápido y confiable</h1>
        <p style={{ fontSize: "1.15rem" }}>
          Estamos comprometidos a brindarte el mejor servicio. Aprende cómo configurar tus cerraduras inteligentes y aprovecha al máximo nuestras soluciones para un hogar más seguro y conectado.
        </p>
        <h2>soporte@iohome.com</h2>
      </div>
    </section>

    <section className="form-container" style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem", overflowY: "hidden", }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Formulario de Contacto
      </h2>

      {/* Aquí se reemplaza el formulario de contacto original por el Google Form usando iframe */}
      <iframe
  src="https://forms.gle/fGFMT6RzrJ25QYzV7"
  width="100%"
  height="800"
  frameBorder="0"
  marginHeight="0"
  marginWidth="0"
  scrolling="yes" // esto ayuda a quitar el scroll en navegadores antiguos
  title="Formulario de contacto"
  style={{
    maxWidth: "800px",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    
  }}
>
  Cargando…
</iframe>
    </section>
  </main>
);

export default Contact;
