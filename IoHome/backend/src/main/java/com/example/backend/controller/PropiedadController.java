package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.service.PropiedadService;
import com.example.backend.repository.PropietarioRepository;
import com.example.backend.repository.PropiedadRepository;

@RestController
@RequestMapping("/api/propiedades")
@CrossOrigin(origins = "http://localhost:5173")  // Permite solicitudes desde el frontend
public class PropiedadController {

    @Autowired
    private PropiedadRepository propiedadRepository;  // Asegúrate de tener este repositorio inyectado
    
    @Autowired
    private PropiedadService propiedadService;

    @Autowired
    private PropietarioRepository propietarioRepository;

    @PostMapping("/crear/{propietarioId}")
    public ResponseEntity<Propiedad> crearPropiedad(@PathVariable Long propietarioId, @RequestBody Propiedad propiedad) {
        Optional<Propietario> propietario = propietarioRepository.findById(propietarioId);
        if (!propietario.isPresent()) {
            return ResponseEntity.notFound().build();  // Retorna 404 si no se encuentra el propietario
        }
        
        return ResponseEntity.ok(propiedadService.crearPropiedad(propietarioId, propiedad));
    }

    @GetMapping("/propietario/{propietarioId}")
    public ResponseEntity<List<Propiedad>> obtenerPropiedadesDePropietario(@PathVariable Long propietarioId) {
        Optional<Propietario> propietario = propietarioRepository.findById(propietarioId);
        if (!propietario.isPresent()) {
            return ResponseEntity.notFound().build();  // Retorna 404 si no se encuentra el propietario
        }

        return ResponseEntity.ok(propiedadService.obtenerPropiedadesDePropietario(propietarioId));
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Propiedad> actualizarPropiedad(@PathVariable Long id, @RequestBody Propiedad propiedad) {
        Optional<Propiedad> propiedadExistente = propiedadRepository.findById(id);
        if (!propiedadExistente.isPresent()) {
            return ResponseEntity.notFound().build();  // Retorna 404 si no se encuentra la propiedad
        }

        return ResponseEntity.ok(propiedadService.actualizarPropiedad(id, propiedad));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarPropiedad(@PathVariable Long id) {
        Optional<Propiedad> propiedadExistente = propiedadRepository.findById(id);
        if (!propiedadExistente.isPresent()) {
            return ResponseEntity.notFound().build();  // Retorna 404 si no se encuentra la propiedad
        }
        
        propiedadService.eliminarPropiedad(id);
        return ResponseEntity.noContent().build();
    }
}
