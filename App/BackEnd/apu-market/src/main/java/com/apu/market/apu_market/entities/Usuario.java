package com.apu.market.apu_market.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "TB_Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Usuario_ID")
    private Long id;

    private String email;
    private String password;
    private boolean enabled;
    private LocalDate createdAt;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Empleado_ID")
    private Empleado empleado;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "TB_usuario_rol",
        joinColumns = @JoinColumn(name="Usuario_ID"),
        inverseJoinColumns = @JoinColumn(name="Rol_ID")
    )
    private Set<Rol> roles = new HashSet<>();

    public Usuario(){}

    public Usuario(String email, String password, boolean enabled, Empleado empleado,Set<Rol> roles) {
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.empleado = empleado;
        this.roles = roles;
    }

    @PrePersist
    private void defaultValues(){
        this.createdAt=LocalDate.now();
        this.enabled=true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Set<Rol> getRoles() {
        return roles;
    }

    public void setRoles(Set<Rol> roles) {
        this.roles = roles;
    }
}

