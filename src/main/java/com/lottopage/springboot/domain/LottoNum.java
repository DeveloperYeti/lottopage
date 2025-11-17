package com.lottopage.springboot.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "lottoNum")
public class LottoNum {
    @Id
    private String id;
    private int drawNumber;
    private List<Integer> numbers;

    public LottoNum() {
    }

    public LottoNum(int drawNumber, List<Integer> numbers) {
        this.drawNumber = drawNumber;
        this.numbers = numbers;
    }

    // getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public int getDrawNumber() { return drawNumber; }
    public void setDrawNumber(int drawNumber) { this.drawNumber = drawNumber; }
    public List<Integer> getNumbers() { return numbers; }
    public void setNumbers(List<Integer> numbers) { this.numbers = numbers; }
}
