package com.example.backend.repository;

import com.example.backend.model.Propietario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PropietarioRepository extends JpaRepository<Propietario, Long> {
    Optional<Propietario> findByCorreoElectronico(String correoElectronico);
    Optional<Propietario> findById(Long id);
}
