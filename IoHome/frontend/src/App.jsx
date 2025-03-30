import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthSwitcher from "./components/AuthSwitcher";
import UserHome from "./pages/UserHome";
import OwnerHome from "./pages/OwnerHome";
import GestionPropiedades from "./pages/GestionPropiedades";
import PerfilConfiguracion from "./pages/PerfilConfiguracion";
import GestionReservas from "./pages/GestionReservas"; 
import SecurityLogs from "./pages/SecurityLogs";
import Cerraduras from "./pages/Cerraduras"; 
import UserProfile from "./pages/UserProfile";  // Nueva importación
import MiAlojamiento from "./pages/MiAlojamiento";

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
        <Route path="/propietario/seguridad" element={<SecurityLogs />} /> 
        <Route path="/propietario/cerraduras" element={<Cerraduras />} /> 
        <Route path="/usuario/perfil" element={<UserProfile />} />
        <Route path="/usuario/alojamiento" element={<MiAlojamiento />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
