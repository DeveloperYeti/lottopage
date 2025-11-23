import React, { useState } from 'react';
import api from '../api/axios';

function MyPage({ userName }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [verifyMsg, setVerifyMsg] = useState("");
    const [verified, setVerified] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [changeMsg, setChangeMsg] = useState("");

    // 현재 비밀번호 확인
    const handleVerify = async () => {
        try {
            const res = await api.post('/api/users/verify-password', {
                username: userName,
                password: currentPassword
            });
            if (res.data.ok) {
                setVerified(true);
                setVerifyMsg("확인되었습니다!");
            } else {
                setVerifyMsg("비밀번호가 틀렸습니다.");
            }
        } catch {
            setVerifyMsg("서버 오류");
        }
    };

    // 새 비밀번호 변경
    const handleChange = async () => {
        if (!newPassword || newPassword.length < 5) {
            setChangeMsg("새 비밀번호를 5자 이상 입력하세요.");
            return;
        }
        try {
            const res = await api.post('/api/users/change-password', {
                username: userName,
                oldPassword: currentPassword,
                newPassword: newPassword
            });
            if (res.data.ok) {
                setChangeMsg("비밀번호 변경 성공!");
                setVerified(false);
                setCurrentPassword("");
                setNewPassword("");
            } else {
                setChangeMsg(res.data.error || "비밀번호 변경 실패");
            }
        } catch {
            setChangeMsg("서버 오류");
        }
    };

    // 사용자 이름(닉네임) 가져오기: 예시로만 localStorage 사용, 실제로는 props 또는 API로 Name을 받아올 것
    const name = localStorage.getItem('username') || userName;

    return (
        <div className="mypage">
            <h2>마이페이지</h2>
            <p><b>이름:</b> {name}</p>
            <p><b>아이디:</b> {userName}</p>

            {!verified ? (
                <div>
                    <input
                        type="password"
                        placeholder="현재 비밀번호 입력"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                    />
                    <button onClick={handleVerify}>확인</button>
                    {verifyMsg && <div>{verifyMsg}</div>}
                </div>
            ) : (
                <div>
                    <input
                        type="password"
                        placeholder="새 비밀번호 입력"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleChange}>비밀번호 변경</button>
                    {changeMsg && <div>{changeMsg}</div>}
                </div>
            )}
        </div>
    );
}

export default MyPage;
