import { useState } from "react";
import { registrarUsuario, registrarPropietario } from "../services/authService";

const RegisterForm = ({ tipo }) => {
  const [form, setForm] = useState({
    nombre: "", apellidos: "", dni: "", correoElectronico: "", telefono: "",
    ...(tipo === "usuario" ? { tokenUsuario: "" } : { password: "" })
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (tipo === "usuario") {
        await registrarUsuario(form);
        alert("Usuario registrado correctamente");
      } else {
        await registrarPropietario(form);
        alert("Propietario registrado correctamente");
      }
    } catch (err) {
      alert("Error al registrar: " + err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Registrar {tipo}</h3>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="apellidos" placeholder="Apellidos" onChange={handleChange} required />
      <input name="dni" placeholder="DNI" onChange={handleChange} required />
      <input name="correoElectronico" type="email" placeholder="Correo" onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
      {tipo === "usuario" ? (
        <input name="tokenUsuario" type="number" placeholder="Token" onChange={handleChange} required />
      ) : (
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
      )}
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;
