package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Buscar usuario por correo electrónico
    public Usuario obtenerUsuarioPorCorreo(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico).orElse(null);
    }

    // Actualizar perfil del usuario
    public Usuario actualizarUsuario(Long id, Usuario usuario) {
        return usuarioRepository.findById(id).map(existingUser -> {
            existingUser.setNombre(usuario.getNombre());
            existingUser.setApellidos(usuario.getApellidos());
            existingUser.setDni(usuario.getDni());
            existingUser.setCorreoElectronico(usuario.getCorreoElectronico());
            existingUser.setTelefono(usuario.getTelefono());
            return usuarioRepository.save(existingUser);
        }).orElse(null);
    }
}
