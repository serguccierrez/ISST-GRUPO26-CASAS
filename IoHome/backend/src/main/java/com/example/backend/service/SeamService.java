package com.example.backend.service;

import com.example.backend.model.Cerradura;
import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.model.Reserva;
import com.example.backend.repository.CerraduraRepository;
import com.example.backend.repository.PropietarioRepository;
import com.example.backend.repository.PropiedadRepository;
import com.seam.api.Seam;
import com.seam.api.types.*;
import com.seam.api.resources.locks.requests.*;
import com.seam.api.resources.connectwebviews.requests.ConnectWebviewsCreateRequest;
import com.seam.api.resources.events.requests.EventsListRequest; 




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SeamService {

     @Autowired
    private CerraduraRepository cerraduraRepository;

    @Autowired
    private PropietarioRepository propietarioRepository;

   @Autowired
    private PropiedadRepository propiedadRepository; // Asegúrate de inyectar PropiedadRepository
    private final Seam seam;

    @Autowired
    private ReservaService reservaService;


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

    
    public Cerradura crearCerradura(Long propietarioId, Cerradura cerradura) {
        Propietario propietario = propietarioRepository.findById(propietarioId)
                .orElseThrow(() -> new IllegalArgumentException("Propietario no encontrado"));
        cerradura.setPropietario(propietario);
        return cerraduraRepository.save(cerradura);
    }

 
    
    public Cerradura asignarPropiedadACerradura(String cerraduraId, Long propiedadId) {
        // Buscar la cerradura por ID
        Cerradura cerradura = cerraduraRepository.findById(cerraduraId)
                .orElseThrow(() -> new IllegalArgumentException("Cerradura con ID " + cerraduraId + " no encontrada"));
    
        // Buscar la propiedad por ID
        Propiedad propiedad = propiedadRepository.findById(propiedadId) // Usar propiedadRepository en lugar de PropiedadRepository
                .orElseThrow(() -> new IllegalArgumentException("Propiedad con ID " + propiedadId + " no encontrada"));
    
        // Asignar la propiedad a la cerradura
        cerradura.setPropiedad(propiedad);
    
        // Guardar la cerradura actualizada
        return cerraduraRepository.save(cerradura);
    }
        

    public List<Cerradura> obtenerCerradurasDePropietario(Long propietarioId) {
        Propietario propietario = propietarioRepository.findById(propietarioId)
                .orElseThrow(() -> new IllegalArgumentException("Propietario no encontrado"));
        return cerraduraRepository.findByPropietario(propietario);
    }

    public Cerradura obtenerCerraduraDePropiedad(Long propiedadId) {
        // Buscar la propiedad por ID
        Propiedad propiedad = propiedadRepository.findById(propiedadId)
                .orElseThrow(() -> new IllegalArgumentException("Propiedad con ID " + propiedadId + " no encontrada"));
        
        // Buscar la cerradura asociada a la propiedad
        Cerradura cerradura = cerraduraRepository.findByPropiedad(propiedad);
        
        if (cerradura == null) {
            throw new IllegalArgumentException("No se encontró cerradura asociada a la propiedad con ID " + propiedadId);
        }
        
        return cerradura;
    }
    

    public ActionAttempt lockDoor(String deviceId) {
        return seam.locks().lockDoor(LocksLockDoorRequest.builder()
                .deviceId(deviceId)
                .build());
    }
    
    public ActionAttempt unlockDoor(String deviceId) {
        return seam.locks().unlockDoor(LocksUnlockDoorRequest.builder()
                .deviceId(deviceId)
                .build());
    }

    public Cerradura obtenerCerraduraDeUltimaReserva(Long usuarioId) {
    // Obtener la última reserva activa del usuario
    Reserva ultimaReserva = reservaService.obtenerUltimaReservaActiva(usuarioId);
    if (ultimaReserva != null) {
        Long propiedadId = ultimaReserva.getPropiedad().getId();
        return obtenerCerraduraDePropiedad(propiedadId);
    }
    throw new RuntimeException("No se encontró cerradura para la última reserva activa.");
    }

//Obtener logs (events) de una cerradura filtrando por su id asociado a una propiedad y un intervalo de tiempo
public List<Event> obtenerLogsDesdeSeam( String since) {
    
    // Construir la solicitud con el deviceId y el intervalo de tiempo
    EventsListRequest request = EventsListRequest.builder()
            .since(since )
            .build();

    // Llamada a la API de Seam con la solicitud construida
    try {
        return seam.events().list(request); // Devuelve la lista de eventos
    } catch (Exception e) {
        throw new RuntimeException("Error HUHIUGFUISFD al obtener los logs desde Seam: " + e.getMessage(), e);
    }
}






}




