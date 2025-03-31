import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Iniciasesion from "./pages/Iniciasesion2";
import Layout from "./Layout"; // Importa el nuevo layout
import "./App.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item" onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">{question}</div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Usa el layout para envolver las rutas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} /> {/* Agrega esta ruta */}
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="iniciasesion" element={<Iniciasesion />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;