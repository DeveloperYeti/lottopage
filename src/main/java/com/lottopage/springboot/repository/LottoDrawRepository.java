package com.lottopage.springboot.repository;

import com.lottopage.springboot.domain.LottoDraw;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LottoDrawRepository extends MongoRepository<LottoDraw, String> {
    // 필요시 drawNumber로 조회하는 함수 추가 가능
    // LottoDraw findByDrawNumber(int drawNumber);
}
