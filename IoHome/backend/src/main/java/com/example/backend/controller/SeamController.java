package com.example.backend.controller;

import com.seam.api.types.*;
import com.example.backend.model.Cerradura;
import com.example.backend.service.SeamService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seam")
@CrossOrigin(origins = "http://localhost:5173") // permite llamadas desde React
public class SeamController {

    private final SeamService seamService;

    public SeamController(SeamService seamService) {
        this.seamService = seamService;
    }

    // Obtener información del workspace
    @GetMapping("/workspace")
    public Workspace getWorkspace() {
        return seamService.getWorkspace();
    }

    @GetMapping("/accounts")
    public List<ConnectedAccount> listConnectedAccounts() {
        return seamService.listConnectedAccounts();
    }

    @GetMapping("/webview")
    public ConnectWebview createConnectWebview() {
        return seamService.createConnectWebview();
    }

    @GetMapping("/webview-list")
    public List<ConnectWebview> listWebViews() {
        return seamService.listWebViews();
    }

    // Listar cerraduras disponibles
    @GetMapping("/devices")
    public List<Device> getDevices() {
        return seamService.listDevices();
    }

    // Crear un dispositivo en la base de datos
    @PostMapping("/device/crear/{propietarioId}")
    public ResponseEntity<Cerradura> crearCerradura(@PathVariable Long propietarioId,
            @RequestBody Cerradura cerradura) {
        return ResponseEntity.ok(seamService.crearCerradura(propietarioId, cerradura));
    }

    // Obtener dispositivos de un propietario
    @GetMapping("/device/propietario/{propietarioId}")
    public ResponseEntity<List<Cerradura>> obtenerCerradurasDePropietario(@PathVariable Long propietarioId) {
        return ResponseEntity.ok(seamService.obtenerCerradurasDePropietario(propietarioId));
    }

    // USAR ESTE
    @GetMapping("device/propiedad/{propiedadId}")
    public Cerradura obtenerCerraduraDePropiedad(@PathVariable Long propiedadId) {
        return seamService.obtenerCerraduraDePropiedad(propiedadId);
    }

    // LUEGO ESTE
    @PutMapping("/cerradura/{cerraduraId}/propiedad/{propiedadId}")
    public ResponseEntity<Cerradura> asignarPropiedadACerradura(@PathVariable String cerraduraId,
            @PathVariable Long propiedadId) {
        Cerradura cerraduraActualizada = seamService.asignarPropiedadACerradura(cerraduraId, propiedadId);
        return ResponseEntity.ok(cerraduraActualizada);
    }

    @PostMapping("/lock/{deviceId}")
    public ResponseEntity<?> lockDevice(@PathVariable String deviceId) {
        ActionAttempt response = seamService.lockDoor(deviceId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/unlock/{deviceId}")
    public ResponseEntity<?> unlockDevice(@PathVariable String deviceId) {
        ActionAttempt response = seamService.unlockDoor(deviceId);
        return ResponseEntity.ok(response);
    }

    // Obtener la cerradura de la última reserva activa de un usuario
    @GetMapping("/device/usuario/{usuarioId}/ultima-reserva")
    public ResponseEntity<Cerradura> obtenerCerraduraDeUltimaReserva(@PathVariable Long usuarioId) {
        try {
            Cerradura cerradura = seamService.obtenerCerraduraDeUltimaReserva(usuarioId);
            return ResponseEntity.ok(cerradura);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/device/events/{since}")
    public List<Event> obtenerLogsSeam( @PathVariable String since) {
        return seamService.obtenerLogsDesdeSeam( since);
    }

}
