import React, { useState } from 'react';
import api from '../api/axios';
import '../pages/css/Admin.css';

function Admin() {
    const [drawNumber, setDrawNumber] = useState("");
    const [msg, setMsg] = useState("");

    // 샘플 회원(실제는 API로)
    const users = [
        { email: "user1@test.com", date: "2025-11-01", status: "정상" },
        { email: "user2@test.com", date: "2025-10-28", status: "휴면" }
    ];

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleRandomDraw = async (e) => {
        e.preventDefault();
        if (!drawNumber) {
            setMsg("회차번호를 입력하세요.");
            return;
        }
        try {
            // 무작위 번호 등록 시도
            const res = await api.post("/api/lottoDraw/random-draw", {
                drawNumber: Number(drawNumber)
            });
            if (res.data.ok) {
                // 등록 성공 후, 실제 저장된 해당 회차의 번호 조회
                const detail = await api.get(`/api/lottoDraw/${drawNumber}`);
                if (detail.data && detail.data.winningNumbers) {
                    setMsg(
                        `등록 완료! [${drawNumber}회차] 당첨번호: [${detail.data.winningNumbers.join(", ")}]`
                    );
                } else {
                    setMsg("등록 완료! (조회 오류)");
                }
            } else {
                setMsg(res.data.error || "등록 실패");
            }
        } catch {
            setMsg("서버 오류");
        }
    };

    return (
        <div className="admin">
            <h2>관리자 페이지</h2>
            <section className="admin-section">
                <form className="admin-form" onSubmit={handleRandomDraw}>
                    <h4>회차 무작위 당첨번호 추첨·등록</h4>
                    <input
                        type="number"
                        placeholder="회차번호"
                        value={drawNumber}
                        onChange={e => setDrawNumber(e.target.value)}
                    />
                    <button className="admin-btn" type="submit">
                        무작위 추첨 (등록)
                    </button>
                </form>
                {msg && <div>{msg}</div>}
            </section>
            <section className="admin-section">
                <h4>회원 관리</h4>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>이메일</th>
                        <th>가입일</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, i) => (
                        <tr key={i}>
                            <td>{user.email}</td>
                            <td>{user.date}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
export default Admin;
