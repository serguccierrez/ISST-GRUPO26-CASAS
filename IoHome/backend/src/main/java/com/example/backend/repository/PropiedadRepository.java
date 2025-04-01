package com.example.backend.repository;

import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropiedadRepository extends JpaRepository<Propiedad, Long> {
    List<Propiedad> findByPropietario(Propietario propietario);
}
