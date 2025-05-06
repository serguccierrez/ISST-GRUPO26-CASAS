package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.model.Propietario;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.repository.PropietarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PropietarioRepository propietarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correoElectronico) throws UsernameNotFoundException {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .<UserDetails>map(usuario -> new User(
                        usuario.getCorreoElectronico(),
                        usuario.getPassword(),
                        List.of(new SimpleGrantedAuthority(usuario.getRol()))
                ))
                .or(() -> propietarioRepository.findByCorreoElectronico(correoElectronico)
                    .map(propietario -> new User(
                        propietario.getCorreoElectronico(),
                        propietario.getPassword(),
                        List.of(new SimpleGrantedAuthority(propietario.getRol()))
                    )))
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el correo: " + correoElectronico));
    }
}