package com.lottopage.springboot.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Document(collection = "lottoResult")
public class LottoResult {
    @Id
    private String id;
    private String userId;
    private int drawNumber;
    private List<Map<String, Object>> ticketResults; // 각 로또 등수/번호 등
    private int totalPrize;

    public LottoResult() { }
    public LottoResult(String userId, int drawNumber, List<Map<String, Object>> ticketResults, int totalPrize) {
        this.userId = userId;
        this.drawNumber = drawNumber;
        this.ticketResults = ticketResults;
        this.totalPrize = totalPrize;
    }
    // Getter/Setter 생략
}
