package com.example.backend.controller;

import com.seam.api.types.*;
import com.example.backend.model.Cerradura;
import com.example.backend.model.Propiedad;
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
    public ResponseEntity<Cerradura> crearCerradura(@PathVariable Long propietarioId, @RequestBody Cerradura cerradura) {
        return ResponseEntity.ok(seamService.crearCerradura(propietarioId, cerradura));
    }

    // Obtener dispositivos de un propietario
    @GetMapping("/device/propietario/{propietarioId}")
    public ResponseEntity<List<Cerradura>> obtenerCerradurasDePropietario(@PathVariable Long propietarioId) {
        return ResponseEntity.ok(seamService.obtenerCerradurasDePropietario(propietarioId));
    }
        

    // Bloquear una cerradura
    @PostMapping("/lock/{deviceId}")
    public String lockDevice(@PathVariable String deviceId) {
        seamService.lockDoor(deviceId);
        return "Cerradura bloqueada con éxito";
    }

    // Desbloquear una cerradura
    @PostMapping("/unlock/{deviceId}")
    public String unlockDevice(@PathVariable String deviceId) {
        seamService.unlockDoor(deviceId);
        return "Cerradura desbloqueada con éxito";
    }
}
