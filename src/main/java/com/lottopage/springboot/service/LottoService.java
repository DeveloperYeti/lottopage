package com.lottopage.springboot.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class LottoService {
    // 1~45 중복 없는 6개 번호 생성
    public List<Integer> generateLottoNumber() {
        Set<Integer> numbers = new HashSet<>();
        Random random = new Random();
        while (numbers.size() < 6) {
            int num = random.nextInt(45) + 1;
            numbers.add(num);
        }
        List<Integer> result = new ArrayList<>(numbers);
        Collections.sort(result); // 오름차순
        return result;
    }
}
