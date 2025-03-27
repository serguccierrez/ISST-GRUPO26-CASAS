package com.example.backend.controller;

import com.example.backend.model.Propiedad;
import com.example.backend.service.PropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/propiedades")
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
}
