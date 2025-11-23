package com.lottopage.springboot.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "lottodraw")
public class LottoDraw {
    // Getter & Setter
    @Getter
    @Id
    private String id;
    @Getter
    private int drawNumber;                // 회차 번호
    @Getter
    private LocalDate date;                // 생성 날짜
    @Getter
    private List<Integer> winningNumbers;  // 당첨 번호 (6개)
    private List<Ticket> tickets;          // 회차 내 모든 티켓

    public LottoDraw() {
        this.tickets = new ArrayList<>();
    }

    public LottoDraw(int drawNumber, LocalDate date, List<Integer> winningNumbers, List<Ticket> tickets) {
        this.drawNumber = drawNumber;
        this.date = date;
        this.winningNumbers = winningNumbers;
        this.tickets = tickets != null ? tickets : new ArrayList<>();
    }

    public void setId(String id) { this.id = id; }

    public void setDrawNumber(int drawNumber) { this.drawNumber = drawNumber; }

    public void setDate(LocalDate date) { this.date = date; }

    public void setWinningNumbers(List<Integer> winningNumbers) { this.winningNumbers = winningNumbers; }

    public List<Ticket> getTickets() {
        if (tickets == null) tickets = new ArrayList<>();
        return tickets;
    }
    public void setTickets(List<Ticket> tickets) { this.tickets = tickets; }
}
