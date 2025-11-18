import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import '../pages/css/Histroy.css';

function History() {
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        api.get("/api/lottonums")
            .then(res => setHistoryList(res.data))
            .catch(() => setHistoryList([]));
    }, []);

    return (
        <div className="history">
            <h2>구매/당첨 내역</h2>
            <div className="history-list">
                {historyList.map((item, idx) => (
                    <div className="history-item" key={idx}>
                        <span>{item.drawNumber}회 구매 • 나의 번호: {item.tickets.map(nums => nums.join(", ")).join("; ")}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default History;
