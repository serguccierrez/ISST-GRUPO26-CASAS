package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener usuario por correo electrónico
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Usuario> obtenerUsuarioPorCorreo(@PathVariable String correo) {
        Usuario usuario = usuarioService.obtenerUsuarioPorCorreo(correo);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

