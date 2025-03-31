package com.example.backend.service;

import com.seam.api.Seam;
import com.seam.api.types.*;
import com.seam.api.resources.locks.requests.*;
import com.seam.api.resources.connectwebviews.requests.ConnectWebviewsCreateRequest;
import com.seam.api.resources.devices.requests.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SeamService {

    private final Seam seam;

    public SeamService(@Value("${seam.api.key}") String apiKey) {
        this.seam = Seam.builder()
                .apiKey(apiKey) // O el nombre correcto del parámetro
                .build();
    }

    // Obtener información del workspace
    public Workspace getWorkspace() {
        Optional<Workspace> workspace = seam.workspaces().get();
        return workspace.orElseThrow(() -> new RuntimeException("No se pudo obtener el workspace"));
    }

    // Listar cerraduras conectadas al workspace
    public List<Device> listDevices() {
        List<Device> devices = seam.devices().list();
        return devices;
    }

    public List<ConnectedAccount> listConnectedAccounts() {
        List<ConnectedAccount> connectedAccounts = seam.connectedAccounts().list();
        return connectedAccounts;
    }

    public ConnectWebview createConnectWebview() {
        try {
            ConnectWebview createdConnectWebview = seam.connectWebviews().create(
                    ConnectWebviewsCreateRequest.builder()
                            .customRedirectUrl("https://localhost:5173/")
                            .build());
            return createdConnectWebview;
        } catch (Exception e) {
            throw new RuntimeException("Error creando ConnectWebview: " + e.getMessage(), e);
        }
    }


    public List<ConnectWebview> listWebViews() {
        try {
            return seam.connectWebviews().list();
        } catch (Exception e) {
            throw new RuntimeException("Error obteniendo la lista de WebViews: " + e.getMessage(), e);
        }
    }

    // Bloquear una cerradura
    public void lockDoor(String deviceId) {
        seam.locks().lockDoor(LocksLockDoorRequest.builder()
                .deviceId(deviceId)
                .build());
    }

    // Desbloquear una cerradura
    public void unlockDoor(String deviceId) {
        seam.locks().unlockDoor(LocksUnlockDoorRequest.builder()
                .deviceId(deviceId)
                .build());
    }
}
