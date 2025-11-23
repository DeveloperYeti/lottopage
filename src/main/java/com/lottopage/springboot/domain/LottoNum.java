package com.lottopage.springboot.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@Setter
@Getter
@CrossOrigin(origins = "http://localhost:3000")
@Document(collection = "lottoNum")
public class LottoNum {
    @Id
    private String id;
    private int drawNumber;
    private List<List<Integer>> tickets;
    private int amount;
    private String userId;

    public LottoNum() { }

    public LottoNum(int drawNumber, List<List<Integer>> tickets, int amount) {
        this.drawNumber = drawNumber;
        this.tickets = tickets;
        this.amount = amount;
    }

}
