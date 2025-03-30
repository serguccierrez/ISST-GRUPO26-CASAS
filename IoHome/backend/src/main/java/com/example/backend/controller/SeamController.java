package com.example.backend.controller;



import com.seam.api.types.*;
import com.example.backend.service.SeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seam")
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

    // Listar cerraduras disponibles
    @GetMapping("/devices")
    public List<Device> getDevices() {
        return seamService.listDevices();
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

