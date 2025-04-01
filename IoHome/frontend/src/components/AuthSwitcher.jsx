import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../assets/logo.jpg"; 




const AuthSwitcher = () => {
  const [tipo, setTipo] = useState("usuario"); // "usuario" o "propietario"
  const [vista, setVista] = useState("login"); // "login" o "register"

  const cambiarTipo = (nuevoTipo) => {
    setTipo(nuevoTipo);
    setVista("login");
  };

  const redirigirHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
  
    <div className="auth-container">
      <div className="auth-header">
        <img src={logo} alt="Logo" id="logo-header" />
        <h1>IoHome</h1>
      </div>
      <div>
        <h2>¡Bienvenido!</h2>
      </div>
      
      <div className="home-button">
        <button onClick={redirigirHome}>🌐  Accede a nuestra Página Web</button>
      </div>

    
      <div className="switch-buttons">
        <button onClick={() => cambiarTipo("usuario")}>👤 Huésped</button>
        <button onClick={() => cambiarTipo("propietario")}>🏠 Propietario</button>
      </div>

      {vista === "login" ? (
        <>
          <LoginForm tipo={tipo} />
          <div className="registro-links">
            <button onClick={() => setVista("register")}>Registrar {tipo}</button>
          </div>
        </>
      ) : (
        <>
          <RegisterForm tipo={tipo} />
          <div className="registro-links">
            <button onClick={() => setVista("login")}>Volver al login</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthSwitcher;
