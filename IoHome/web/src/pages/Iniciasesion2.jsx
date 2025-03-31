import React from "react";

const Iniciasesion = () => (
  <main>
    <div>
      <h2 style={{fontSize: "2rem", marginBottom: "1rem", marginTop: "0rem"}}>
        Inicia sesion/Registrate
      </h2>
      <p style={{ fontSize: "1.15rem" }}>
        Inicia sesión en tu cuenta de IoHome para acceder a todas nuestras funciones y servicios. Si aún no tienes una cuenta, puedes registrarte fácilmente.
      </p>
      <p style={{ fontSize: "1.15rem" }}>
        Podrás gestionar tus reservas, abrir las cerraduras de tu apartamento cuando estes cerca, recibir soporte técnico y mucho más. 
        </p>
      <p style={{ fontSize: "1.3rem" }}>
        ¡Bienvenido a la familia IoHome!
      </p>
      
    </div>

    <section className="form-container mt-8 w-[85%] mx-auto">
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Inicia Sesión
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
        Código postal <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        placeholder="Escribe tu código postal"
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
      Iniciar sesión
    </button>
    <button
    type="button"
    style={{
      marginTop: "10px",
      fontSize: "1rem",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      textDecoration: "underline",
      alignSelf: "flex-end", // Alinea el botón al lado derecho del formulario
    }}
    onClick={() => alert("Redirigiendo a la página de recuperación de contraseña...")}
    > He olvidado mi contraseña
  </button>
  </form>
</section>

    
  </main>
);

export default Iniciasesion;
