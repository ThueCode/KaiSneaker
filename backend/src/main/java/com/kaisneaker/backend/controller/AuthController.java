package com.kaisneaker.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaisneaker.backend.dto.AuthResponse;
import com.kaisneaker.backend.dto.RegisterDTO;
import com.kaisneaker.backend.dto.SignInDTO;
import com.kaisneaker.backend.model.User;
import com.kaisneaker.backend.repository.UserRepository;
import com.kaisneaker.backend.service.UserService;
import com.kaisneaker.backend.utils.JwtUtils;
import com.kaisneaker.backend.utils.common.ResultEntity;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<ResultEntity<RegisterDTO>> register(@Valid @RequestBody RegisterDTO registerDTO) {
        userService.register(registerDTO);
        return ResponseEntity.ok(ResultEntity.of("Đăng ký thành công", registerDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SignInDTO signInDTO) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInDTO.getUsername(), signInDTO.getPassword()));

        UserDetails userDetails = (UserDetails) auth.getPrincipal();

        // 🔍 Lấy thông tin User từ DB để đưa vào token
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtUtils.generateToken(userDetails, user);

        return ResponseEntity.ok()
                .body(ResultEntity.of("Đăng nhập thành công", new AuthResponse(token)));

    }
}
