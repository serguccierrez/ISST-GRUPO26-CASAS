package com.example.backend;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.model.Reserva;
import com.example.backend.model.Usuario;
import com.example.backend.repository.ReservaRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.PropiedadService;
import com.example.backend.service.PropietarioService;
import com.example.backend.service.ReservaService;
import com.example.backend.service.UsuarioService;

@SpringBootTest
@TestPropertySource("classpath:application.properties")
public class IntegrationTest {

    @Autowired AuthService authService;
    @Autowired UsuarioService usuarioService;
    @Autowired PropietarioService propietarioService;
    @Autowired PropiedadService propiedadService;
    @Autowired ReservaService reservaService;
    @Autowired ReservaRepository reservaRepository;

    @Test
    void flujoCompleto_crearReservaYVerificarDatos() {
        // 1. Crear usuario
        Usuario usuarioTest = new Usuario();
        usuarioTest.setCorreoElectronico("test_user_unique_001@correo.com");
        usuarioTest.setPassword("testpass");
        Usuario creadoUsuario = authService.registrarUsuario(usuarioTest);

        // 2. Crear propietario
        Propietario propietarioTest = new Propietario();
        propietarioTest.setCorreoElectronico("test_owner_unique_001@correo.com");
        propietarioTest.setPassword("ownerpass");
        Propietario creadoPropietario = authService.registrarPropietario(propietarioTest);

        // 3. Crear propiedad
        Propiedad propiedadTest = new Propiedad();
        propiedadTest.setNombre("Apartamento BetaTest 001");
        propiedadTest.setCiudad("Ávila");
        propiedadService.crearPropiedad(creadoPropietario.getId(), propiedadTest);

        // 4. Crear reserva
        Reserva reservaTest = new Reserva();
        reservaTest.setUsuario(creadoUsuario);
        reservaTest.setFechaInicio(LocalDateTime.now().plusDays(2));
        reservaTest.setFechaFin(LocalDateTime.now().plusDays(5));

        Reserva reservaCreada = reservaService.crearReserva(propiedadTest.getId(), reservaTest);
        assertNotNull(reservaCreada.getId());

        // 5. Verificar con el repositorio directamente (por ID, no por nombre)
        List<Reserva> reservas = reservaRepository.findByUsuarioIdAndActivaTrue(creadoUsuario.getId());
        assertFalse(reservas.isEmpty());

        Reserva encontrada = reservas.stream()
            .filter(r -> r.getPropiedad() != null && propiedadTest.getId().equals(r.getPropiedad().getId()))
            .findFirst()
            .orElseThrow(() -> new AssertionError("No se encontró la reserva esperada."));

        // 6. Comprobar valores cruzados
        assertEquals("Ávila", encontrada.getPropiedad().getCiudad());
        assertEquals("test_user_unique_001@correo.com", encontrada.getUsuario().getCorreoElectronico());
    }
}
