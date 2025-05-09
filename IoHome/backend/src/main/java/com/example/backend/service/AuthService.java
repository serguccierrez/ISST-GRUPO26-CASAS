package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.model.Propietario;
import com.example.backend.model.Usuario;
import com.example.backend.repository.PropietarioRepository;
import com.example.backend.repository.UsuarioRepository;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(Usuario usuario) {
        // Comprobamos si ya existe alguien con ese correo
        if (usuarioRepository.findByCorreoElectronico(usuario.getCorreoElectronico()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }
    public Usuario loginUsuario(String correo, String password) {
        Usuario usuario = usuarioRepository.findByCorreoElectronico(correo)
            .orElseThrow(() -> new IllegalArgumentException("Correo electrónico no encontrado"));
    
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }
    
        return usuario;
    }
    

    @Autowired
    private PropietarioRepository propietarioRepository;

    public Propietario registrarPropietario(Propietario propietario) {
        if (propietarioRepository.findByCorreoElectronico(propietario.getCorreoElectronico()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado como propietario");
        }
        propietario.setPassword(passwordEncoder.encode(propietario.getPassword()));
        return propietarioRepository.save(propietario);
    }

    public Propietario loginPropietario(String correo, String password) {
        Optional<Propietario> propietarioOptional = propietarioRepository.findByCorreoElectronico(correo);
        if (propietarioOptional.isPresent() && passwordEncoder.matches(password, propietarioOptional.get().getPassword())) {
            return propietarioOptional.get();
        } else {
            throw new IllegalArgumentException("Credenciales inválidas para propietario");
        }
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public List<Propietario> obtenerTodosLosPropietarios() {
        return propietarioRepository.findAll();
    }
    
    

}
