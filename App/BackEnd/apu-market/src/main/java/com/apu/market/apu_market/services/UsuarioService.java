package com.apu.market.apu_market.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apu.market.apu_market.entities.Rol;
import com.apu.market.apu_market.entities.Usuario;
import com.apu.market.apu_market.errors.DataNotFound;
import com.apu.market.apu_market.repositories.RolRepo;
import com.apu.market.apu_market.repositories.UsuarioRepo;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    private RolRepo rolRepo;

    //Obtener todos los usuarios
    public List<Usuario> findAll(){
        return usuarioRepo.findAll();
    }

    //Buscar usuario por ID
    public Usuario findById(Long id){
        return usuarioRepo.findById(id).orElseThrow(() -> new DataNotFound("Usuario con ID "+id+" no fue encontrado"));
    }

    //Registrar usuario
    @Transactional
    public Usuario create(Usuario bean){

        //Interceptando roles
        Set<Rol> roles = new HashSet<>();

        //Validamos si hay entrada de roles
        if(roles.size()!=0){
            Rol rolDB = rolRepo.findByNombre("ROLE_USER");
            roles.add(rolDB);
        }

        //Obtenemos los roles
        for (Rol rol : bean.getRoles()) {
        Rol rolDB = rolRepo.findById(rol.getId())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado con ID: " + rol.getId()));
            roles.add(rolDB);
        }
        //Guardamos los roles registrados
        bean.setRoles(roles);
        
        //Registramos el usuario
        return usuarioRepo.save(bean);
    }

    //Actualizar usuario
    @Transactional
    public Usuario update(Usuario bean){
        return usuarioRepo.save(bean);
    }

    //Eliminar usuario
    @Transactional
    public boolean delete(Long id){
        if(this.findById(id) != null){
            usuarioRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
