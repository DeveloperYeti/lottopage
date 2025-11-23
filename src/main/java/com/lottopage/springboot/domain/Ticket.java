package com.lottopage.springboot.domain;

import java.util.List;

public class Ticket {
    private String username;
    private List<Integer> numbers;

    public Ticket() { }

    public Ticket(String username, List<Integer> numbers) {
        this.username = username;
        this.numbers = numbers;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public List<Integer> getNumbers() { return numbers; }
    public void setNumbers(List<Integer> numbers) { this.numbers = numbers; }
}
