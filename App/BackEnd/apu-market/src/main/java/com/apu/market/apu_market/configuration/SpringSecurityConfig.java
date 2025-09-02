package com.apu.market.apu_market.configuration;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.apu.market.apu_market.security.JWTAuthenticationFilter;
import com.apu.market.apu_market.security.JWTValidationFilter;

import io.jsonwebtoken.security.Keys;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Autowired
    AuthenticationConfiguration AC;

    @Value("${spring.security.jwt.secret}")
    private String secret;

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager() throws Exception{
        return AC.getAuthenticationManager();
    }

    @Bean
    public SecretKey jwtSecretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
        .csrf((csrf)->csrf.disable())
        .sessionManagement((mngm)->mngm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilter(new JWTAuthenticationFilter(authenticationManager(),jwtSecretKey()))
        .addFilter(new JWTValidationFilter(authenticationManager(),jwtSecretKey()))
        .authorizeHttpRequests((auth)->auth
            .requestMatchers("/public/**").permitAll()
            .requestMatchers(HttpMethod.GET,"/empleado","/usuario","/usuario/permisos/**","/public/auth/check").hasAnyRole("USER","ADMIN")
            .requestMatchers(HttpMethod.POST,"/empleado","/usuario").hasRole("ADMIN")
            .requestMatchers(HttpMethod.PUT,"/empleado","/usuario").hasRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE,"/empleado","/usuario").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .cors((cors)->cors.configurationSource(corsConfigurationSource()))
        .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:3000","http://localhost:5173")); // O tu frontend
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> corsBean =
            new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
        corsBean.setOrder(Ordered.HIGHEST_PRECEDENCE); // Alta prioridad
        return corsBean;
    }

}
