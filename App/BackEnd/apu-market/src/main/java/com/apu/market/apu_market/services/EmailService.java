package com.apu.market.apu_market.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.apu.market.apu_market.configuration.CodigoRecuperacionUtil;
import com.apu.market.apu_market.dto.EmailDTO;
import com.apu.market.apu_market.errors.EmailException;
import com.apu.market.apu_market.errors.ValidateException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private UsuarioService usuarioService;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public String enviarCorreo(EmailDTO emailDTO){
        try{
            //Verificar que el correo este registrado
            if(usuarioService.findByEmail(emailDTO.getDestinatario()) == null){
                throw new EmailException("El correo ingresado no se encuentra registrado");
            }
            //Generar codigo de seguridad
            String codigo = CodigoRecuperacionUtil.generarCodigo();

            //Preparar HTML con Thymeleaf
            Context context = new Context();
            context.setVariable("codigo",codigo) ;
            String htmlContent = templateEngine.process("email/plantilla-codigo-seguridad", context);

            //Crear el correo con contenido HTML
            MimeMessage mensaje = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(emailDTO.getDestinatario());
            helper.setSubject("Codigo de seguridad para recuperar contraseña");
            helper.setFrom(emailFrom);
            helper.setText(htmlContent, true);

            javaMailSender.send(mensaje);
            
            return "Correo HTML enviado correctamente.";
        }catch(MessagingException ex){
            System.err.println(ex.getMessage());
            throw new EmailException(ex.getMessage());
        }
    }

    public String verificarCodigo(String codigo){
        if(CodigoRecuperacionUtil.getCodeRecovery() != Integer.parseInt(codigo)){
            throw new ValidateException("El codigo de seguridad es incorrecto");
        }
        return "El codigo de seguridad es valido";
    }
}
