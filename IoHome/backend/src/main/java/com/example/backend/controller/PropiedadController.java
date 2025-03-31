package com.example.backend.controller;

import java.util.List;

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
import com.example.backend.service.PropiedadService;

@RestController
@RequestMapping("/api/propiedades")
@CrossOrigin(origins = "http://localhost:5173")  // Permite solicitudes desde el frontend
public class PropiedadController {

    @Autowired
    private PropiedadService propiedadService;

    @PostMapping("/crear/{propietarioId}")
    public ResponseEntity<Propiedad> crearPropiedad(@PathVariable Long propietarioId, @RequestBody Propiedad propiedad) {
        return ResponseEntity.ok(propiedadService.crearPropiedad(propietarioId, propiedad));
    }

    @GetMapping("/propietario/{propietarioId}")
    public ResponseEntity<List<Propiedad>> obtenerPropiedadesDePropietario(@PathVariable Long propietarioId) {
        return ResponseEntity.ok(propiedadService.obtenerPropiedadesDePropietario(propietarioId));
    }

    
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Propiedad> actualizarPropiedad(@PathVariable Long id, @RequestBody Propiedad propiedad) {
        return ResponseEntity.ok(propiedadService.actualizarPropiedad(id, propiedad));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarPropiedad(@PathVariable Long id) {
        propiedadService.eliminarPropiedad(id);
        return ResponseEntity.noContent().build();
    }
}
