package com.apu.market.apu_market.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.apu.market.apu_market.dto.EmailDTO;
import com.apu.market.apu_market.errors.EmailException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public String enviarCorreo(EmailDTO emailDTO){
        try{

            //Preparar HTML con Thymeleaf
            Context context = new Context();
            context.setVariable("codigo", "54321");
            String htmlContent = templateEngine.process("email/plantilla-codigo-seguridad", context);

            //Crear el correo con contenido HTML
            MimeMessage mensaje = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(emailDTO.getPara());
            helper.setSubject(emailDTO.getAsunto());
            helper.setFrom(emailFrom);
            helper.setText(htmlContent, true);

            // Adjuntar imagen embebida
            // ClassPathResource imagen = new ClassPathResource("/static/images/logo_apu_core.png");
            // helper.addInline("logoCorreo", imagen); // "logoCorreo" debe coincidir con el cid del HTML

            javaMailSender.send(mensaje);
            return "Correo HTML enviado correctamente.";
        }catch(MessagingException ex){
            System.err.println(ex.getMessage());
            throw new EmailException(ex.getMessage());
        }
    }
}
