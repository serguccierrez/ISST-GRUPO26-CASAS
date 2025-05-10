package com.example.backend.controller;

import com.example.backend.model.Propietario;
import com.example.backend.repository.PropietarioRepository;
import com.example.backend.service.PropietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/propietarios")
public class PropietarioController {

    @Autowired
    private PropietarioService propietarioService;

    @Autowired
    private PropietarioRepository propietarioRepository;

    @PutMapping("/{id}")
    public ResponseEntity<Propietario> actualizarPropietario(@PathVariable Long id,
            @RequestBody Propietario propietario) {
        Propietario actualizado = propietarioService.actualizarPropietario(id, propietario);
        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Propietario> obtenerPropietario(@PathVariable Long id) {
        Propietario propietario = propietarioService.obtenerPropietario(id);
        if (propietario != null) {
            return ResponseEntity.ok(propietario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPropietario(@PathVariable Long id) {
        Optional<Propietario> propietario = propietarioRepository.findById(id);
        if (propietario.isPresent()) {
            propietarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
