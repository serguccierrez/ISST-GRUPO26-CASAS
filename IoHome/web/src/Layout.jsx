import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";

const redirigirHome = () => {
  window.location.href = "http://localhost:5173/";
};

const Layout = () => (
  <div>
    {/* Header común */}
    <header className="header">
      <div className="header-left">
        <img src="/images/logo.jpg" alt="IoHome Logo" className="logo" />
        <h1 className="site-name">IoHome</h1>
      </div>
      <nav className="header-center">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/services" className="nav-link">Servicios</Link>
        <Link to="/about" className="nav-link">Nosotros</Link>
        <Link to="/contact" className="nav-link">Contacto</Link>
      </nav>
      
      <div className="home-button">
        <button onClick={redirigirHome}>🌐  Accede a nuestra Aplicación</button>
      </div>
    </header>

    {/* Contenido dinámico */}
    <main>
      <Outlet />
    </main>

    {/* Footer común */}
    <footer>
      <p>2025 IoHome reserved</p>
    </footer>
  </div>
);

export default Layout;