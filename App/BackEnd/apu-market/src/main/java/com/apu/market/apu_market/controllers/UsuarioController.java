package com.apu.market.apu_market.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apu.market.apu_market.dto.MessageDTO;
import com.apu.market.apu_market.entities.Usuario;
import com.apu.market.apu_market.security.JWTConfig;
import com.apu.market.apu_market.services.UsuarioService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/usuario")
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

    @GetMapping("/permisos/{email}")
    public ResponseEntity<?> getPermisosByEmail(@PathVariable String email){
        Set<String> permisos = usuarioService.getPermisosByUsername(email);
        return ResponseEntity.ok().body(permisos);
    }
    
    @PostMapping
    public ResponseEntity<?> postUsuario(@Valid @RequestBody Usuario bean, BindingResult result) {
        if(result.hasErrors()){
            return validar(result);
        }
        Usuario usuario = usuarioService.create(bean);
        return ResponseEntity.ok().body(usuario);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response,HttpServletRequest request) {
        Cookie cookie = new Cookie(JWTConfig.COOKIE_NAME, null);
        cookie.setHttpOnly(isHttps(request));
        cookie.setPath("/");    // mismo path que usaste al crearla
        cookie.setMaxAge(0);    // expira inmediatamente
        response.addCookie(cookie);

        return ResponseEntity.ok().body(new MessageDTO("Sesion Cerrada", "La sesión ha sido cerrada con exito"));
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
    
    private ResponseEntity<?> validar(BindingResult result) {
        Map<String,String> body = new HashMap<>();
        for(FieldError error: result.getFieldErrors()){
            body.put(error.getField(), error.getField().concat(" ").concat(error.getDefaultMessage()));
        }
        return ResponseEntity.badRequest().body(body);
    }

    private boolean isHttps(HttpServletRequest request) {
        return request.isSecure() ||
        "https".equalsIgnoreCase(request.getHeader("X-Forwarded-Proto"));
    }
}
