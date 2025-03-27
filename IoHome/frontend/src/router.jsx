// src/router.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomeUsuario from "./pages/UserHome";
import HomePropietario from "./pages/HomePropietario";

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/usuario/home" element={<HomeUsuario />} />
      <Route path="/propietario/home" element={<HomePropietario />} />
    </Routes>
  </Router>
);
