package com.lottopage.springboot.domain;

public enum LottoNumber {
    START(1), END(45), COUNT(6);

    private final int value;
    LottoNumber(int value) { this.value = value; }
    public int getValue() { return value; }
}