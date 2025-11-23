package com.lottopage.springboot.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@Document(collection = "user")
public class User {
    @Id
    private String id;
    private String email;
    private String name;
    private String username; // 사용자 ID
    private String password;
    private String role; // 역할(권한) 필드 추가

    public User() {
        this.role = "USER"; // 기본값 지정
    }

    public User(String email, String name, String username, String password) {
        this.email = email;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = "USER"; // 회원가입 기본 권한
    }

    // Getter, Setter
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // Role 필드 getter/setter
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    // 관리자 여부 확인 메서드
    public boolean isAdmin() {
        return "ADMIN".equalsIgnoreCase(this.role);
    }
}
