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
    
    <section className="form-container mt-8 w-[85%] mx-auto">
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Formulario de Contacto
      </h2>
      <form
        className="flex flex-wrap gap-6"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
>
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
      <label style={{ fontWeight: "bold", color: "#333", textAlign: "left" }}>
        Nombre <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        placeholder="Escribe tu nombre"
        style={{
          padding: "10px",
          fontSize: "1rem",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
        }}
      />
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
      <label style={{ fontWeight: "bold", color: "#333", textAlign: "left" }}>
        Correo electrónico <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        placeholder="Escribe tu correo electrónico"
        style={{
          padding: "10px",
          fontSize: "1rem",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
        }}
      />
    </div>  

    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
      <label style={{ fontWeight: "bold", color: "#333", textAlign: "left" }}>
        Teléfono <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        placeholder="Escribe tu teléfono"
        style={{
          padding: "10px",
          fontSize: "1rem",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
        }}
      />
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
      <label style={{ fontWeight: "bold", color: "#333", textAlign: "left" }}>
        Ciudad <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        placeholder="Escribe la ciudad del apartamento"
        style={{
          padding: "10px",
          fontSize: "1rem",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
        }}
      />
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
      <label style={{ fontWeight: "bold", color: "#333", textAlign: "left" }}>
        ¿Cómo podemos ayudarte? <span style={{ color: "red" }}>*</span>
      </label>
      <textarea
        placeholder="Escribe tu mensaje aquí"
        style={{
          padding: "10px",
          fontSize: "1rem",
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid #ccc",
          borderRadius: "5px",
          height: "120px", // Ajusta la altura del cuadro de texto
          resize: "vertical", // Permite que el usuario lo agrande si quiere
          fontFamily: "Arial, sans-serif",
        }}
      ></textarea>
    </div>

    <button
      type="button"
      className="btn-submit"
      style={{
        padding: "10px 20px",
        fontSize: "1.2rem",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        alignSelf: "center",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
    >
      Enviar
    </button>
  </form>
</section>

      
  </main>
);

export default Contact;