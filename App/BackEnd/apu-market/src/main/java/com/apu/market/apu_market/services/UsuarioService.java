package com.apu.market.apu_market.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apu.market.apu_market.entities.Usuario;
import com.apu.market.apu_market.errors.DataNotFound;
import com.apu.market.apu_market.repositories.UsuarioRepo;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepo usuarioRepo;

    //Obtener todos los usuarios
    public List<Usuario> findAll(){
        return usuarioRepo.findAll();
    }

    //Buscar usuario por ID
    public Usuario findById(Long id){
        return usuarioRepo.findById(id).orElseThrow(() -> new DataNotFound("Usuario con ID "+id+" no fue encontrado"));
    }

    //Registrar usuario
    public Usuario create(Usuario bean){
        return usuarioRepo.save(bean);
    }

    //Actualizar usuario
    public Usuario update(Usuario bean){
        return usuarioRepo.save(bean);
    }

    //Eliminar usuario
    public boolean delete(Long id){
        if(this.findById(id) != null){
            usuarioRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
