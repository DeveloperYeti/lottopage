package com.lottopage.springboot.controller;

import com.lottopage.springboot.domain.User;
import com.lottopage.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/signup")
    public Object signup(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String name = body.get("name");
        String username = body.get("username");
        String password = body.get("password");
        String passwordCheck = body.get("passwordCheck"); // 비밀번호 확인

        User newUser = new User(email, name, username, password);
        String result = userService.signup(newUser, passwordCheck);

        return switch (result) {
            case "EMAIL_EXISTS" -> Map.of("error", "이메일이 이미 존재합니다.");
            case "USERNAME_EXISTS" -> Map.of("error", "아이디가 이미 존재합니다.");
            case "PW_EXCEEDS" -> Map.of("error", "비밀번호가 20자 이내여야 합니다.");
            case "PW_MISMATCH" -> Map.of("error", "비밀번호가 확인값이랑 다릅니다.");
            default -> Map.of("ok", true);
        };
    }

    // 아이디/이메일 중복 체크
    @GetMapping("/exists")
    public Object exists(@RequestParam String type, @RequestParam String value) {
        if ("email".equals(type)) return Map.of("exists", userService.checkEmail(value));
        if ("username".equals(type)) return Map.of("exists", userService.checkUsername(value));
        return Map.of("error", "잘못된 타입");
    }

    // 로그인
    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> body) {
        User user = userService.login(body.get("username"), body.get("password"));
        if (user == null) return Map.of("error", "아이디 또는 비밀번호 오류");
        return Map.of("ok", true);
    }
}
