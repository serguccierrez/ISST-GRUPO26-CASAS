import React from 'react';
import '../App.css';


const Card = ({ name, role, description, image }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-content">
        <h3>{name}</h3>
        <p>{role}</p>
        <hr />
        <p>{description}</p>
      </div>
    </div>
  );
};

const About = () => (
  <main>
    <section className="flex items-center justify-between mt-8 w-[85%] mx-auto">
      <div className="text-container">
        <h1>Sobre Nosotros</h1>
        <p style={{ fontSize: "1.15rem" }}>
        IoHome es una empresa dedicada a ofrecer soluciones tecnológicas para hogares inteligentes.
        </p>
        <p style={{ fontSize: "1.15rem", textAlign: "justify" }}>
          Nuestro objetivo es hacer que la vida de nuestros clientes sea más cómoda y eficiente a través de la automatización del hogar.
        </p>
      </div>        
      <div className="text-container">
        <h1>Misión y Visión</h1>
        <p style={{ fontSize: "1.15rem", textAlign: "jutify" }}>
        Proporcionar soluciones innovadoras y accesibles para la automatización del hogar, mejorando la calidad de vida de nuestros clientes.
        </p>
        <p style={{ fontSize: "1.15rem", textAlign: "jutify" }}>
          Ser líderes en el mercado de la automatización del hogar, ofreciendo productos y servicios que superen las expectativas de nuestros clientes.
        </p>
      </div>
      </section>


    <div>
      <h2 className="text-container" >Conoce al equipo</h2>
      <p className="text-container">
        Detrás de cada estrategia y cada producto, hay un gran equipo apasionado por la tecnología y la innovación.
      </p>
    </div>

    <div>
      <div>
        <Card
          name="Valeria González"
          role="Product Owner"
          description="Estudiante de telecomunicaciones con pasión por la tecnología y la conectividad inteligente."
          image="/images/valeria.jpg"
        />
        <Card
          name="Sergio Gutiérrez"
          role="Scrum Master"
          description="Apasionado por la innovación en telecomunicaciones y el desarrollo de soluciones digitales."
          image="/images/guti.jpg"
        />
        <Card
          name="Álvaro Tagarro"
          role="Equipo de desarrollo"
          description="Especialista en redes y comunicación, enfocado en crear sistemas eficientes, seguros y escalables."
          image="/images/tagarro.jpg"
        />
        <Card
          name="Alejandro Cerezo"
          role="Equipo de desarrollo"
          description="Explorando el futuro de la tecnología IoT y su impacto en la vida cotidiana con un enfoque en automatización y IoT."
          image="/images/ale.jpg"
        />
        <Card
          name="Patricia Rodríguez"
          role="Equipo de desarrollo"
          description="Entusiasta de la tecnología inalámbrica y el diseño de infraestructuras conectadas."
          image="/images/patri.jpg"
        />
      </div>
    </div>
  </main>
);

export default About;