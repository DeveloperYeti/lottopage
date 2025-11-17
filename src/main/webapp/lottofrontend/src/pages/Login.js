import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages/css/Login.css';

function Login({ onLogin }) {
    // 테스트 계정 정보
    const TEST_USER = {
        username: 'test',
        password: 'test12',
        name: '테스트유저'
    };

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
        // 테스트 계정 케이스 (프론트에서 즉시 성공)
        if (username === TEST_USER.username && password === TEST_USER.password) {
            setLoginMsg("테스트 계정으로 로그인 성공!");
            if (onLogin) onLogin(username, false);
            setTimeout(() => navigate("/"), 700);
            return;
        }
        // 그 외는 백엔드에 실제 인증 요청
        try {
            const res = await axios.post('http://localhost:8080/api/users/login', { username, password });
            if (res.data.ok) {
                setLoginMsg("로그인 성공!");
                if (onLogin) onLogin(username, res.data.isAdmin);
                setTimeout(() => navigate("/"), 600);
            } else if (res.data.error) {
                setLoginMsg(res.data.error);
            } else {
                setLoginMsg("알 수 없는 에러");
            }
        } catch (err) {
            setLoginMsg("서버 오류 또는 네트워크 문제");
        }
    };

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
            <div className="status-msg" style={{ marginTop: 10, color: "#297def" }}>
                테스트 계정: <b>test / test12</b>
            </div>
            {loginMsg && <div className="status-msg">{loginMsg}</div>}
        </div>
    );
}

export default Login;
