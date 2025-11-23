package com.lottopage.springboot.service;

import com.lottopage.springboot.domain.LottoDraw;
import com.lottopage.springboot.domain.Ticket;
import com.lottopage.springboot.repository.LottoDrawRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class LottoService {
    @Autowired
    private LottoDrawRepository lottoDrawRepository;

    // 1~45 중복없이 6개 번호 생성
    public List<Integer> generateLottoNumber() {
        List<Integer> pool = new ArrayList<>();
        for (int i = 1; i <= 45; i++) pool.add(i);
        Collections.shuffle(pool);
        List<Integer> numbers = new ArrayList<>(pool.subList(0, 6));
        Collections.sort(numbers);
        return numbers;
    }

    // 현재회차 받아오거나 없으면 새로 생성
    public LottoDraw getOrCreateCurrentDraw() {
        LottoDraw draw = lottoDrawRepository.findFirstByWinningNumbersIsNullOrderByDrawNumberDesc();
        if (draw == null) {
            LottoDraw latest = lottoDrawRepository.findFirstByOrderByDrawNumberDesc();
            int nextDrawNumber = (latest == null) ? 1 : latest.getDrawNumber() + 1;
            draw = new LottoDraw(nextDrawNumber, LocalDate.now(), null, new ArrayList<>());
            lottoDrawRepository.save(draw);
        }
        return draw;
    }

    // 티켓 1개 생성 및 회차에 저장
    public Ticket buyTicket(String username) {
        LottoDraw draw = getOrCreateCurrentDraw();
        List<Integer> lottoNums = generateLottoNumber();
        Ticket newTicket = new Ticket(username, lottoNums);
        draw.getTickets().add(newTicket);
        lottoDrawRepository.save(draw);
        return newTicket;
    }
}
