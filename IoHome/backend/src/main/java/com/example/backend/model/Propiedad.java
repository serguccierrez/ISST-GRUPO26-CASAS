package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class Propiedad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String direccion;
    private String ciudad;
    private String cp;
    private String piso;

    private int habitaciones;
    private int banos;
    private boolean aireAcondicionado;
    private boolean cocinaEquipada;
    private boolean secador;
    private boolean plancha;
    private boolean cafetera;
    private boolean toallasYSabanas;
    private boolean piscina;
    private boolean garaje;

    @Lob
    private String normas;

    @ManyToOne
    @JoinColumn(name = "propietario_id")
    private Propietario propietario;

    // Constructor vacío
    public Propiedad() {}

    // Getters y Setters
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getCp() {
        return cp;
    }

    public void setCp(String cp) {
        this.cp = cp;
    }

    public String getPiso() {
        return piso;
    }

    public void setPiso(String piso) {
        this.piso = piso;
    }

    public int getHabitaciones() {
        return habitaciones;
    }

    public void setHabitaciones(int habitaciones) {
        this.habitaciones = habitaciones;
    }

    public int getBanos() {
        return banos;
    }

    public void setBanos(int banos) {
        this.banos = banos;
    }

    public boolean isAireAcondicionado() {
        return aireAcondicionado;
    }

    public void setAireAcondicionado(boolean aireAcondicionado) {
        this.aireAcondicionado = aireAcondicionado;
    }

    public boolean isCocinaEquipada() {
        return cocinaEquipada;
    }

    public void setCocinaEquipada(boolean cocinaEquipada) {
        this.cocinaEquipada = cocinaEquipada;
    }

    public boolean isSecador() {
        return secador;
    }

    public void setSecador(boolean secador) {
        this.secador = secador;
    }

    public boolean isPlancha() {
        return plancha;
    }

    public void setPlancha(boolean plancha) {
        this.plancha = plancha;
    }

    public boolean isCafetera() {
        return cafetera;
    }

    public void setCafetera(boolean cafetera) {
        this.cafetera = cafetera;
    }

    public boolean isToallasYSabanas() {
        return toallasYSabanas;
    }

    public void setToallasYSabanas(boolean toallasYSabanas) {
        this.toallasYSabanas = toallasYSabanas;
    }

    public boolean isPiscina() {
        return piscina;
    }

    public void setPiscina(boolean piscina) {
        this.piscina = piscina;
    }

    public boolean isGaraje() {
        return garaje;
    }

    public void setGaraje(boolean garaje) {
        this.garaje = garaje;
    }

    public String getNormas() {
        return normas;
    }

    public void setNormas(String normas) {
        this.normas = normas;
    }

    public Propietario getPropietario() {
        return propietario;
    }

    public void setPropietario(Propietario propietario) {
        this.propietario = propietario;
    }
}
