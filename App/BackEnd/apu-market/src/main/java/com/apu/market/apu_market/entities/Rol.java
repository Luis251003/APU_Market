package com.apu.market.apu_market.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "TB_Rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Rol_ID")
    private Long id;
    private String nombre;
    private String descripcion;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "TB_rol_permiso",
        joinColumns = @JoinColumn(name="Rol_ID"),
        inverseJoinColumns = @JoinColumn(name="Permiso_ID")
    )
    private Set<Permiso> permisos = new HashSet<>();

    public Rol(){}
    public Rol(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
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
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public Set<Permiso> getPermisos() {
        return permisos;
    }
    public void setPermisos(Set<Permiso> permisos) {
        this.permisos = permisos;
    }
    
}
