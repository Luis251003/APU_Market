package com.apu.market.apu_market.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apu.market.apu_market.entities.Empleado;
import com.apu.market.apu_market.errors.DataNotFound;
import com.apu.market.apu_market.errors.ValidateException;
import com.apu.market.apu_market.repositories.EmpleadoRepo;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepo empleadoRepo;

    //Obtener todos los empleados
    public List<Empleado> findAll(){
        return empleadoRepo.findByEnabledTrue();
    }

    //Buscar empleado por ID
    public Empleado findById(Long id){
        return empleadoRepo.findById(id).orElseThrow(() -> new DataNotFound("Empleado con ID "+id+" no fue encontrado"));
    }

    //Buscar empleado por teléfono
    public Empleado findByTelefono(String telefono){
        return empleadoRepo.findByTelefono(telefono).orElse(null);
    }

    //Buscar empleado por DNI
    public Empleado findByDni(String dni){
        return empleadoRepo.findByDni(dni).orElse(null);
    }

    //Registrar empleado
    public Empleado create(Empleado bean){
        //Validamos duplicación de telefono y DNI
        if(findByTelefono(bean.getTelefono())!=null){
            throw new ValidateException("El teléfono ya se encuentra registrado");
        }
        if(findByDni(bean.getDni())!=null){
            throw new ValidateException("El DNI ya se encuentra registrado");
        }
        return empleadoRepo.save(bean);
    }

    //Actualizar empleado
    public Empleado update(Long id,Empleado bean){
        bean.setId(id);
        return empleadoRepo.save(bean);
    }

    //Eliminar empleado
    public boolean delete(Long id){
        if(this.findById(id) != null){
            empleadoRepo.updateEnabled(id,false);
            return true;
        }
        return false;
    }

}
