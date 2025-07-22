package com.apu.market.apu_market.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apu.market.apu_market.entities.Usuario;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario,Long>{

    public Optional<Usuario> findByEmail(String email);
}
