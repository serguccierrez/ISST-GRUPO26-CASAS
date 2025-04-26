package com.example.backend.repository;

import com.example.backend.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.backend.model.Cerradura;

public interface EventoRepository extends JpaRepository<Evento, String> {
  List<Evento> findByCerradura(Cerradura cerradura);

  List<Evento> findByCerraduraIn(List<Cerradura> cerraduras);


}
