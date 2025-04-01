package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

import jakarta.persistence.*;

@Entity
public class Cerradura {

    @Id
    private String device_id;

    private String nombre;

    private String tipo;

    @ManyToOne
    @JoinColumn(name = "propiedad_id", nullable = true)
    private Propiedad propiedad;

    @ManyToOne
    @JoinColumn(name = "propietario_id")
    private Propietario propietario;

    public enum EstadoCerradura {
        ACTIVA, DESACTIVADA
    }

    public Cerradura() {
    }

   

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /*
     * 
     * public Propiedad getPropiedad() {
     * return propiedad;
     * }
     * 
     * public void setPropiedad(Propiedad propiedad) {
     * this.propiedad = propiedad;
     * }
     */

    public Propietario getPropietario() { // Getter para Propietario
        return propietario;
    }

    public void setPropietario(Propietario propietario) { // Setter para Propietario
        this.propietario = propietario;
    }
    public String getDevice_id() {
        return device_id;
    }
    public void setDevice_id(String device_id) {
        this.device_id = device_id;
    }
}
