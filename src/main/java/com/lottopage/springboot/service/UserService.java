package com.lottopage.springboot.service;

import com.lottopage.springboot.domain.User;
import com.lottopage.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // 이메일 중복여부
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // 아이디 중복여부
    public boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // 회원가입
    public String signup(User user, String passwordCheck) {
        if (checkEmail(user.getEmail())) return "EMAIL_EXISTS";
        if (checkUsername(user.getUsername())) return "USERNAME_EXISTS";
        if (user.getPassword().length() > 20) return "PW_EXCEEDS";
        if (!user.getPassword().equals(passwordCheck)) return "PW_MISMATCH";
        userRepository.save(user);
        return "SUCCESS";
    }

    // 로그인
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) return user;
        return null;
    }
}
