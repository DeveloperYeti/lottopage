package com.lottopage.springboot.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "lottoDraw")
public class LottoDraw {
    @Id
    private String id;
    private int drawNumber; // 회차번호
    private List<Integer> numbers; // 당첨번호(중복X, 6개)

    public LottoDraw() { }

    public LottoDraw(int drawNumber, List<Integer> numbers) {
        this.drawNumber = drawNumber;
        this.numbers = numbers;
    }

    // Getter/Setter
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public int getDrawNumber() { return drawNumber; }
    public void setDrawNumber(int drawNumber) { this.drawNumber = drawNumber; }
    public List<Integer> getNumbers() { return numbers; }
    public void setNumbers(List<Integer> numbers) { this.numbers = numbers; }
}
