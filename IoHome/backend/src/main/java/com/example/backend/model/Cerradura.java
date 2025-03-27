package com.example.backend.model;

import jakarta.persistence.*;

@Entity
public class Cerradura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Enumerated(EnumType.STRING)
    private TipoCerradura tipo;

    @Enumerated(EnumType.STRING)
    private EstadoCerradura estado;

    @ManyToOne
    @JoinColumn(name = "propiedad_id")
    private Propiedad propiedad;

    public enum TipoCerradura {
        PIN, BLUETOOTH
    }

    public enum EstadoCerradura {
        ACTIVA, DESACTIVADA
    }

    public Cerradura() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoCerradura getTipo() {
        return tipo;
    }

    public void setTipo(TipoCerradura tipo) {
        this.tipo = tipo;
    }

    public EstadoCerradura getEstado() {
        return estado;
    }

    public void setEstado(EstadoCerradura estado) {
        this.estado = estado;
    }

    public Propiedad getPropiedad() {
        return propiedad;
    }

    public void setPropiedad(Propiedad propiedad) {
        this.propiedad = propiedad;
    }


}
