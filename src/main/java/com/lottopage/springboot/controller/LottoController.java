package com.lottopage.springboot.controller;

import com.lottopage.springboot.domain.LottoDraw;
import com.lottopage.springboot.domain.LottoNum;
import com.lottopage.springboot.domain.LottoResult;
import com.lottopage.springboot.repository.LottoDrawRepository;
import com.lottopage.springboot.repository.LottoNumRepository;
import com.lottopage.springboot.repository.LottoResultRepository;
import com.lottopage.springboot.service.LottoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LottoController {

    @Autowired
    private LottoDrawRepository lottoDrawRepository;
    @Autowired
    private LottoNumRepository lottoNumRepository;
    @Autowired
    private LottoResultRepository lottoResultRepository;
    @Autowired
    private LottoService lottoService;

    @PostMapping("/lottonums/buy")
    public Map<String, Object> buyLotto(@RequestBody Map<String, Object> body) {
        String userId = (String) body.get("userId");
        int amount = ((Number) body.get("amount")).intValue();

        if (amount <= 0 || amount % 1000 != 0) {
            return Map.of("error", "1000원 단위로 입력해주세요.");
        }

        LottoDraw latestDraw = lottoDrawRepository.findFirstByOrderByDrawNumberDesc();
        int nextDrawNumber = (latestDraw == null) ? 1 : latestDraw.getDrawNumber() + 1;

        LottoDraw nextDraw = lottoDrawRepository.findByDrawNumber(nextDrawNumber);
        if (nextDraw == null) {
            nextDraw = new LottoDraw(nextDrawNumber, LocalDate.now(), null, new ArrayList<>());
            lottoDrawRepository.save(nextDraw);
        }

        int ticketCount = amount / 1000;
        List<List<Integer>> tickets = new ArrayList<>();
        for (int i = 0; i < ticketCount; i++) {
            tickets.add(lottoService.generateLottoNumber());
        }

        LottoNum lottoNum = new LottoNum(nextDrawNumber, tickets, amount);
        lottoNum.setUserId(userId);
        lottoNumRepository.save(lottoNum);

        return Map.of("tickets", tickets, "ok", true);
    }

    @GetMapping("/history")
    public Map<String, Object> getHistory(@RequestParam String userId, @RequestParam String drawNumber) {
        int drawNum = Integer.parseInt(drawNumber);
        LottoDraw draw = lottoDrawRepository.findByDrawNumber(drawNum);
        List<Integer> winningNumbers = (draw != null) ? draw.getWinningNumbers() : null;

        List<LottoNum> nums = lottoNumRepository.findAll();
        List<List<Integer>> userTickets = new ArrayList<>();
        for (LottoNum ln : nums) {
            if (userId.equals(ln.getUserId()) && ln.getDrawNumber() == drawNum) {
                userTickets.addAll(ln.getTickets());
            }
        }

        List<Map<String, Object>> ticketResults = new ArrayList<>();
        int totalPrize = 0;
        for (List<Integer> ticket : userTickets) {
            int matchCount = 0;
            if (winningNumbers != null) {
                for (int n : ticket) {
                    if (winningNumbers.contains(n)) matchCount++;
                }
            }
            int rank = getRank(matchCount); // 직접 등수 산정 (예: 6개=1등, 5=2등 등)
            int prize = getPrize(rank);
            totalPrize += prize;

            Map<String, Object> result = new HashMap<>();
            result.put("numbers", ticket);
            result.put("rank", rank); // 0=미당첨
            result.put("prize", prize);
            ticketResults.add(result);
        }

        return Map.of(
                "tickets", userTickets,
                "results", ticketResults,
                "totalPrize", totalPrize
        );
    }

    // 예시 등수/당첨금 함수
    private int getRank(int matchCount) {
        if (matchCount == 6) return 1;
        if (matchCount == 5) return 2;
        if (matchCount == 4) return 3;
        if (matchCount == 3) return 4;
        if (matchCount == 2) return 5;
        return 0;
    }
    private int getPrize(int rank) {
        if (rank == 1) return 2000000000;
        if (rank == 2) return 60000000;
        if (rank == 3) return 1500000;
        if (rank == 4) return 50000;
        if (rank == 5) return 5000;
        return 0;
    }


    @PostMapping("/lottoDraw/random-draw")
    public Object randomDrawLottoNumbers(@RequestBody Map<String, Object> body) {
        int drawNumber;
        Object drawNumberObj = body.get("drawNumber");
        if (drawNumberObj instanceof Integer) {
            drawNumber = (Integer) drawNumberObj;
        } else if (drawNumberObj instanceof Double) {
            drawNumber = ((Double) drawNumberObj).intValue();
        } else if (drawNumberObj instanceof String) {
            drawNumber = Integer.parseInt((String) drawNumberObj);
        } else {
            return Map.of("ok", false, "error", "회차번호 값이 잘못되었습니다.");
        }

        List<Integer> numbers = lottoService.generateLottoNumber();
        LottoDraw draw = lottoDrawRepository.findByDrawNumber(drawNumber);
        if (draw != null) {
            if (draw.getWinningNumbers() != null && !draw.getWinningNumbers().isEmpty()) {
                return Map.of("ok", false, "error", "이미 생성된 회차입니다.");
            }
            draw.setWinningNumbers(numbers);
            lottoDrawRepository.save(draw);
            return Map.of("ok", true, "numbers", numbers, "created", false);
        }
        draw = new LottoDraw(drawNumber, LocalDate.now(), numbers, new ArrayList<>());
        lottoDrawRepository.save(draw);
        return Map.of("ok", true, "numbers", numbers, "created", true);
    }

    @GetMapping("/lottoDraw")
    public List<LottoDraw> getAllDraws() {
        return lottoDrawRepository.findAll();
    }

    @GetMapping("/lottoDraw/{drawNumber}")
    public Object getDraw(@PathVariable int drawNumber) {
        LottoDraw draw = lottoDrawRepository.findByDrawNumber(drawNumber);
        if (draw == null) return Map.of("error", "해당 회차 없음");
        return draw;
    }


}
