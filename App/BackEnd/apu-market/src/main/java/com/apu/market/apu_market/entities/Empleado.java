package com.apu.market.apu_market.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "tb_empleado")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "empleado_id")
    private Long id;
    @NotBlank
    private String nombre;
    @NotBlank
    private String apellido;
    @NotBlank
    @Pattern(regexp = "^[\\d]{8}$",message = "debe contener solo 8 dígitos")
    @Column(unique = true)
    private String dni;
    @NotBlank
    @Pattern(regexp = "^[9][\\d]{8}$",message = "no es un formato válido")
    @Column(unique = true)
    private String telefono;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    private Boolean enabled;

    public Empleado(){}
    public Empleado(
            @NotBlank String nombre, @NotBlank String apellido,
            @NotBlank @Pattern(regexp = "^[\\d]{8}$", message = "El DNI debe contener solo 8 dígitos") String dni,
            @NotBlank @Pattern(regexp = "^[9][\\d]{8}$", message = "El número telefónico no es valido") String telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
    }


    @PrePersist
    private void defaultValues() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.enabled == null) {
            this.enabled = true;
        }
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
    public String getApellido() {
        return apellido;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
    public String getDni() {
        return dni;
    }
    public void setDni(String dni) {
        this.dni = dni;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public Boolean getEnabled() {
        return enabled;
    }
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
