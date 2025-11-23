package com.lottopage.springboot.repository;

import com.lottopage.springboot.domain.LottoDraw;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface LottoDrawRepository extends MongoRepository<LottoDraw, String> {
    // 최신 진행중 회차(당첨번호 미등록) 한건 가져오기
    LottoDraw findFirstByWinningNumbersIsNullOrderByDrawNumberDesc();

    // 회차 번호로 찾기
    LottoDraw findByDrawNumber(int drawNumber);

    // 최신 회차 (등록된 것 중 제일 마지막)
    LottoDraw findFirstByOrderByDrawNumberDesc();
}
