package com.apu.market.apu_market.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apu.market.apu_market.dto.CodigoDTO;
import com.apu.market.apu_market.dto.EmailDTO;
import com.apu.market.apu_market.services.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/rest/mail")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<?> sendEmail(@RequestBody EmailDTO entity) {
        String message = emailService.enviarCorreo(entity);
        Map<String,String> body = new HashMap<>();
        body.put("message", message);
        return ResponseEntity.ok().body(body);
    }
    @PostMapping("/verificar")
    public ResponseEntity<?> verificarCodigo(@RequestBody CodigoDTO dto) {
        String codigo = dto.getCodigo();
        String message = emailService.verificarCodigo(codigo);

        Map<String,String> body = new HashMap<>();
        body.put("message", message);
        return ResponseEntity.ok().body(body);
    }
}
