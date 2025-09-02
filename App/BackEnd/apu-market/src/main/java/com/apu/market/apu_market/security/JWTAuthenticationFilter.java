package com.apu.market.apu_market.security;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.apu.market.apu_market.dto.LoginRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    private final AuthenticationManager authenticationManager;
    private final SecretKey secretKey;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,SecretKey secretKey){
        this.authenticationManager=authenticationManager;
        this.secretKey=secretKey;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try{
            LoginRequestDTO usuario = new ObjectMapper().readValue(request.getInputStream(), LoginRequestDTO.class);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getPassword());
            return authenticationManager.authenticate(authenticationToken);
        }catch(IOException e){
            throw new RuntimeException("Error al leer el JSON de login", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        //Obtenemos los datos del usuario
        User user = (User)authResult.getPrincipal();
        String username = user.getUsername();

        //Definimo los roles
        Set<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);

        //Generamos el TOKEN
        String token = Jwts.builder()
            .subject(username)
            .claims().add(claims).and()
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 3600000))//1 hora
            .signWith(secretKey, Jwts.SIG.HS256)
            .compact();
        
        //CREAR COOKIES
        Cookie cookie = new Cookie(JWTConfig.COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(isHttps(request));
        cookie.setPath("/");
        cookie.setMaxAge(JWTConfig.COOKIE_EXPIRATION_SECONDS);

        String sameSiteCookie = String.format("%s=%s; Path=%s; Max-Age=%d; HttpOnly; %s; SameSite=Strict",
            JWTConfig.COOKIE_NAME, token, "/", JWTConfig.COOKIE_EXPIRATION_SECONDS,
            isHttps(request) ? "Secure" : "");
        response.setHeader("Set-Cookie", sameSiteCookie);
        response.addHeader(JWTConfig.HEADER_AUTHORIZATION, JWTConfig.PREFIX_TOKEN);
        response.setContentType(JWTConfig.CONTENT_TYPE);
        response.setStatus(HttpServletResponse.SC_OK);
        response.addCookie(cookie);

        Map<String, Object> body = new HashMap<>();
        body.put("username", username);
        body.put("roles", roles);

        new ObjectMapper().writeValue(response.getOutputStream(), body);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, Object> body = new HashMap<>();
        body.put("error", "Credenciales inválidas");
        body.put("mensaje", failed.getMessage());

        new ObjectMapper().writeValue(response.getOutputStream(), body);
    }

    private boolean isHttps(HttpServletRequest request) {
        return request.isSecure() ||
        "https".equalsIgnoreCase(request.getHeader("X-Forwarded-Proto"));
    }
}
