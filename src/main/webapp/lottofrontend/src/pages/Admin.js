import React, { useState } from 'react';
import api from '../api/axios';
import '../pages/css/Admin.css';

function Admin() {
    const [drawNumber, setDrawNumber] = useState("");
    const [numbers, setNumbers] = useState("");
    const [msg, setMsg] = useState("");
    // 추가: 회원 관리 테이블은 샘플 데이터(실제로는 api로 불러와야 함)
    const users = [
        { email: "user1@test.com", date: "2025-11-01", status: "정상" },
        { email: "user2@test.com", date: "2025-10-28", status: "휴면" }
    ];

    const handleDrawSubmit = async (e) => {
        e.preventDefault();
        // 관리자 추첨 등록 API 필요: API 명세에 따라 직접 POST 작성(예시 기준)
        try {
            const res = await api.post("/api/lottoDraw/draw", { drawNumber, numbers: numbers.split(",").map(n => Number(n.trim())) });
            setMsg(res.data.ok ? "등록 성공!" : (res.data.error || "오류 발생"));
        } catch {
            setMsg("서버 오류");
        }
    };

    return (
        <div className="admin">
            <h2>관리자 페이지</h2>
            <section className="admin-section">
                <form className="admin-form" onSubmit={handleDrawSubmit}>
                    <h4>회차 당첨번호 등록</h4>
                    <input type="number" placeholder="회차(ex. 1092)" value={drawNumber} onChange={e => setDrawNumber(e.target.value)} />
                    <input type="text" placeholder="당첨 번호(쉼표구분)" value={numbers} onChange={e => setNumbers(e.target.value)} />
                    <button className="admin-btn">등록</button>
                </form>
                {msg && <div>{msg}</div>}
            </section>
            <section className="admin-section">
                <h4>회원 관리</h4>
                <table className="admin-table">
                    <thead>
                    <tr><th>이메일</th><th>가입일</th><th>상태</th></tr>
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
