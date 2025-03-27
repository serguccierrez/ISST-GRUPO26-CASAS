import "../styles/home.css";

const UserHome = () => {
  return (
    <div className="home-container">
      <h2>¡Bienvenido a IOHOME, usuario!</h2>
      <p>Esta es tu página de inicio.</p>
      <button onClick={() => alert("Te llevará a Perfil y configuración")}>
        Perfil y configuración
      </button>
      <button onClick={() => alert("Te llevará a Cerca de mí")}>Cerca de mí</button>
      <button onClick={() => alert("Te llevará a Mi alojamiento")}>Mi alojamiento</button>
    </div>
  );
};

export default UserHome;
