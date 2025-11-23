package com.lottopage.springboot.repository;

import com.lottopage.springboot.domain.LottoNum;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface LottoNumRepository extends MongoRepository<LottoNum, String> { }
