

# 🏠 IoHome - Backend

> Backend desarrollado para la gestión de alojamientos turísticos mediante **cerraduras inteligentes**, utilizando **Spring Boot** y una arquitectura basada en REST API.

---

## 🛠 Tecnologías utilizadas

- ☕ **Java 17** → Lenguaje de desarrollo principal.
- 🌱 **Spring Boot 3** → Framework backend.
- 🔒 **Spring Security** → Seguridad y autenticación.
- 🗄 **Spring Data JPA (Hibernate)** → Acceso a datos.
- 🗂 **MySQL** → Base de datos relacional.
- 📡 **Spring Web** → API REST.
- 🌐 **Swagger/OpenAPI** → Documentación de la API.
- 🔑 **JWT (JSON Web Token)** → Autenticación segura.

---

## 📂 Estructura del Proyecto

```
IoHome-Backend/
├── src/main/java/com/iohome/backend/
│   ├── config/               # Configuración de seguridad y JWT
│   ├── controller/           # Controladores REST
│   ├── model/                # Entidades JPA (modelos de datos)
│   ├── repository/           # Interfaces JPA para acceso a BD
│   ├── service/              # Lógica de negocio
│   ├── util/                 # Utilidades como manejo de fechas
│   ├── IoHomeApplication.java # Clase principal de Spring Boot
├── src/main/resources/
│   ├── application.properties # Configuración de la aplicación
│   ├── schema.sql             # Script de creación de la base de datos
├── pom.xml                   # Dependencias del proyecto
```

---

## 📌 Detalle de los Módulos y Archivos Clave

### 📁 `controller/`
Contiene los controladores REST que exponen los endpoints de la API:

- **`AuthController.java`** → Maneja la autenticación y generación de tokens JWT.
- **`PropiedadController.java`** → Gestión de alojamientos.
- **`ReservaController.java`** → Manejo de reservas y sincronización con Google Calendar.
- **`CerraduraController.java`** → Control de accesos mediante cerraduras inteligentes.
- **`PropietarioController.java`** → Gestiona las operaciones relacionadas con los propietarios, como la creación,            modificación y consulta de información. 
- **`SeamController.java`** → Controlador encargado de manejar las operaciones relacionadas con la integración de servicios externos o funcionalidades adicionales específicas del sistema. (API Seam)
- **`UsuarioController.java`** → Controlador encargado de gestionar las operaciones relacionadas con los usuarios, como el registro, actualización y eliminación de cuentas, así como la asignación de roles y permisos.


### 📁 `service/`
Contiene la lógica de negocio:

- **`AuthService.java`** → Lógica de autenticación, verificación y generación de JWT.
- **`UsuarioService.java`** → Gestión de usuarios, roles y permisos.
- **`PropiedadService.java`** → Creación, modificación y eliminación de alojamientos.
- **`ReservaService.java`** → Gestión de reservas.
- **`CerraduraService.java`** → Integración con las cerraduras inteligentes.
- **`SeamService.java`** → Servicio encargado de manejar la interacción con la API Seam.

### 📁 `repository/`
Interfaces JPA que permiten la persistencia de datos en la base de datos:

- **`UsuarioRepository.java`** → Acceso a los datos de los usuarios.
- **`PropiedadRepository.java`** → Gestión de alojamientos en la BD.
- **`ReservaRepository.java`** → Manejo de reservas.
- **`CerraduraRepository.java`** → Control de accesos y registros.
- **`PropietarioRepository.java`** → Acceso a los datos de los propietarios.

### 📁 `model/`
Modelos de datos utilizados en la aplicación:

- **`Usuario.java`** → Representa a un usuario con su información.
- **`Propiedad.java`** → Representa a una propiedad con su información.
- **`Reserva.java`** → Modelo de reserva, con fechas y usuarios asociados.
- **`Cerradura.java`** → Registros de accesos a los alojamientos.
- **`Propietario.java`** → Representa a un propietario con su información.

---

## 📦 Instalación y Ejecución

