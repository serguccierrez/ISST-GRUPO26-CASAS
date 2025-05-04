package com.example.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Propietario;
import com.example.backend.model.Usuario;
import com.example.backend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.Cookie;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173") // permite llamadas desde React
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        usuario.setRol("USER"); // Asignar rol USER por defecto
        return authService.registrarUsuario(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Map<String, String> loginData) {
        String correo = loginData.get("correoElectronico");
        String password = loginData.get("password");
        try {
            return ResponseEntity.ok(authService.loginUsuario(correo, password));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register/propietario")
    public ResponseEntity<?> registrarPropietario(@RequestBody Propietario propietario) {
        propietario.setRol("ADMIN"); // Asignar rol ADMIN por defecto
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

    @GetMapping("/usuarios")
    public ResponseEntity<?> obtenerUsuarios() {
        return ResponseEntity.ok(authService.obtenerTodosLosUsuarios());
    }

    @GetMapping("/propietarios")
    public ResponseEntity<?> obtenerPropietarios() {
        return ResponseEntity.ok(authService.obtenerTodosLosPropietarios());
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextHolder.clearContext();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok("Logout exitoso");
    }

}
