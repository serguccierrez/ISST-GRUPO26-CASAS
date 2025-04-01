package com.example.backend.repository;

import com.example.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    // Obtener todas las reservas de un usuario específico
    List<Reserva> findByUsuarioId(Long usuarioId);

    // Obtener todas las reservas de una propiedad específica
    List<Reserva> findByPropiedadId(Long propiedadId);

    // Obtener todas las reservas activas
    List<Reserva> findByActivaTrue();

    // Obtener todas las reservas inactivas (canceladas)
    List<Reserva> findByActivaFalse();

    // Obtener reservas activas de un usuario
    List<Reserva> findByUsuarioIdAndActivaTrue(Long usuarioId);

    // Obtener reservas activas de una propiedad
    List<Reserva> findByPropiedadIdAndActivaTrue(Long propiedadId);
}
