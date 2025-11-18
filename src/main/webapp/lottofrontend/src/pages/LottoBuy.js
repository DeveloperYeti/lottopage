import React, { useState } from 'react';
import api from '../api/axios';
import '../pages/css/LottoBuy.css';

function LottoBuy() {
    const [amount, setAmount] = useState(1000);
    const [msg, setMsg] = useState("");
    const [tickets, setTickets] = useState([]);

    const validateAmount = (value) => {
        // 1000원 단위가 아니거나 음수일 경우 false
        return value > 0 && value % 1000 === 0;
    };

    const handleBuy = async () => {
        if (!validateAmount(amount)) {
            setMsg("1000원 단위로 다시 입력해주세요.");
            setTickets([]);
            return;
        }
        try {
            const res = await api.post("/api/lottonums/buy", {
                loggedIn: true,
                userId: "demo",
                amount: amount
            });
            if (res.data.error) setMsg(res.data.error);
            else {
                setMsg("구매 성공!");
                setTickets(res.data.tickets);
            }
        } catch {
            setMsg("서버 오류");
        }
    };

    return (
        <div className="buy">
            <h2>로또 구매</h2>
            <label>
                구매 금액(1,000원 단위):
                <input
                    type="number"
                    value={amount}
                    min={1000}
                    step={1000}
                    onChange={e => setAmount(Number(e.target.value))}
                />
            </label>
            <button className="buy-btn" onClick={handleBuy}>구매하기</button>
            {/* 안내 메시지 표시 */}
            {msg && <div className="buy-tips">{msg}</div>}
            {tickets.length > 0 && (
                <div>
                    <h4>생성된 번호</h4>
                    {tickets.map((ticket, i) => (
                        <div key={i}>{ticket.join(', ')}</div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LottoBuy;
