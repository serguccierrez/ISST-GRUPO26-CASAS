import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthSwitcher from "./components/AuthSwitcher";
import UserHome from "./pages/UserHome";
import OwnerHome from "./pages/OwnerHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthSwitcher />} />
        <Route path="/inicio-usuario" element={<UserHome />} />
        <Route path="/inicio-propietario" element={<OwnerHome />} />
      </Routes>
    </Router>
  );
}

export default App;
