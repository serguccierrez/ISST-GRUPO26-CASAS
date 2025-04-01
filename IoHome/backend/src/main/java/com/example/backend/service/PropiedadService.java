package com.example.backend.service;

import com.example.backend.model.Propiedad;
import com.example.backend.model.Propietario;
import com.example.backend.repository.PropiedadRepository;
import com.example.backend.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepository;

    @Autowired
    private PropietarioRepository propietarioRepository;

    public Propiedad crearPropiedad(Long propietarioId, Propiedad propiedad) {
        Propietario propietario = propietarioRepository.findById(propietarioId)
                .orElseThrow(() -> new IllegalArgumentException("Propietario no encontrado"));
        propiedad.setPropietario(propietario);
        return propiedadRepository.save(propiedad);
    }

    public List<Propiedad> obtenerPropiedadesDePropietario(Long propietarioId) {
        Propietario propietario = propietarioRepository.findById(propietarioId)
                .orElseThrow(() -> new IllegalArgumentException("Propietario no encontrado"));
        return propiedadRepository.findByPropietario(propietario);
    }

    public Propiedad actualizarPropiedad(Long id, Propiedad nuevaPropiedad) {
        Propiedad propiedad = propiedadRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Propiedad no encontrada"));
        propiedad.setNombre(nuevaPropiedad.getNombre());
        propiedad.setDireccion(nuevaPropiedad.getDireccion());
        propiedad.setCiudad(nuevaPropiedad.getCiudad());
        propiedad.setCp(nuevaPropiedad.getCp());
        propiedad.setPiso(nuevaPropiedad.getPiso());
        propiedad.setHabitaciones(nuevaPropiedad.getHabitaciones());
        propiedad.setBanos(nuevaPropiedad.getBanos());
        propiedad.setAireAcondicionado(nuevaPropiedad.isAireAcondicionado());
        propiedad.setCocinaEquipada(nuevaPropiedad.isCocinaEquipada());
        propiedad.setSecador(nuevaPropiedad.isSecador());
        propiedad.setPlancha(nuevaPropiedad.isPlancha());
        propiedad.setCafetera(nuevaPropiedad.isCafetera());
        propiedad.setToallasYSabanas(nuevaPropiedad.isToallasYSabanas());
        propiedad.setPiscina(nuevaPropiedad.isPiscina());
        propiedad.setGaraje(nuevaPropiedad.isGaraje());
        propiedad.setNormas(nuevaPropiedad.getNormas());
        return propiedadRepository.save(propiedad);
    }

    public void eliminarPropiedad(Long id) {
        propiedadRepository.deleteById(id);
    }
}
