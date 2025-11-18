package com.lottopage.springboot.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@Document(collection = "lottoNum")
public class LottoNum {
    @Id
    private String id;
    private int drawNumber;
    private List<List<Integer>> tickets;
    private int amount;
    private String userId; // 구매자 정보(선택)

    public LottoNum() { }

    // 아래와 같이 생성자 추가 필요!
    public LottoNum(int drawNumber, List<List<Integer>> tickets, int amount) {
        this.drawNumber = drawNumber;
        this.tickets = tickets;
        this.amount = amount;
    }

    // getter/setter 추가!
    public int getDrawNumber() { return drawNumber; }
    public void setDrawNumber(int drawNumber) { this.drawNumber = drawNumber; }
    public List<List<Integer>> getTickets() { return tickets; }
    public void setTickets(List<List<Integer>> tickets) { this.tickets = tickets; }
    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
}
