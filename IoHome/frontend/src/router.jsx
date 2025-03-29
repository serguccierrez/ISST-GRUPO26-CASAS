import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomeUsuario from "./pages/UserHome";
import HomePropietario from "./pages/OwnerHome";
import PerfilConfiguracion from "./pages/PerfilConfiguracion";
import GestionPropiedades from "./pages/GestionPropiedades";

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/usuario/home" element={<HomeUsuario />} />
      <Route path="/propietario/home" element={<HomePropietario />} />
      <Route path="/propietario/perfil" element={<PerfilConfiguracion />} />
      <Route path="/propietario/propiedades" element={<GestionPropiedades />} />
    </Routes>
  </Router>
);
