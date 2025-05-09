import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario, loginPropietario } from "../services/authService";

const LoginForm = ({ tipo }) => {
  const navigate = useNavigate();
  const [correoElectronico, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpia errores anteriores
    try {
      if (tipo === "usuario") {
        const res = await loginUsuario({ correoElectronico, password });
        localStorage.setItem("usuario", JSON.stringify(res));
        navigate("/usuario");
      } else {
        const res = await loginPropietario({ correoElectronico, password });
        localStorage.setItem("propietario", JSON.stringify(res));
        navigate("/propietario");
      }
    } catch (err) {
      setError("Error: " + err.message);
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
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Iniciar sesión</button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
