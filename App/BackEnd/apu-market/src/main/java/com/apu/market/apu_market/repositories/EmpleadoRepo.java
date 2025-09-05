package com.apu.market.apu_market.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apu.market.apu_market.entities.Empleado;

import jakarta.transaction.Transactional;

@Repository
public interface EmpleadoRepo extends JpaRepository<Empleado,Long>{

    Optional<Empleado> findByTelefono(String telefono);
    Optional<Empleado> findByDni(String dni);
    List<Empleado> findByEnabledTrue();


    @Modifying
    @Transactional
    @Query("UPDATE Empleado e SET e.enabled = :enabled WHERE e.id = :id")
    void updateEnabled(@Param("id") Long id, @Param("enabled") boolean enabled);
}
