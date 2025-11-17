package com.lottopage.springboot.repository;

import com.lottopage.springboot.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    User findByUsername(String username);
}