package com.apu.market.apu_market.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apu.market.apu_market.entities.Usuario;
import com.apu.market.apu_market.services.UsuarioService;

@RestController
@RequestMapping("/rest/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<?> getUsuario() {
        List<Usuario> lista = usuarioService.findAll();
        return ResponseEntity.ok().body(lista); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable String id) {
        Usuario usuario = usuarioService.findById(Long.parseLong(id));
        return ResponseEntity.ok().body(usuario);
    }
    
    @PostMapping
    public ResponseEntity<?> postUsuario(@RequestBody Usuario bean) {
        Usuario usuario = usuarioService.create(bean);
        return ResponseEntity.ok().body(usuario);
    }

    @PutMapping
    public ResponseEntity<?> putUsuario(@RequestBody Usuario bean) {
        Usuario usuario = usuarioService.update(bean);
        return ResponseEntity.ok().body(usuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String id){
        boolean response = usuarioService.delete(Long.parseLong(id));
        Map<String,String> body = new HashMap<>();
        body.put("message", "Error al eliminar usuario");
        if(response){
            body.put("message", "El usuario con ID " + id + " ha sido eliminado");
            return ResponseEntity.ok().body(body);
        }
        return ResponseEntity.badRequest().body(body);
    }
}
