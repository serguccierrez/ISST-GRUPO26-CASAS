
import React, { useState } from "react"; // Import useState

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item" onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">{question}</div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const Home = () => (
  <main>
    <div className="content-container" >
    <main>
    <section className="text-container">
      <h2 style={ {fontSize: "2.5rem"}}>Bienvenido a nuestro portal web</h2>
      <p style={{ fontSize: "1.25rem" }}>
        En IoHome podras encontrar soluciones para la gestion de cerraduras inteligentes y la domotica en tu hogar. 
        Ya seas propietario o tengas una finalidad distinta,en IoHome encontraras la solucion que necesitas. 
        Gracias a IoHome, contarás con todas las herramientas necesarias para lograr una automatización completa en la gestión de tu alojamiento turístico.
      </p>
    </section>

      <section className="flex items-center justify-between mt-8 w-[85%] mx-auto">
        <img src="/images/register.png" alt="Registro" className="image-style" />
        <div className="text-container">
          <h1>Registro facil y sencillo con nuestra app movil</h1>
          <p style={{ fontSize: "1.15rem" }}>
            Aprende cómo registrar tu cuenta y configurar tus dispositivos inteligentes para un hogar más seguro y eficiente. En nuestra
            aplicación podrás gestionar tus accesos programados y conocer mas informacion sobre tus reservas.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-between mt-8 w-[85%] mx-auto">

        <div className="text-container">
          <h1>Acceso controlado en tiempo real a cualquier cerradura configurada</h1>
          <p style={{ fontSize: "1.15rem" }}>
            Una vez tengas acceso a la aplicacion movil, podras gestionar tus accesos programados y conocer mas informacion sobre tus reservas, 
            de manera rapida y sencilla,
          </p>
        </div>
        <img src="/images/acceso.png" alt="Registro" className="image-style" />
      </section>

      {/* Sección de preguntas frecuentes */}
      <section className="faq-section">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <FAQItem
              question="¿Cómo registro mi cuenta?"
              answer="Puedes registrar tu cuenta desde nuestra aplicación móvil siguiendo los pasos indicados en la sección de registro."
            />
            <FAQItem
              question="¿Qué dispositivos son compatibles?"
              answer="Nuestra plataforma es compatible con cerraduras inteligentes de las marcas más populares del mercado."
            />
            <FAQItem
              question="¿Cómo configuro mis dispositivos?"
              answer="Puedes configurar tus dispositivos desde la sección de configuración en la aplicación móvil."
            />
            <FAQItem
              question="¿Es segura la plataforma?"
              answer="Sí, utilizamos encriptación avanzada para proteger tus datos y garantizar la seguridad de tu hogar."
            />
            <FAQItem
              question="¿Puedo compartir el acceso con otros usuarios?"
              answer="Sí, puedes compartir accesos temporales con otros usuarios desde la aplicación."
            />
            <FAQItem
              question="¿Qué hago si tengo problemas técnicos?"
              answer="Puedes contactar con nuestro equipo de soporte técnico desde la sección de contacto en la aplicación."
            />
          </div>
        </section> 

    </main>
    </div>
  </main>
);

export default Home;