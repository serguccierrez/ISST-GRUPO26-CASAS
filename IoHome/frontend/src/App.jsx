import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthSwitcher from "./components/AuthSwitcher";
import UserHome from "./pages/UserHome";
import OwnerHome from "./pages/OwnerHome";
import GestionPropiedades from "./pages/GestionPropiedades";
import PerfilConfiguracion from "./pages/PerfilConfiguracion";
import GestionReservas from "./pages/GestionReservas";

import MisCerraduras from "./pages/MisCerraduras";
import UnaCerradura from "./pages/UnaCerradura";

import SecurityLogs from "./pages/SecurityLogs";
import UserProfile from "./pages/UserProfile"; // Nueva importación
import MiAlojamiento from "./pages/MiAlojamiento";
import CercaDeMi from "./pages/CercaDeMi"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthSwitcher />} />
        <Route path="/inicio-usuario" element={<UserHome />} />
        <Route path="/inicio-propietario" element={<OwnerHome />} />
        <Route
          path="/propietario/propiedades"
          element={<GestionPropiedades />}
        />
        <Route path="/propietario/perfil" element={<PerfilConfiguracion />} />
        <Route path="/propietario/reservas" element={<GestionReservas />} />
        <Route path="/propietario/cerraduras" element={<MisCerraduras />} />
        <Route path="/cerradura/:id" element={<UnaCerradura />} />
        <Route path="/propietario/seguridad" element={<SecurityLogs />} />
        <Route path="/usuario/perfil" element={<UserProfile />} />
        <Route path="/usuario/alojamiento" element={<MiAlojamiento />} />
        <Route path="/usuario/CercaDeMi" element={<CercaDeMi />} />{" "}
        {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
