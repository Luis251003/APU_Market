package com.apu.market.apu_market.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apu.market.apu_market.entities.Empleado;

@Repository
public interface EmpleadoRepo extends JpaRepository<Empleado,Long>{

    public Optional<Empleado> findByTelefono(String telefono);
    public Optional<Empleado> findByDni(String dni);

}
