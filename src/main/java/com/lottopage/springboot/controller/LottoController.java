package com.lottopage.springboot.controller;

import com.lottopage.springboot.domain.LottoNum;
import com.lottopage.springboot.repository.LottoNumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LottoController {

    @Autowired
    private LottoNumRepository lottoNumRepository;

    @PostMapping("/lottonums")
    public LottoNum createLottoNum(@RequestBody LottoNum lottoNum) {
        return lottoNumRepository.save(lottoNum);
    }

    @GetMapping("/lottonums")
    public List<LottoNum> getAllLottoNums() {
        return lottoNumRepository.findAll();
    }
}
