package com.example.backend.repository;

import com.example.backend.model.Cerradura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CerraduraRepository extends JpaRepository<Cerradura, Long> {
    List<Cerradura> findByPropiedadId(Long propiedadId);
}
