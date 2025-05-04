package com.example.backend.config;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .cors(cors -> cors.configurationSource(request -> {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(List.of("http://localhost:5173")); // Dirección del frontend
                        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                        config.setAllowedHeaders(List.of("*"));
                        config.setAllowCredentials(true); // Permitir credenciales
                        return config;
                    }))
                    .csrf(csrf -> csrf.ignoringRequestMatchers("/api/auth/**"))
                    .authorizeHttpRequests(auth ->  {auth 
                        .requestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/register/propietario", "/api/auth/login/propietario").permitAll()
                        .requestMatchers("/usuario/**").hasRole("USER") // Solo los usuarios con rol USER pueden acceder a estas rutas
                        .requestMatchers("/propietario/**").hasRole("ADMIN"); // Solo los usuarios con rol ADMIN pueden acceder a estas rutas
                        //.anyRequest().authenticated(); // el resto también requiere autenticación

                    })
                    //.formLogin(Customizer.withDefaults()) //Como la autenticacion se hace directamente en el frontend no hace falta usar los formularios de Spring
                    .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .invalidateHttpSession(true) // Invalida la sesión
                        .deleteCookies("JSESSIONID") // Elimina la cookie de sesión
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                            response.getWriter().write("Logout exitoso");
                        })
                    )
                    .httpBasic(Customizer.withDefaults());
            return http.build();
        }



}


