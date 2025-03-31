import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario, loginPropietario } from "../services/authService";

const LoginForm = ({ tipo }) => {
  const navigate = useNavigate();
  const [correoElectronico, setCorreo] = useState("");
  const [tokenUsuario, setTokenUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (tipo === "usuario") {
        const res = await loginUsuario({ correoElectronico, tokenUsuario });
        localStorage.setItem("usuario", JSON.stringify(res));
        //alert("Bienvenido usuario: " + res.nombre);
        navigate("/inicio-usuario");
      } else {
        const res = await loginPropietario({ correoElectronico, password });
        localStorage.setItem("propietario", JSON.stringify(res)); 
        //alert("Bienvenido propietario: " + res.nombre);
        navigate("/inicio-propietario");
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
