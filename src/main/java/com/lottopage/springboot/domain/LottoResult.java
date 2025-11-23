package com.lottopage.springboot.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;
@Setter
@Getter
@CrossOrigin(origins = "http://localhost:3000")
@Document(collection = "lottoResult")
public class LottoResult {
    @Id
    private String id;
    private String userId;
    private int drawNumber;
    private List<Map<String, Object>> ticketResults;
    private int totalPrize;

    public LottoResult() { }

    public LottoResult(String userId, int drawNumber, List<Map<String, Object>> ticketResults, int totalPrize) {
        this.userId = userId;
        this.drawNumber = drawNumber;
        this.ticketResults = ticketResults;
        this.totalPrize = totalPrize;
    }

}
