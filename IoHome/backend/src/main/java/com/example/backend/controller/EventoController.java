package com.example.backend.controller;


import com.example.backend.model.Evento;
import com.example.backend.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.repository.EventoRepository;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Autowired
    private EventoRepository eventoRepository;

    @PostMapping("/guardar")
    public ResponseEntity<Evento> guardarEvento(@RequestParam String eventId,
            @RequestParam String deviceId,
            @RequestParam String descripcion,
            @RequestParam String status,
            @RequestParam String actionType) {
        try {
            // Llamamos al servicio para guardar el evento, 'occurredAt' se genera
            // automáticamente
            Evento evento = eventoService.guardarEventoDesdeParametros(eventId, deviceId, descripcion, status,
                    actionType);
            return ResponseEntity.ok(evento); // Retornamos el evento guardado con un código 200
        } catch (IllegalArgumentException e) {
            // Si no se encuentra la cerradura, retornamos un error 404
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            // Manejamos otros posibles errores
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/all/{ownerId}")
    public ResponseEntity<List<Evento>> obtenerEventosPorPropietario(@PathVariable Long ownerId) {
        try {
            List<Evento> eventos = eventoService.obtenerEventosPorPropietario(ownerId);
            if (eventos.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(eventos);
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping("/{deviceId}")
    public ResponseEntity<List<Evento>> obtenerEventosPorDeviceId(@PathVariable String deviceId) {
        List<Evento> eventos = eventoService.obtenerEventos(deviceId);
        if (eventos.isEmpty()) {
            return ResponseEntity.noContent().build();  
        } else {
            return ResponseEntity.ok(eventos);
        }

        
    }
    @DeleteMapping("elimina/{id}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable String id) {
        try {
            if (eventoRepository.existsById(id)) {
                eventoRepository.deleteById(id);
                return ResponseEntity.noContent().build(); // Retorna 204 No Content si se elimina correctamente
            } else {
                return ResponseEntity.status(404).build(); // Retorna 404 si no se encuentra el evento
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // Manejo de otros errores
        }
    }
}
