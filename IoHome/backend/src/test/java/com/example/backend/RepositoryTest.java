package com.example.backend;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.example.backend.model.Cerradura;
import com.example.backend.model.Evento;
import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.model.Reserva;
import com.example.backend.model.Usuario;
import com.example.backend.repository.CerraduraRepository;
import com.example.backend.repository.EventoRepository;
import com.example.backend.repository.PropiedadRepository;
import com.example.backend.repository.PropietarioRepository;
import com.example.backend.repository.ReservaRepository;
import com.example.backend.repository.UsuarioRepository;


@TestPropertySource("classpath:application.properties")
@SpringBootTest
public class RepositoryTest {

    @Autowired UsuarioRepository usuarioRepository;
    @Autowired PropietarioRepository propietarioRepository;
    @Autowired PropiedadRepository propiedadRepository;
    @Autowired CerraduraRepository cerraduraRepository;
    @Autowired EventoRepository eventoRepository;
    @Autowired ReservaRepository reservaRepository;

    @Nested
    @DisplayName("UsuarioRepository")
    class UsuarioRepoTest {
        @Test
        void guardarYBuscarPorCorreo() {
            Usuario u = new Usuario();
            u.setCorreoElectronico("user@test.com");
            usuarioRepository.save(u);

            Optional<Usuario> result = usuarioRepository.findByCorreoElectronico("user@test.com");
            assertTrue(result.isPresent());
        }
    }

    @Nested
    @DisplayName("PropietarioRepository")
    class PropietarioRepoTest {
        @Test
        void guardarYBuscarPorCorreo() {
            Propietario p = new Propietario();
            p.setCorreoElectronico("owner@test.com");
            propietarioRepository.save(p);

            Optional<Propietario> result = propietarioRepository.findByCorreoElectronico("owner@test.com");
            assertTrue(result.isPresent());
        }
    }

    @Nested
    @DisplayName("PropiedadRepository")
    class PropiedadRepoTest {
        @Test
        void guardarYBuscarPorPropietario() {
            Propietario p = new Propietario();
            propietarioRepository.save(p);

            Propiedad prop = new Propiedad();
            prop.setNombre("Casa en la playa");
            prop.setCiudad("Valencia");
            prop.setPropietario(p);
            propiedadRepository.save(prop);

            List<Propiedad> result = propiedadRepository.findByPropietario(p);
            assertEquals(1, result.size());
        }
    }

    @Nested
    @DisplayName("CerraduraRepository")
    class CerraduraRepoTest {
        @Test
        void guardarYBuscarPorPropietarioYPropiedad() {
            Propietario p = new Propietario();
            propietarioRepository.save(p);

            Propiedad prop = new Propiedad();
            prop.setPropietario(p);
            propiedadRepository.save(prop);

            Cerradura c = new Cerradura();
            c.setDevice_id("lock001");
            c.setNombre("Entrada");
            c.setTipo("Smart");
            c.setPropietario(p);
            c.setPropiedad(prop);
            cerraduraRepository.save(c);

            assertNotNull(cerraduraRepository.findByPropiedad(prop));
            assertEquals(1, cerraduraRepository.findByPropietario(p).size());
        }
    }

    @Nested
    @DisplayName("EventoRepository")
    class EventoRepoTest {
        @Test
        void guardarYBuscarPorCerradura() {
            Propietario p = new Propietario();
            propietarioRepository.save(p);

            Cerradura c = new Cerradura();
            c.setDevice_id("lock002");
            c.setNombre("Puerta");
            c.setTipo("Smart");
            c.setPropietario(p);
            cerraduraRepository.save(c);

            Evento e = new Evento();
            e.setEvent_id("evt123");
            e.setCerradura(c);
            e.setDescripcion("Apertura");
            e.setStatus("OK");
            e.setActionType("OPEN");
            e.setOccurredAt(LocalDateTime.now());
            eventoRepository.save(e);

            List<Evento> eventos = eventoRepository.findByCerradura(c);
            assertEquals(1, eventos.size());
        }
    }

    @Nested
    @DisplayName("ReservaRepository")
    class ReservaRepoTest {
        @Test
        void guardarYBuscarActivasPorUsuario() {
            Usuario u = new Usuario();
            usuarioRepository.save(u);

            Propietario p = new Propietario();
            propietarioRepository.save(p);

            Propiedad prop = new Propiedad();
            prop.setPropietario(p);
            propiedadRepository.save(prop);

            Reserva r = new Reserva();
            r.setUsuario(u);
            r.setPropiedad(prop);
            r.setToken("abc123");
            r.setActiva(true);
            r.setFechaInicio(LocalDateTime.now());
            r.setFechaFin(LocalDateTime.now().plusDays(1));
            reservaRepository.save(r);

            List<Reserva> activas = reservaRepository.findByUsuarioIdAndActivaTrue(u.getId());
            assertEquals(1, activas.size());
        }
    }
}
