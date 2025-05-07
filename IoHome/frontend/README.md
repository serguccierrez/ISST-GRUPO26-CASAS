# 🏠 IoHome - Frontend

> Frontend desarrollado para la gestión de alojamientos turísticos mediante **cerraduras inteligentes**, construido con **React** y enfocado en una experiencia de usuario intuitiva y eficiente.

---

## 🛠️ Tecnologías Utilizadas

- ✨ **React 18** → Librería principal para la interfaz de usuario.
- 📁 **Vite** → Entorno de desarrollo rápido y eficiente.
- 📃 **React Router** → Navegación entre páginas.
- 🌐 **Axios** → Peticiones HTTP al backend.
- 🛡️ **JWT (JSON Web Token)** → Autenticación segura.
- 🗃️ **Tailwind CSS** → Estilos modernos y responsivos.
- 🛠️ **Redux Toolkit** → Manejo global del estado.
- 🎨 **Shadcn/ui** → Componentes pre-diseñados para una interfaz atractiva.
- 🌐 **Google Calendar API** → Sincronización de reservas con Google Calendar.

---

## 📂 Estructura del Proyecto

```
IoHome-Frontend/
├── src/
│   ├── assets/                # Imágenes, iconos y archivos estáticos
│   ├── components/            # Componentes reutilizables de la interfaz
│   ├── pages/                 # Vistas principales de la aplicación
│   ├── styles/                # Estilos diseño pagina web
│   ├── app.css/               # Diseño general
│   ├── services/              # Llamadas a la API
│   ├── utils/                 # Funciones auxiliares
│   ├── App.jsx                # Componente principal de la aplicación
│   ├── main.jsx               # Punto de entrada principal con React y Vite
├── public/                    # Archivos estáticos y metadatos
├── index.html                 # Archivo HTML principal
├── package.json               # Dependencias y configuración del proyecto
├── vite.config.js              # Configuración de Vite
```

---

## 📌 Módulos y Archivos Clave

### 📁 `services/`
Servicios para la comunicación con el backend:
- **`authService.js`** → Manejo de autenticación y tokens JWT.
- **`reservaService.js`** → Llamadas a la API para reservas.
- **`propiedadService.js`** → Gestión de propiedades.
- **`calendar.cjs`** → Integración de Google Calendar.


### 📁 `components/`
Contiene componentes reutilizables para toda la aplicación:
- **`AuthSwitcher.jsx`** → página de inicio.
- **`LoginForm.jsx`** → formulario inicio sesión.
- **`ModificarPropiedad.jsx`** → formulario modifica propiedad propietario.
- **`ModificarReservaForm.jsx`** → formulario modifica reserva.
- **`RegisterForm.jsx`** → formulario registro usuario.
- **`RegistrarPropiedad.jsx`** → formulario registrar una nueva propiedad. 
- **`SeamConnect.jsx`** → Componente para la integración con Seam API, permitiendo la conexión y gestión de cerraduras inteligentes.

### 📁 `pages/`
Contiene las vistas principales:
- **`MiAlojamiento.jsx`** → vista página de alojamientos.
- **`MisCerraduras.jsx`** → vista de las cerraduras de un propietario.
- **`GestionReservas.jsx`** → Gestión de reservas.
- **`GestionPropiedades.jsx`** → Listado y administración de propiedades.
- **`PerfilConfiguracion.jsx`** → Página de perfil del usuario.
- **`SecurityLog.jsx`** → Monitorea accesos en tiempo real, gestiona el estado de tus cerraduras y recibe alertas de actividad sospechosa.
- **`UnaCerradura.jsx`** → Información de la cerradura de la propiedad reservada.
- **`UserHome.jsx`** → Página principal de usuario.
- **`UserProfile.jsx`** → Página perfil de usuario.
- **`OwnerHome.jsx`** → Página principal de propietario, incluye las vistas del calendario y sus reservas asociadas.

---

## 🏢 Instalación y Ejecución

