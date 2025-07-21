package com.apu.market.apu_market.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apu.market.apu_market.entities.Empleado;
import com.apu.market.apu_market.services.EmpleadoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/rest/empleado")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @GetMapping
    public ResponseEntity<?> getEmpleado() {
        List<Empleado> lista = empleadoService.findAll();
        return ResponseEntity.ok().body(lista); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmpleadoById(@PathVariable String id) {
        Empleado emp = empleadoService.findById(Long.parseLong(id));
        return ResponseEntity.ok().body(emp);
    }
    
    @PostMapping
    public ResponseEntity<?> postEmpleado(@RequestBody Empleado bean) {
        Empleado emp = empleadoService.create(bean);
        return ResponseEntity.ok().body(emp);
    }

    @PutMapping
    public ResponseEntity<?> putEmpleado(@RequestBody Empleado bean) {
        Empleado emp = empleadoService.update(bean);
        return ResponseEntity.ok().body(emp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmpleado(@PathVariable String id){
        boolean response = empleadoService.delete(Long.parseLong(id));
        Map<String,String> body = new HashMap<>();
        body.put("message", "Error al eliminar empleado");
        if(response){
            body.put("message", "El empleado con ID " + id + " ha sido eliminado");
            return ResponseEntity.ok().body(body);
        }
        return ResponseEntity.badRequest().body(body);
    }
    
}
