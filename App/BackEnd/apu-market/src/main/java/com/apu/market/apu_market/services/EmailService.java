package com.apu.market.apu_market.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.apu.market.apu_market.dto.EmailDTO;
import com.apu.market.apu_market.errors.EmailException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public String enviarCorreo(EmailDTO emailDTO){
        try{
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(emailDTO.getPara());
            mensaje.setSubject(emailDTO.getAsunto());
            mensaje.setText(emailDTO.getMensaje());
            mensaje.setFrom(emailFrom);
            javaMailSender.send(mensaje);
            return "Correo enviado con éxito";
        }catch(MailException ex){
            System.err.println(ex.getMessage());
            throw new EmailException(ex.getMessage());
        }
    }
}
