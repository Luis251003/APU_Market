package com.apu.market.apu_market.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apu.market.apu_market.entities.Rol;

@Repository
public interface RolRepo extends JpaRepository<Rol,Long>{

}
