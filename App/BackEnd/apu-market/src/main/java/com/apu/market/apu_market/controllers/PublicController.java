package com.apu.market.apu_market.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.apu.market.apu_market.dto.CodigoDTO;
import com.apu.market.apu_market.dto.EmailDTO;
import com.apu.market.apu_market.dto.MessageDTO;
import com.apu.market.apu_market.dto.PasswordDTO;
import com.apu.market.apu_market.services.EmailService;
import com.apu.market.apu_market.services.UsuarioService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/auth/check")
    public ResponseEntity<?> checkAuth(Authentication authen){
        if (authen != null && authen.isAuthenticated()) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }
    @PostMapping("/enviarCodigo")
    public ResponseEntity<?> sendEmail(@RequestBody EmailDTO entity,HttpSession session) {
        String message = emailService.enviarCorreo(entity);
        MessageDTO messageDTO = new MessageDTO("Envio exitoso",message);
        return ResponseEntity.ok().body(messageDTO);
    }
    @PostMapping("/verificar")
    public ResponseEntity<?> verificarCodigo(@RequestBody CodigoDTO dto) {
        String codigo = dto.getCodigo();
        String message = emailService.verificarCodigo(codigo);
        return ResponseEntity.ok().body(new MessageDTO("Codigo Verificado",message));
    }
    @PostMapping("/passwordReset")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordDTO passwordDTO) {
        String message = usuarioService.passwordReset(passwordDTO);
        return ResponseEntity.ok().body(message);
    }

}
