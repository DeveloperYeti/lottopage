import React, { useState } from 'react';
import api from '../api/axios';
import '../pages/css/History.css';

function History({ isLoggedIn, userName }) {
    const [drawNumber, setDrawNumber] = useState("");
    const [history, setHistory] = useState([]);
    const [results, setResults] = useState([]);
    const [totalPrize, setTotalPrize] = useState(0);
    const [winningNumbers, setWinningNumbers] = useState(null);
    const [drawStatusMsg, setDrawStatusMsg] = useState("");
    const [msg, setMsg] = useState("");

    const fetchHistory = async () => {
        if (!isLoggedIn || !userName) {
            setMsg("로그인 후 이용 가능합니다.");
            setHistory([]);
            setResults([]);
            setTotalPrize(0);
            setWinningNumbers(null);
            setDrawStatusMsg("");
            return;
        }
        if (!drawNumber || Number(drawNumber) < 1) {
            setMsg("회차 번호는 1 이상의 값만 입력하세요.");
            setHistory([]);
            setResults([]);
            setTotalPrize(0);
            setWinningNumbers(null);
            setDrawStatusMsg("");
            return;
        }
        try {
            const res = await api.get("/api/history", {
                params: { userId: userName, drawNumber }
            });
            if (res.data.tickets && res.data.tickets.length > 0) {
                setHistory(res.data.tickets);
                setResults(res.data.results || []);
                setTotalPrize(res.data.totalPrize || 0);
                setMsg(`회차 ${drawNumber} 구매내역`);
            } else {
                setHistory([]);
                setResults([]);
                setTotalPrize(0);
                setMsg("구매 내역이 없습니다.");
            }
            const resDraw = await api.get(`/api/lottoDraw/${drawNumber}`);
            if (
                resDraw.data &&
                (resDraw.data.winningNumbers || resDraw.data.numbers) &&
                (resDraw.data.winningNumbers?.length > 0 || resDraw.data.numbers?.length > 0)
            ) {
                setWinningNumbers(resDraw.data.winningNumbers || resDraw.data.numbers);
                setDrawStatusMsg("");
            } else {
                setWinningNumbers(null);
                setDrawStatusMsg(`${drawNumber}회차는 아직 미추첨입니다.`);
            }
        } catch {
            setMsg("서버 오류");
            setHistory([]);
            setResults([]);
            setTotalPrize(0);
            setWinningNumbers(null);
            setDrawStatusMsg("");
        }
    };

    const renderNumbers = (numbers) => {
        if (!numbers) return null;
        return numbers.map((num, idx) =>
            winningNumbers && winningNumbers.includes(num)
                ? <b key={idx} style={{ color: "#cf1c3f" }}>{num}</b>
                : <span key={idx}>{num}</span>
        ).reduce((prev, curr) => [prev, ', ', curr]);
    };

    return (
        <div className="history">
            <h2>구매 내역 조회</h2>
            {!isLoggedIn || !userName ? (
                <div style={{ color: "#cf1c3f", margin: "16px 0" }}>로그인 후 이용 가능합니다.</div>
            ) : (
                <div className="history-card">
                    <input className="history-input"
                           placeholder="회차 번호"
                           type="number"
                           value={drawNumber}
                           onChange={e => setDrawNumber(e.target.value)}
                    />
                    <button className="history-btn" onClick={fetchHistory}>구매내역 조회</button>
                    {msg && <div className="history-msg">{msg}</div>}
                    {drawStatusMsg && (
                        <div style={{ margin: "16px 0", color: "#cf1c3f", fontWeight: "bold" }}>
                            {drawStatusMsg}
                        </div>
                    )}
                    {winningNumbers && (
                        <div style={{ margin: "16px 0", fontWeight: "bold" }}>
                            {drawNumber}회차 당첨번호: {winningNumbers.join(', ')}
                        </div>
                    )}
                    {history.length > 0 && (
                        <div>
                            <h4>구매 목록</h4>
                            <ul>
                                {history.map((ticket, i) => (
                                    <li key={i}>{renderNumbers(ticket)}</li>
                                ))}
                            </ul>
                            <h4>당첨 결과</h4>
                            <ul>
                                {results.map((r, i) => (
                                    <li key={i}>
                                        번호: {renderNumbers(r.numbers)}
                                        {r.rank ? ` - ${r.rank}등` : " - 미당첨"}
                                        {r.prize && r.prize > 0 ? ` (${r.prize}원)` : ""}
                                    </li>
                                ))}
                            </ul>
                            <div>총 당첨금액: {totalPrize}원</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default History;
