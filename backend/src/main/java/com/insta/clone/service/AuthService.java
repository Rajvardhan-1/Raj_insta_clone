package com.insta.clone.service;

import com.insta.clone.model.User;
import com.insta.clone.repository.UserRepository;
import com.insta.clone.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                       JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public Map<String, String> register(User request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("username", user.getUsername());
        return response;
    }

    public Map<String, String> login(String username, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        var user = userRepository.findByUsername(username).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("username", user.getUsername());
        return response;
    }
}
