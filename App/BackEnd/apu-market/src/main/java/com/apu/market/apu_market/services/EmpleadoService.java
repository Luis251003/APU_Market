package com.apu.market.apu_market.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apu.market.apu_market.entities.Empleado;
import com.apu.market.apu_market.errors.DataNotFound;
import com.apu.market.apu_market.repositories.EmpleadoRepo;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepo empleadoRepo;

    //Obtener todos los empleados
    public List<Empleado> findAll(){
        return empleadoRepo.findAll();
    }

    //Buscar empleado por ID
    public Empleado findById(Long id){
        return empleadoRepo.findById(id).orElseThrow(() -> new DataNotFound("Empleado con ID "+id+" no fue encontrado"));
    }

    //Registrar empleado
    public Empleado create(Empleado bean){
        return empleadoRepo.save(bean);
    }

    //Actualizar empleado
    public Empleado update(Empleado bean){
        return empleadoRepo.save(bean);
    }

    //Eliminar empleado
    public boolean delete(Long id){
        if(this.findById(id) != null){
            empleadoRepo.deleteById(id);
            return true;
        }
        return false;
    }

}
