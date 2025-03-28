import "../styles/home.css";

const OwnerHome = () => {
  return (
    <div className="home-container">
      <h2>¡Bienvenido a IOHOME, propietario!</h2>
      <p>Esta es tu página de inicio.</p>
      <button onClick={() => alert("Redirigiendo a gestión de propiedades")}>
        Gestionar propiedades
      </button>
      <button onClick={() => alert("Redirigiendo a accesos")}>
        Gestionar accesos
      </button>
      <button onClick={() => alert("Redirigiendo a reservas")}>
        Ver reservas
      </button>
    </div>
  );
};

export default OwnerHome;
