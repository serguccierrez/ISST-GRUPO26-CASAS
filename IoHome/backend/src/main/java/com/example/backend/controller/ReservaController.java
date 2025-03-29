package com.example.backend.controller;

import com.example.backend.model.Propietario;
import com.example.backend.model.Reserva;
import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // ReservaController.java
    @PostMapping("/crear/{usuarioId}/{propiedadId}")
    public ResponseEntity<Reserva> crearReserva(
        @PathVariable Long usuarioId,
        @PathVariable Long propiedadId,
        @RequestBody Reserva reserva) {
    try {
        Reserva nuevaReserva = reservaService.crearReserva(usuarioId, propiedadId, reserva);
        return ResponseEntity.ok(nuevaReserva);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(null);
        }
    }


    // Obtener todas las reservas activas de un usuario
    @GetMapping("/usuario/{usuarioId}/activas")
    public ResponseEntity<List<Reserva>> obtenerReservasActivasPorUsuario(@PathVariable Long usuarioId) {
        List<Reserva> reservas = reservaService.obtenerReservasActivasPorUsuario(usuarioId);
        return ResponseEntity.ok(reservas);
    }

    // Obtener todas las reservas activas de una propiedad
    @GetMapping("/propiedad/{propiedadId}/activas")
    public ResponseEntity<List<Reserva>> obtenerReservasActivasPorPropiedad(@PathVariable Long propiedadId) {
        List<Reserva> reservas = reservaService.obtenerReservasActivasPorPropiedad(propiedadId);
        return ResponseEntity.ok(reservas);
    }

    // Obtener todas las reservas activas
    @GetMapping("/activas")
    public ResponseEntity<List<Reserva>> obtenerReservasActivas() {
        List<Reserva> reservas = reservaService.obtenerReservasActivas();
        return ResponseEntity.ok(reservas);
    }

    // Cancelar una reserva
    @PutMapping("/cancelar/{reservaId}")
    public ResponseEntity<Reserva> cancelarReserva(@PathVariable Long reservaId) {
        try {
            Reserva reservaCancelada = reservaService.cancelarReserva(reservaId);
            return ResponseEntity.ok(reservaCancelada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Obtener todas las reservas de un usuario (activas e inactivas)
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Reserva>> obtenerReservasPorUsuario(@PathVariable Long usuarioId) {
        List<Reserva> reservas = reservaService.obtenerReservasPorUsuario(usuarioId);
        return ResponseEntity.ok(reservas);
    }

    // Obtener todas las reservas de una propiedad (activas e inactivas)
    @GetMapping("/propiedad/{propiedadId}")
    public ResponseEntity<List<Reserva>> obtenerReservasPorPropiedad(@PathVariable Long propiedadId) {
        List<Reserva> reservas = reservaService.obtenerReservasPorPropiedad(propiedadId);
        return ResponseEntity.ok(reservas);
    }

    // Obtener una reserva por ID
    @GetMapping("/{reservaId}")
    public ResponseEntity<Reserva> obtenerReservaPorId(@PathVariable Long reservaId) {
        try {
            Reserva reserva = reservaService.obtenerReservaPorId(reservaId);
            return ResponseEntity.ok(reserva);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Obtener todas las reservas de un propietario (a través de sus propiedades)
@GetMapping("/propietario/{propietarioId}")
public ResponseEntity<List<Reserva>> obtenerReservasPorPropietario(@PathVariable Propietario propietarioId) {
    List<Reserva> reservas = reservaService.obtenerReservasPorPropietario(propietarioId);
    return ResponseEntity.ok(reservas);
}



}
