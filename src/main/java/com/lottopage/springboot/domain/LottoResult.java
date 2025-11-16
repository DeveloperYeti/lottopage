package com.lottopage.springboot.domain;

import lombok.Getter;

public enum LottoResult {
    FIRST(6, false, "6개 일치 (2,000,000,000원)", 2000000000),
    SECOND(5, true, "5개 일치, 보너스 볼 일치 (30,000,000원)", 30000000),
    THIRD(5, false, "5개 일치 (1,500,000원)", 1500000),
    FOURTH(4, false, "4개 일치 (50,000원)", 50000),
    FIFTH(3, false, "3개 일치 (5,000원)", 5000),
    MISS(0, false, "", 0);

    private final int matchCount;
    private final boolean bonus;
    @Getter
    private final String message;
    @Getter
    private final int prize;

    LottoResult(int matchCount, boolean bonus, String message, int prize) {
        this.matchCount = matchCount;
        this.bonus = bonus;
        this.message = message;
        this.prize = prize;
    }

    public static LottoResult of(int matched, boolean bonusMatched) {
        if (matched == 6) return FIRST;
        if (matched == 5 && bonusMatched) return SECOND;
        if (matched == 5) return THIRD;
        if (matched == 4) return FOURTH;
        if (matched == 3) return FIFTH;
        return MISS;
    }
}