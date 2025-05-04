const API_BASE = "http://localhost:8080/api/auth";

export const loginUsuario = (data) => fetch(`${API_BASE}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}).then(res => {
  if (!res.ok) throw new Error("Login usuario fallido");
  return res.json();
});

export const loginPropietario = (data) => fetch(`${API_BASE}/login/propietario`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}).then(res => {
  if (!res.ok) throw new Error("Login propietario fallido");
  return res.json();
});

export const registrarUsuario = (data) => fetch(`${API_BASE}/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}).then(res => res.json());

export const logout = () => {
  return fetch("http://localhost:8080/api/auth/logout", {
    method: "POST",
    credentials: "include", // Incluye cookies si usas sesiones
  });
};

export const registrarPropietario = (data) => fetch(`${API_BASE}/register/propietario`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}).then(res => res.json());