1️⃣ Clonar el repositorio:
```sh
 git clone <https://github.com/serguccierrez/ISST-GRUPO26-CASAS>
 cd IoHome-Frontend
```

2️⃣ Instalar dependencias:
```sh
 npm install
```

3️⃣ Ejecutar el frontend:
```sh
 npm run dev
```

---

## 💌 Contacto

📩 **Autor:** [Segio Gutiérrez, Valeria González, Álvaro Tagarro, Alejandro Cerezo, Patricia Rodriguez]

<br><br>
<br><br>

**ENGLISH VERSION**

# 🏠 IoHome - Frontend

> Frontend developed for managing tourist accommodations through **smart locks**, built with **React** and focused on an intuitive and efficient user experience.

---

## 🛠️ Technologies Used

- ✨ **React 18** → Main library for the user interface.
- 📁 **Vite** → Fast and efficient development environment.
- 📃 **React Router** → Page navigation.
- 🌐 **Axios** → HTTP requests to the backend.
- 🛡️ **JWT (JSON Web Token)** → Secure authentication.
- 🗃️ **Tailwind CSS** → Modern and responsive styling.
- 🛠️ **Redux Toolkit** → Global state management.
- 🎨 **Shadcn/ui** → Pre-designed components for an attractive interface.
- 🌐 **Google Calendar API** → Synchronization of reservations with Google Calendar.

---

## 📂 Project Structure

```
IoHome-Frontend/
├── src/
│   ├── assets/                # Images, icons, and static files
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Main application views
│   ├── styles/                # Web page styles
│   ├── app.css/               # General design
│   ├── services/              # API calls
│   ├── utils/                 # Helper functions
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Main entry point with React and Vite
├── public/                    # Static files and metadata
├── index.html                 # Main HTML file
├── package.json               # Project dependencies and configuration
├── vite.config.js             # Vite configuration
```

---

## 📌 Key Modules and Files

### 📁 `services/`
Services for backend communication:
- **`authService.js`** → Authentication management and JWT tokens.
- **`reservaService.js`** → API calls for reservations.
- **`propiedadService.js`** → Property management.


### 📁 `components/`
Contains reusable components for the entire application:
- **`AuthSwitcher.jsx`** → Home page.
- **`LoginForm.jsx`** → Login form.
- **`ModificarPropiedad.jsx`** → Form to modify owner properties.
- **`ModificarReservaForm.jsx`** → Form to modify reservations.
- **`RegisterForm.jsx`** → User registration form.
- **`RegistrarPropiedad.jsx`** → Form to register a new property. 
- **`SeamConnect.jsx`** → Component for Seam API integration, allowing connection and management of smart locks.

### 📁 `pages/`
Contains the main views:
- **`MiAlojamiento.jsx`** → Accommodation page view.
- **`MisCerraduras.jsx`** → View of an owner’s locks.
- **`GestionReservas.jsx`** → Reservation management.
- **`GestionPropiedades.jsx`** → Property listing and management.
- **`PerfilConfiguracion.jsx`** → User profile page.
- **`SecurityLog.jsx`** → Monitors real-time access, manages lock status, and receives suspicious activity alerts.
- **`UnaCerradura.jsx`** → Information on the reserved property lock.
- **`UserHome.jsx`** → Main user homepage.
- **`UserProfile.jsx`** → User profile page.
- **`OwnerHome.jsx`** → Owner's homepage, it includes the calendar view with the reservations associated.

---

## 🏢 Installation and Execution

1️⃣ Clone the repository:
```sh
 git clone <https://github.com/serguccierrez/ISST-GRUPO26-CASAS>
 cd IoHome-Frontend
```

2️⃣ Install dependencies:
```sh
 npm install
```

3️⃣ Run the frontend:
```sh
 npm run dev
```

---

## 💌 Contact

📩 **Authors:** [Sergio Gutiérrez, Valeria González, Álvaro Tagarro, Alejandro Cerezo, Patricia Rodriguez]