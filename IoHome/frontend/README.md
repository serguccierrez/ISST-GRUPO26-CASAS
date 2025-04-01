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
- **`CalendarView.jsx`** → vista de Google Calendar.
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
- **`UserHome.jsx`** → Página perfil de usuario.

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
