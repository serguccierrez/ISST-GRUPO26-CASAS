import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthSwitcher from "./components/AuthSwitcher";
import UserHome from "./pages/UserHome";
import OwnerHome from "./pages/OwnerHome";
import GestionPropiedades from "./pages/GestionPropiedades";
import PerfilConfiguracion from "./pages/PerfilConfiguracion";
import GestionReservas from "./pages/GestionReservas"; 
import MisCerraduras from "./pages/MisCerraduras";
import UnaCerradura from "./pages/UnaCerradura";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthSwitcher />} />
        <Route path="/inicio-usuario" element={<UserHome />} />
        <Route path="/inicio-propietario" element={<OwnerHome />} />
        <Route path="/propietario/propiedades" element={<GestionPropiedades />} />
        <Route path="/propietario/perfil" element={<PerfilConfiguracion />} />
        <Route path="/propietario/reservas" element={<GestionReservas />} /> 
        <Route path="/propietario/cerraduras" element={<MisCerraduras />} />
        <Route path="/cerradura/:id" element={<UnaCerradura />} />
      </Routes>
    </Router>
  );
}

export default App;
