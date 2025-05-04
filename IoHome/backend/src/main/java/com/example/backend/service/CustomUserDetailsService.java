package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.model.Propietario;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PropietarioRepository propietarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correoElectronico) throws UsernameNotFoundException {
        // Buscar en usuarios
        Usuario usuario = usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElse(null);
        if (usuario != null) {
            return User.builder()
                    .username(usuario.getCorreoElectronico())
                    .password(usuario.getPassword())
                    .roles("ROLE_USER")
                    .build();
        }

        // Buscar en propietarios
        Propietario propietario = propietarioRepository.findByCorreoElectronico(correoElectronico).orElse(null);
        if (propietario != null) {
            return User.builder()
                    .username(propietario.getCorreoElectronico())
                    .password(propietario.getPassword())
                    .roles("ROLE_ADMIN")
                    .build();
        }

        throw new UsernameNotFoundException("Usuario no encontrado con correo: " + correoElectronico);
    }
}
