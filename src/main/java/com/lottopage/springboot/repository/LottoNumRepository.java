package com.lottopage.springboot.repository;

import com.lottopage.springboot.domain.LottoNum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LottoNumRepository extends MongoRepository<LottoNum, String> { }
