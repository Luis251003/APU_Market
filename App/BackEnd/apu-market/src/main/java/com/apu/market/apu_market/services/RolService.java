package com.apu.market.apu_market.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apu.market.apu_market.entities.Rol;
import com.apu.market.apu_market.errors.DataNotFound;
import com.apu.market.apu_market.repositories.RolRepo;

@Service
public class RolService {

    @Autowired
    private RolRepo rolRepo;

    //Obtener todos los roles
    public List<Rol> findAll(){
        return rolRepo.findAll();
    }

    //Buscar rol por ID
    public Rol findById(Long id){
        return rolRepo.findById(id).orElseThrow(() -> new DataNotFound("Rol con ID "+id+" no fue encontrado"));
    }
}
