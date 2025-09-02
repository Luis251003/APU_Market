package com.apu.market.apu_market.repositories;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.apu.market.apu_market.entities.Usuario;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario,Long>{

    public Optional<Usuario> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Usuario u SET u.password = :password WHERE u.email = :email")
    public int updatePasswordByEmail(String email,String password);

    @Query("""
        SELECT DISTINCT p.codigo
        FROM Usuario u
        JOIN u.roles r
        JOIN r.permisos p
        WHERE u.email = :email
    """)
    Set<String> findPermisosByEmail(@Param("email") String email);

}
