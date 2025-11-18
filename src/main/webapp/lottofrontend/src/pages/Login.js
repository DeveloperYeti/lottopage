import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../pages/css/Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMsg, setLoginMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginMsg("");
        if (!username || !password) {
            setLoginMsg("아이디와 비밀번호를 입력하세요");
            return;
        }
        // 테스트 계정 즉시 성공 (원하는 경우만 사용)
        if (username === "test" && password === "test12") {
            setLoginMsg("테스트 계정으로 로그인 성공!");
            if (onLogin) onLogin(username, false);
            setTimeout(() => navigate("/"), 700);
            return;
        }
        try {
            const res = await api.post('/api/users/login', { username, password });
            if (res.data.ok) {
                setLoginMsg("로그인 성공!");
                if (onLogin) onLogin(username, res.data.isAdmin);
                setTimeout(() => navigate("/"), 600);
            } else {
                setLoginMsg(res.data.error || "알 수 없는 에러");
            }
        } catch (err) {
            setLoginMsg("서버 오류 또는 네트워크 문제");
        }
    };

    // 회원가입 페이지 이동 함수
    const gotoSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="login">
            <h2>로그인</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" className="login-btn">로그인</button>
            </form>
            {/* 회원가입 이동 버튼 복구 */}
            <button
                className="signup-goto-btn"
                style={{
                    marginTop: "18px",
                    background: "#f9e172",
                    color: "#223",
                    border: "none",
                    padding: ".6em 1.5em",
                    borderRadius: 5,
                    fontSize: ".99em",
                    cursor: "pointer"
                }}
                onClick={gotoSignup}
            >
                회원가입 하러가기
            </button>
            {/* 테스트 계정 안내 복구 */}
            <div className="status-msg" style={{ marginTop: 10, color: "#297def" }}>
                테스트 계정: <b>test / test12</b>
            </div>
            {/* 로그인 결과 메세지 표시 */}
            {loginMsg && <div className="status-msg">{loginMsg}</div>}
        </div>
    );
}

export default Login;
