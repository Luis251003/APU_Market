package com.apu.market.apu_market.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTValidationFilter extends BasicAuthenticationFilter{

    private final SecretKey secretKey;

    public JWTValidationFilter(AuthenticationManager authenticationManager,SecretKey secretKey) {
        super(authenticationManager);
        this.secretKey=secretKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String token = getTokenFromCookies(request);
        if (token==null) {
            chain.doFilter(request, response);
            return;
        }
        try{
            Claims claims = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            String username = claims.getSubject();
            if(username!=null){
                // Obtenemos los roles como cadena JSON
                Object rolesObject = claims.get("roles");

                // Convertimos a lista de strings
                ObjectMapper mapper = new ObjectMapper();
                byte[] rolesBytes = mapper.writeValueAsBytes(rolesObject);
                String[] roles = mapper.readValue(rolesBytes, String[].class);

                Collection<GrantedAuthority> authorities = Arrays.stream(roles)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toSet());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }  catch (JwtException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");

            Map<String, Object> body = new HashMap<>();
            body.put("error", "Token inválido o expirado");
            body.put("message", e.getMessage());

            new ObjectMapper().writeValue(response.getOutputStream(), body);
            return;
        }
        chain.doFilter(request, response);
    }

    private String getTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (JWTConfig.COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
