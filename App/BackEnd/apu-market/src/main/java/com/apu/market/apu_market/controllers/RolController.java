package com.apu.market.apu_market.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apu.market.apu_market.entities.Rol;
import com.apu.market.apu_market.services.RolService;

@RestController
@RequestMapping("/rol")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public ResponseEntity<?> getRol() {
        List<Rol> lista = rolService.findAll();
        return ResponseEntity.ok().body(lista); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRolById(@PathVariable String id) {
        Rol rol = rolService.findById(Long.parseLong(id));
        return ResponseEntity.ok().body(rol);
    }
}
