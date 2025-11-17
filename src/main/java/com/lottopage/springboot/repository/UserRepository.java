package com.lottopage.springboot.repository;

import com.lottopage.springboot.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> { }
