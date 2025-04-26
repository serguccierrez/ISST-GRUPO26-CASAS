package com.example.backend.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Cerradura;
import com.example.backend.model.Evento;
import com.example.backend.model.Propietario;
import com.example.backend.repository.CerraduraRepository;
import com.example.backend.repository.EventoRepository;
import com.example.backend.repository.PropietarioRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private CerraduraRepository cerraduraRepository;

    @Autowired
    private PropietarioRepository propietarioRepository;

    public Evento guardarEventoDesdeParametros(String eventId, String deviceId, String descripcion, String status,
                                                String actionType) {
        // Recuperamos la cerradura por el deviceId
        Cerradura cerradura = cerraduraRepository.findById(deviceId).orElse(null);
        if (cerradura == null) {
            throw new IllegalArgumentException("No se encontró la cerradura con ID: " + deviceId);
        }

        // Creamos el evento
        Evento evento = new Evento();
        evento.setEvent_id(eventId);
        evento.setCerradura(cerradura);
        evento.setDescripcion(descripcion);
        evento.setStatus(status);
        evento.setActionType(actionType);
        
        // Asignamos la fecha y hora actual
        evento.setOccurredAt(LocalDateTime.now());

        // Guardamos el evento en la base de datos
        return eventoRepository.save(evento);
    }

    public List<Evento> obtenerEventos(String deviceId) {
        Cerradura cerradura = cerraduraRepository.findById(deviceId).orElse(null);
        if (cerradura == null) {
            throw new IllegalArgumentException("No se encontró la cerradura con ID: " + deviceId);
        }
        return eventoRepository.findByCerradura(cerradura);
    }

    public List<Evento> obtenerTodosLosEventos() {
        return eventoRepository.findAll();
    }

    public List<Evento> obtenerEventosPorPropietario(Long propietarioId) {
        // Buscamos al propietario
        Propietario propietario = propietarioRepository.findById(propietarioId)
            .orElseThrow(() -> new IllegalArgumentException("No se encontró propietario con ID: " + propietarioId));

        // Buscamos cerraduras asociadas al propietario
        List<Cerradura> cerraduras = cerraduraRepository.findByPropietario(propietario);

        if (cerraduras.isEmpty()) {
            return List.of(); // Retornamos lista vacía si no hay cerraduras
        }

        // Buscamos eventos de esas cerraduras
        return eventoRepository.findByCerraduraIn(cerraduras);
    }
}
    
    

