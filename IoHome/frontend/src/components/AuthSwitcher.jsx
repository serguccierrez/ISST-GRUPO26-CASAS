import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthSwitcher = () => {
  const [tipo, setTipo] = useState("usuario"); // "usuario" o "propietario"
  const [vista, setVista] = useState("login"); // "login" o "register"

  const cambiarTipo = (nuevoTipo) => {
    setTipo(nuevoTipo);
    setVista("login");
  };

  return (
    <div className="auth-container">
      <div className="switch-buttons">
        <button onClick={() => cambiarTipo("usuario")}>👤 Usuario</button>
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
