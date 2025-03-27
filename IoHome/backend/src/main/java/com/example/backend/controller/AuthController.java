package com.example.backend.controller;

import com.example.backend.model.Propietario;
import com.example.backend.model.Usuario;
import com.example.backend.service.AuthService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // permite llamadas desde React
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        return authService.registrarUsuario(usuario);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        return authService.login(usuario.getCorreoElectronico(), usuario.getTokenUsuario());
    }

    @PostMapping("/register/propietario")
    public ResponseEntity<?> registrarPropietario(@RequestBody Propietario propietario) {
        try {
            return ResponseEntity.ok(authService.registrarPropietario(propietario));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login/propietario")
    public ResponseEntity<?> loginPropietario(@RequestBody Map<String, String> loginData) {
        String correo = loginData.get("correoElectronico");
        String password = loginData.get("password");
        try {
            return ResponseEntity.ok(authService.loginPropietario(correo, password));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
