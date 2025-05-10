package com.example.backend;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import com.example.backend.model.Cerradura;
import com.example.backend.model.Evento;
import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.model.Reserva;
import com.example.backend.model.Usuario;

public class ModelTest {

    @Nested
    @DisplayName("Tests de Usuario")
    class UsuarioTest {
        @Test
        void crearYLeerUsuario() {
            Usuario u = new Usuario();
            u.setId(1L);
            u.setDni("12345678A");
            u.setNombre("Juan");
            u.setApellidos("Pérez");
            u.setCorreoElectronico("juan@example.com");
            u.setTelefono("600123123");
            u.setPassword("1234");

            assertEquals(1L, u.getId());
            assertEquals("USER", u.getRol());
        }
    }

    @Nested
    @DisplayName("Tests de Propietario")
    class PropietarioTest {
        @Test
        void crearYLeerPropietario() {
            Propietario p = new Propietario();
            p.setId(1L);
            p.setNombre("Ana");
            p.setRol("ADMIN");

            assertEquals("Ana", p.getNombre());
            assertEquals("ADMIN", p.getRol());
        }
    }

    @Nested
    @DisplayName("Tests de Propiedad")
    class PropiedadTest {
        @Test
        void crearYLeerPropiedad() {
            Propiedad prop = new Propiedad();
            prop.setId(1L);
            prop.setNombre("Apartamento Centro");
            prop.setCiudad("Madrid");

            assertEquals("Madrid", prop.getCiudad());
            assertTrue(prop.getId() == 1L);
        }
    }

    @Nested
    @DisplayName("Tests de Cerradura")
    class CerraduraTest {
        @Test
        void crearYLeerCerradura() {
            Cerradura c = new Cerradura();
            c.setDevice_id("lock123");
            c.setTipo("SmartLock");

            assertEquals("lock123", c.getDevice_id());
            assertEquals("SmartLock", c.getTipo());
        }
    }

    @Nested
    @DisplayName("Tests de Evento")
    class EventoTest {
        @Test
        void crearYLeerEvento() {
            Evento e = new Evento();
            e.setEvent_id("evt123");
            e.setDescripcion("Acceso autorizado");
            e.setOccurredAt(LocalDateTime.of(2023, 1, 1, 12, 0));

            assertEquals("evt123", e.getEvent_id());
            assertEquals("Acceso autorizado", e.getDescripcion());
            assertEquals(2023, e.getOccurredAt().getYear());
        }
    }

    @Nested
    @DisplayName("Tests de Reserva")
    class ReservaTest {
        @Test
        void crearYLeerReserva() {
            Reserva r = new Reserva();
            r.setId(10L);
            r.setToken("abc123");
            r.setActiva(true);

            assertEquals("abc123", r.getToken());
            assertTrue(r.isActiva());
        }
    }
}