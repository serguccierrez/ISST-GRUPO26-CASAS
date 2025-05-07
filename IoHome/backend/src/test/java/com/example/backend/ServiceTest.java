package com.example.backend;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.example.backend.model.Cerradura;
import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.model.Reserva;
import com.example.backend.model.Usuario;
import com.example.backend.service.AuthService;
import com.example.backend.service.EventoService;
import com.example.backend.service.PropiedadService;
import com.example.backend.service.PropietarioService;
import com.example.backend.service.ReservaService;
import com.example.backend.service.SeamService;
import com.example.backend.service.UsuarioService;

@SpringBootTest
@TestPropertySource("classpath:application.properties")
public class ServiceTest {

    @Nested
    @DisplayName("Tests de AuthService")
    class AuthServiceTest {

        @Autowired
        private AuthService authService;

        @Test
        void registrarYLoginUsuario() {
            Usuario u = new Usuario();
            u.setCorreoElectronico("nuevo@correo.com");
            u.setPassword("1234");

            Usuario guardado = authService.registrarUsuario(u);
            assertNotNull(guardado.getId());

            Usuario login = authService.loginUsuario("nuevo@correo.com", "1234");
            assertEquals("nuevo@correo.com", login.getCorreoElectronico());
        }

        @Test
        void registrarYLoginPropietario() {
            Propietario p = new Propietario();
            p.setCorreoElectronico("propietario@correo.com");
            p.setPassword("abcd");

            Propietario guardado = authService.registrarPropietario(p);
            assertNotNull(guardado.getId());

            Propietario login = authService.loginPropietario("propietario@correo.com", "abcd");
            assertEquals("propietario@correo.com", login.getCorreoElectronico());
        }
    }

    @Nested
    @DisplayName("Tests de UsuarioService")
    class UsuarioServiceTest {

        @Autowired
        private UsuarioService usuarioService;

        @Autowired
        private AuthService authService;

        @Test
        void buscarUsuarioPorCorreo() {
            Usuario u = new Usuario();
            u.setCorreoElectronico("buscar@correo.com");
            u.setPassword("x");

            authService.registrarUsuario(u);
            Usuario encontrado = usuarioService.obtenerUsuarioPorCorreo("buscar@correo.com");

            assertNotNull(encontrado);
            assertEquals("buscar@correo.com", encontrado.getCorreoElectronico());
        }
    }

        @Nested
    @DisplayName("Tests de PropietarioService")
    class PropietarioServiceTest {

        @Autowired
        private PropietarioService propietarioService;

        @Autowired
        private AuthService authService;

        @Test
        void obtenerPropietarioPorId() {
            Propietario p = new Propietario();
            p.setCorreoElectronico("servprop@correo.com");
            p.setPassword("123");
            p.setNombre("Carlos");

            Propietario creado = authService.registrarPropietario(p);

            Propietario encontrado = propietarioService.obtenerPropietario(creado.getId());
            assertNotNull(encontrado);
            assertEquals("Carlos", encontrado.getNombre());
        }
    }

    @Nested
    @DisplayName("Tests de PropiedadService")
    class PropiedadServiceTest {

        @Autowired
        private PropiedadService propiedadService;

        @Autowired
        private AuthService authService;

        @Test
        void crearYObtenerPropiedadDePropietario() {
            Propietario p = new Propietario();
            p.setCorreoElectronico("propserv@correo.com");
            p.setPassword("456");
            p.setNombre("Lucía");

            Propietario creado = authService.registrarPropietario(p);

            Propiedad prop = new Propiedad();
            prop.setNombre("Apartamento Centro");
            prop.setCiudad("Madrid");

            propiedadService.crearPropiedad(creado.getId(), prop);

            var lista = propiedadService.obtenerPropiedadesDePropietario(creado.getId());
            assertEquals(1, lista.size());
            assertEquals("Apartamento Centro", lista.get(0).getNombre());
        }
    }

        @Nested
    @DisplayName("Tests de ReservaService")
    class ReservaServiceTest {

        @Autowired
        private ReservaService reservaService;

        @Autowired
        private AuthService authService;

        @Autowired
        private PropiedadService propiedadService;

        @Test
        void crearYObtenerReservaActivaPorUsuario() {
            // Crear y registrar usuario
            Usuario u = new Usuario();
            u.setCorreoElectronico("reservauser@correo.com");
            u.setPassword("123");
            Usuario usuarioCreado = authService.registrarUsuario(u);

            // Crear y registrar propietario
            Propietario p = new Propietario();
            p.setCorreoElectronico("reservaprop@correo.com");
            p.setPassword("abc");
            Propietario propietarioCreado = authService.registrarPropietario(p);

            // Crear propiedad
            Propiedad propiedad = new Propiedad();
            propiedad.setNombre("Apartamento Reserva");
            propiedad.setCiudad("Valencia");
            propiedadService.crearPropiedad(propietarioCreado.getId(), propiedad);

            // Crear reserva asociada a esa propiedad
            Reserva r = new Reserva();
            r.setUsuario(usuarioCreado);
            r.setFechaInicio(LocalDateTime.now().plusDays(1));
            r.setFechaFin(LocalDateTime.now().plusDays(3));

            Reserva creada = reservaService.crearReserva(propiedad.getId(), r);

            assertNotNull(creada.getId());
            assertTrue(creada.isActiva());

            // Obtener reservas activas por usuario
            var activas = reservaService.obtenerReservasActivasPorUsuario(usuarioCreado.getId());
            assertEquals(1, activas.size());
        }
    }

        @Nested
    @DisplayName("Tests de EventoService")
    class EventoServiceTest {

        @Autowired
        private EventoService eventoService;

        @Autowired
        private AuthService authService;

        @Autowired
        private SeamService seamService;

        @Autowired
        private PropiedadService propiedadService;

        @Test
        void guardarYRecuperarEventoPorCerradura() {
            // Crear propietario
            Propietario p = new Propietario();
            p.setCorreoElectronico("eventoprop@correo.com");
            p.setPassword("evento123");
            Propietario propietario = authService.registrarPropietario(p);

            // Crear cerradura real usando SeamService (ya tiene método)
            Cerradura c = new Cerradura();
            c.setDevice_id("evento-lock-1");
            c.setNombre("Entrada evento");
            c.setTipo("Smart");

            seamService.crearCerradura(propietario.getId(), c);

            // Crear evento
            eventoService.guardarEventoDesdeParametros(
                "evento-001", "evento-lock-1", "Acceso correcto", "OK", "UNLOCK"
            );

            // Recuperar
            var eventos = eventoService.obtenerEventos("evento-lock-1");
            assertEquals(1, eventos.size());
            assertEquals("Acceso correcto", eventos.get(0).getDescripcion());
        }
    }


}
