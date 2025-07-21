package com.apu.market.apu_market.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apu.market.apu_market.entities.Empleado;

@Repository
public interface EmpleadoRepo extends JpaRepository<Empleado,Long>{

}
