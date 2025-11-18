package com.lottopage.springboot.repository;

import com.lottopage.springboot.domain.LottoResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface LottoResultRepository extends MongoRepository<LottoResult, String> {
    List<LottoResult> findByUserId(String userId);
    List<LottoResult> findByDrawNumber(int drawNumber);
    LottoResult findByUserIdAndDrawNumber(String userId, int drawNumber);
}
