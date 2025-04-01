package com.example.backend.service;

import com.example.backend.model.Reserva;
import com.example.backend.model.Usuario;
import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.repository.ReservaRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.repository.PropiedadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PropiedadRepository propiedadRepository;

    // Crear nueva reserva
    // ReservaService.java
public Reserva crearReserva(Long usuarioId, Long propiedadId, Reserva reserva) {
    Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    Propiedad propiedad = propiedadRepository.findById(propiedadId).orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));
    
    reserva.setUsuario(usuario);
    reserva.setPropiedad(propiedad);
    reserva.setActiva(true);
    reserva.setFechaCreacion(LocalDateTime.now());
    return reservaRepository.save(reserva);
}


    // Obtener todas las reservas activas de un usuario
    public List<Reserva> obtenerReservasActivasPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuarioIdAndActivaTrue(usuarioId);
    }

    // Obtener todas las reservas activas de una propiedad
    public List<Reserva> obtenerReservasActivasPorPropiedad(Long propiedadId) {
        return reservaRepository.findByPropiedadIdAndActivaTrue(propiedadId);
    }

    // Obtener todas las reservas activas
    public List<Reserva> obtenerReservasActivas() {
        return reservaRepository.findByActivaTrue();
    }

    // Cancelar una reserva
    public Reserva cancelarReserva(Long reservaId) {
        Optional<Reserva> reservaOpt = reservaRepository.findById(reservaId);
        if (reservaOpt.isPresent()) {
            Reserva reserva = reservaOpt.get();
            reserva.setActiva(false);  // Marcar la reserva como inactiva
           
            return reservaRepository.save(reserva);
        } else {
            throw new RuntimeException("Reserva no encontrada");
        }
    }

    // Obtener todas las reservas de un usuario (activas e inactivas)
    public List<Reserva> obtenerReservasPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    // Obtener todas las reservas de una propiedad (activas e inactivas)
    public List<Reserva> obtenerReservasPorPropiedad(Long propiedadId) {
        return reservaRepository.findByPropiedadId(propiedadId);
    }

    // Obtener una reserva por ID
    public Reserva obtenerReservaPorId(Long reservaId) {
        return reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
    }
    public List<Reserva> obtenerReservasPorPropietario(Propietario propietarioId) {
    List<Propiedad> propiedades = propiedadRepository.findByPropietario(propietarioId);
    List<Reserva> reservas = new ArrayList<>();

    for (Propiedad propiedad : propiedades) {
        reservas.addAll(reservaRepository.findByPropiedadId(propiedad.getId()));
    }

    return reservas;
}

// Eliminar una reserva
public void eliminarReserva(Long reservaId) {
    reservaRepository.deleteById(reservaId);
}

// Actualizar una reserva
public Reserva actualizarReserva(Long reservaId, Reserva reservaActualizada) {
    return reservaRepository.findById(reservaId)
            .map(reserva -> {
                reserva.setFechaInicio(reservaActualizada.getFechaInicio());
                reserva.setFechaFin(reservaActualizada.getFechaFin());
                reserva.setObservaciones(reservaActualizada.getObservaciones());
                return reservaRepository.save(reserva);
            })
            .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
}

public Reserva actualizarReserva(Long usuarioId, Long propiedadId, Long reservaId, Reserva reservaActualizada) {
    Usuario usuario = usuarioRepository.findById(usuarioId)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    Propiedad propiedad = propiedadRepository.findById(propiedadId)
        .orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));
    Reserva reserva = reservaRepository.findById(reservaId)
        .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

    reserva.setUsuario(usuario);
    reserva.setPropiedad(propiedad);
    reserva.setFechaInicio(reservaActualizada.getFechaInicio());
    reserva.setFechaFin(reservaActualizada.getFechaFin());
    reserva.setObservaciones(reservaActualizada.getObservaciones());

    return reservaRepository.save(reserva);
}


public Reserva obtenerUltimaReservaActiva(Long usuarioId) {
    List<Reserva> reservas = reservaRepository.findByUsuarioIdAndActivaTrue(usuarioId);
    if (reservas.isEmpty()) {
        throw new RuntimeException("No hay reservas activas");
    }
    return reservas.get(reservas.size() - 1); // Devuelve la última reserva activa
}






}
