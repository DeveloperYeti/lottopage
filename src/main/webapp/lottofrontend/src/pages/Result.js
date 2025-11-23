import React, { useState } from 'react';
import api from '../api/axios';
import '../pages/css/Result.css';

function Result({ isLoggedIn, userName }) {
    const [drawNumber, setDrawNumber] = useState("");
    const [winningNumbers, setWinningNumbers] = useState(null);
    const [resultMsg, setResultMsg] = useState("");

    const fetchDraw = async () => {
        if (!drawNumber || Number(drawNumber) < 1) {
            setResultMsg("회차 번호를 입력하세요.");
            setWinningNumbers(null);
            return;
        }
        try {
            const res = await api.get(`/api/lottoDraw/${drawNumber}`);
            if (res.data.error) {
                setResultMsg(res.data.error);
                setWinningNumbers(null);
            } else {
                setWinningNumbers(res.data.winningNumbers || res.data.numbers);
                setResultMsg("");
            }
        } catch {
            setResultMsg("서버 오류");
            setWinningNumbers(null);
        }
    };

    return (
        <div className="result">
            <h2>당첨 확인</h2>
            <div className="result-card">
                <input
                    className="result-input"
                    placeholder="회차 번호"
                    type="number"
                    value={drawNumber}
                    onChange={e => setDrawNumber(e.target.value)}
                />
                <button className="result-btn" onClick={fetchDraw}>당첨번호 확인</button>
                {winningNumbers && <div>당첨번호: {winningNumbers.join(', ')}</div>}
                {resultMsg && <div>{resultMsg}</div>}
            </div>
        </div>
    );
}

export default Result;
