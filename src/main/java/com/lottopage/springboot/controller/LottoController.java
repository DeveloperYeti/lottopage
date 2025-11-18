package com.lottopage.springboot.controller;

import com.lottopage.springboot.domain.LottoNum;
import com.lottopage.springboot.domain.LottoDraw;
import com.lottopage.springboot.repository.LottoNumRepository;
import com.lottopage.springboot.repository.LottoDrawRepository;
import com.lottopage.springboot.service.LottoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LottoController {

    @Autowired
    private LottoNumRepository lottoNumRepository;
    @Autowired
    private LottoDrawRepository lottoDrawRepository;
    @Autowired
    private LottoService lottoService;

    // (DB/서비스에서 관리하도록 기본회차 예시)
    private int currentDrawNumber = 1; // 실제로는 DB에 관리/업데이트

    // 1. 로또 구매: 로그인된 사용자만 허용, 1000원 단위 금액 체크
    @PostMapping("/lottonums/buy")
    public Object buyLotto(@RequestBody Map<String, Object> req) {
        Boolean loggedIn = (Boolean) req.get("loggedIn"); // 프론트에서 전송
        String userId = (String) req.get("userId"); // 로그인 아이디 등
        int amount = (int) req.get("amount");

        if (loggedIn == null || !loggedIn)
            return Map.of("error", "로그인 이후에만 구매할 수 있습니다.");

        if (amount % 1000 != 0 || amount <= 0)
            return Map.of("error", "구매금액은 1000원 단위로 입력해주세요.");

        int count = amount / 1000;
        List<List<Integer>> tickets = new ArrayList<>();
        for (int i=0; i<count; i++)
            tickets.add(lottoService.generateLottoNumber());

        LottoNum lottoNum = new LottoNum(currentDrawNumber, tickets, amount);
        // 구매자 정보 포함 시 아래 필드 추가 추천
        // lottoNum.setUserId(userId);
        lottoNumRepository.save(lottoNum);

        return Map.of(
                "drawNumber", currentDrawNumber,
                "tickets", tickets,
                "count", count,
                "amount", amount
        );
    }

    // 2. 로또 구매 내역/조회 (회차별 혹은 전체)
    @GetMapping("/lottonums")
    public List<LottoNum> getAllLottoNums(@RequestParam(value = "drawNumber", required = false) Integer drawNumber) {
        if (drawNumber == null) return lottoNumRepository.findAll();
        // drawNumber로 필터링하는 기능을 원할 경우 repository에 findByDrawNumber(int)를 추가
        // return lottoNumRepository.findByDrawNumber(drawNumber);
        return lottoNumRepository.findAll(); // 임시
    }

    // 3. 관리자: 당첨번호 추첨 및 회차 증가
    @PostMapping("/lottoDraw/draw")
    public Object drawLottoNumber() {
        // 1~45 중 6개 중복없이 랜덤생성
        List<Integer> numbers = lottoService.generateLottoNumber();
        LottoDraw lottoDraw = new LottoDraw(currentDrawNumber, numbers);
        lottoDrawRepository.save(lottoDraw);

        // 회차 증가
        currentDrawNumber += 1;
        return Map.of("drawNumber", lottoDraw.getDrawNumber(), "numbers", numbers);
    }

    // 4. 관리자: 모든 당첨번호 및 회차 조회
    @GetMapping("/lottoDraw")
    public List<LottoDraw> getAllDraws() {
        return lottoDrawRepository.findAll();
    }

    // 5. 특정 회차 당첨번호 조회
    @GetMapping("/lottoDraw/{drawNumber}")
    public Object getDraw(@PathVariable int drawNumber) {
        List<LottoDraw> draws = lottoDrawRepository.findAll();
        for (LottoDraw draw : draws)
            if (draw.getDrawNumber() == drawNumber) return draw;
        return Map.of("error", "해당 회차번호를 찾을 수 없습니다.");
    }
}