1️⃣ Clonar el repositorio:
```sh
 git clone <https://github.com/serguccierrez/ISST-GRUPO26-CASAS>
 cd IoHome-Backend
```

2️⃣ Ejecutar el backend con Maven:
```sh
 mvn spring-boot:run
```


---

## 📬 Contacto

📩 **Autor:** [Segio Gutiérrez, Valeria González, Álvaro Tagarro, Alejandro Cerezo, Patricia Rodriguez]

<br><br>
<br><br>

**ENGLISH VERSION**

# 🏠 IoHome - Backend

> Backend developed for managing tourist accommodations through **smart locks**, using **Spring Boot** and a REST API-based architecture.

---

## 🛠 Technologies Used

- ☕ **Java 17** → Main development language.
- 🌱 **Spring Boot 3** → Backend framework.
- 🔒 **Spring Security** → Security and authentication.
- 🗄 **Spring Data JPA (Hibernate)** → Data access.
- 🗂 **MySQL** → Relational database.
- 📡 **Spring Web** → REST API.
- 🌐 **Swagger/OpenAPI** → API documentation.
- 🔑 **JWT (JSON Web Token)** → Secure authentication.

---

## 📂 Project Structure

```
IoHome-Backend/
├── src/main/java/com/iohome/backend/
│   ├── config/               # Security and JWT configuration
│   ├── controller/           # REST controllers
│   ├── model/                # JPA entities (data models)
│   ├── repository/           # JPA interfaces for database access
│   ├── service/              # Business logic
│   ├── util/                 # Utilities such as date handling
│   ├── IoHomeApplication.java # Spring Boot main class
├── src/main/resources/
│   ├── application.properties # Application configuration
│   ├── schema.sql             # Database schema creation script
├── pom.xml                   # Project dependencies
```

---

## 📌 Module and Key File Details

### 📁 `controller/`
Contains the REST controllers that expose the API endpoints:

- **`AuthController.java`** → Handles authentication and JWT token generation.
- **`PropiedadController.java`** → Manages accommodations.
- **`ReservaController.java`** → Handles reservations and Google Calendar synchronization.
- **`CerraduraController.java`** → Manages access control via smart locks.
- **`PropietarioController.java`** → Manages owner-related operations such as creation, modification, and data retrieval.
- **`SeamController.java`** → Handles operations related to external service integration or additional system functionalities (Seam API).
- **`UsuarioController.java`** → Manages user-related operations, including registration, updates, account deletion, and role/permission assignment.

### 📁 `service/`
Contains the business logic:

- **`AuthService.java`** → Authentication logic, verification, and JWT generation.
- **`UsuarioService.java`** → User, role, and permission management.
- **`PropiedadService.java`** → Creation, modification, and deletion of accommodations.
- **`ReservaService.java`** → Reservation management.
- **`CerraduraService.java`** → Integration with smart locks.
- **`SeamService.java`** → Handles interactions with the Seam API.

### 📁 `repository/`
JPA interfaces enabling data persistence in the database:

- **`UsuarioRepository.java`** → Access to user data.
- **`PropiedadRepository.java`** → Accommodation management in the database.
- **`ReservaRepository.java`** → Reservation handling.
- **`CerraduraRepository.java`** → Access control and record management.
- **`PropietarioRepository.java`** → Access to owner data.

### 📁 `model/`
Data models used in the application:

- **`Usuario.java`** → Represents a user and their information.
- **`Propiedad.java`** → Represents a property and its details.
- **`Reserva.java`** → Reservation model with associated dates and users.
- **`Cerradura.java`** → Records of accommodation access.
- **`Propietario.java`** → Represents an owner and their information.

---

## 📦 Installation and Execution

1️⃣ Clone the repository:
```sh
 git clone <https://github.com/serguccierrez/ISST-GRUPO26-CASAS>
 cd IoHome-Backend
```

2️⃣ Run the backend with Maven:
```sh
 mvn spring-boot:run
```

---

## 📬 Contact

📩 **Authors:** [Segio Gutiérrez, Valeria González, Álvaro Tagarro, Alejandro Cerezo, Patricia Rodriguez]

