import React, { useState } from 'react';
import api from '../api/axios';
import '../pages/css/Result.css';

function Result() {
    const [drawNumber, setDrawNumber] = useState("");
    const [winningNumbers, setWinningNumbers] = useState(null);
    const [myNumbers, setMyNumbers] = useState("");
    const [resultMsg, setResultMsg] = useState("");

    const fetchDraw = async () => {
        try {
            const res = await api.get(`/api/lottoDraw/${drawNumber}`);
            if (res.data.error) setResultMsg(res.data.error);
            else setWinningNumbers(res.data.numbers);
        } catch {
            setResultMsg("서버 오류");
        }
    };

    // 여기에 실제 내 번호 결과 확인 구현 필요(백엔드 구조에 따라 API 추가)

    return (
        <div className="result">
            <h2>당첨 확인</h2>
            <div className="result-card">
                <input className="result-input" placeholder="회차 번호" type="number"
                       value={drawNumber} onChange={e => setDrawNumber(e.target.value)} />
                <button className="result-btn" onClick={fetchDraw}>당첨번호 확인</button>
                {winningNumbers && <div>당첨번호: {winningNumbers.join(', ')}</div>}
                <input className="result-input" placeholder="나의 번호 입력"
                       value={myNumbers} onChange={e => setMyNumbers(e.target.value)} />
                <button className="result-btn">내 번호 확인</button>
                {resultMsg && <div>{resultMsg}</div>}
            </div>
        </div>
    );
}
export default Result;
