import { useState } from "react";
import { loginUsuario, loginPropietario } from "../services/authService";

const LoginForm = ({ tipo }) => {
  const [correoElectronico, setCorreo] = useState("");
  const [tokenUsuario, setTokenUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (tipo === "usuario") {
        const res = await loginUsuario({ correoElectronico, tokenUsuario });
        alert("Bienvenido usuario: " + res.nombre);
      } else {
        const res = await loginPropietario({ correoElectronico, password });
        alert("Bienvenido propietario: " + res.nombre);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Login {tipo}</h3>
      <input
        type="email"
        placeholder="Email"
        value={correoElectronico}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      {tipo === "usuario" ? (
        <input
          type="number"
          placeholder="Token"
          value={tokenUsuario}
          onChange={(e) => setTokenUsuario(e.target.value)}
          required
        />
      ) : (
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
