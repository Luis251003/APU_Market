package com.apu.market.apu_market.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.apu.market.apu_market.entities.Usuario;
import com.apu.market.apu_market.services.UsuarioService;

@Service
public class UserDetailService implements UserDetailsService{

    @Autowired
    UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioService.findByEmail(username);
        Set<GrantedAuthority> authorities = usuario.getRoles().stream()
        .map(rol -> new SimpleGrantedAuthority(rol.getNombre())).collect(Collectors.toSet());
        return new User(usuario.getEmail(),usuario.getPassword(),usuario.isEnabled(),true,true,true,authorities);
    }

}
