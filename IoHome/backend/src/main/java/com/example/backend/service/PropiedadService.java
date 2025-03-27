package com.example.backend.service;

import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.repository.PropiedadRepository;
import com.example.backend.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepository;

    @Autowired
    private PropietarioRepository propietarioRepository;

    public Propiedad crearPropiedad(Long propietarioId, Propiedad propiedad) {
        Propietario propietario = propietarioRepository.findById(propietarioId)
                .orElseThrow(() -> new IllegalArgumentException("Propietario no encontrado"));
        propiedad.setPropietario(propietario);
        return propiedadRepository.save(propiedad);
    }

    public List<Propiedad> obtenerPropiedadesDePropietario(Long propietarioId) {
        Propietario propietario = propietarioRepository.findById(propietarioId)
                .orElseThrow(() -> new IllegalArgumentException("Propietario no encontrado"));
        return propiedadRepository.findByPropietario(propietario);
    }
}
