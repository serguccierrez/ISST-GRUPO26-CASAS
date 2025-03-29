package com.example.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Propietario;
import com.example.backend.repository.PropietarioRepository;

@Service
public class PropietarioService {

    @Autowired
    private PropietarioRepository propietarioRepository;

    public Propietario actualizarPropietario(Long id, Propietario propietario) {
        Optional<Propietario> existente = propietarioRepository.findById(id);
        if (existente.isPresent()) {
            Propietario p = existente.get();
            p.setNombre(propietario.getNombre());
            p.setApellidos(propietario.getApellidos());
            p.setDni(propietario.getDni());
            p.setCorreoElectronico(propietario.getCorreoElectronico());
            p.setTelefono(propietario.getTelefono());
            return propietarioRepository.save(p);
        }
        return null;
    }

    public Propietario obtenerPropietario(Long id) {
        return propietarioRepository.findById(id).orElse(null);
    }
}
