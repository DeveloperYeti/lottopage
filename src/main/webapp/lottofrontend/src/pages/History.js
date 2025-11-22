import React, { useState } from 'react';
import api from '../api/axios';
import '../pages/css/History.css';

function History({ isLoggedIn, userName }) {
    const [drawNumber, setDrawNumber] = useState("");
    const [history, setHistory] = useState([]);
    const [msg, setMsg] = useState("");

    const fetchHistory = async () => {
        if (!isLoggedIn) {
            setMsg("로그인 후 이용 가능합니다.");
            setHistory([]);
            return;
        }
        if (!drawNumber) {
            setMsg("회차를 입력하세요.");
            setHistory([]);
            return;
        }
        try {
            const res = await api.get("/api/history", {
                params: { userId: userName, drawNumber }
            });
            if (res.data.error) setMsg(res.data.error);
            else if (res.data.tickets && res.data.tickets.length > 0) {
                setHistory(res.data.tickets);
                setMsg(`회차 ${drawNumber} 구매내역`);
            } else {
                setHistory([]);
                setMsg("구매 내역이 없습니다.");
            }
        } catch {
            setMsg("서버 오류");
            setHistory([]);
        }
    };

    return (
        <div className="history">
            <h2>구매 내역 조회</h2>
            {!isLoggedIn ? (
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
                    {history.length > 0 && (
                        <div>
                            <h4>구매 목록</h4>
                            <ul>
                                {history.map((ticket, i) => (
                                    <li key={i}>{ticket.numbers.join(', ')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default History;
