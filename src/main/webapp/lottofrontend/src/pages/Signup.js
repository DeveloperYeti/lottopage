import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../pages/css/Signup.css';

function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [signupMsg, setSignupMsg] = useState("");
    const [emailStatus, setEmailStatus] = useState("");
    const [usernameStatus, setUsernameStatus] = useState("");
    const [pwCheckStatus, setPwCheckStatus] = useState("");
    const navigate = useNavigate();

    const isFormValid = (
        email && name && username && password && passwordCheck &&
        emailStatus === "사용 가능한 이메일" &&
        usernameStatus === "사용 가능한 아이디" &&
        pwCheckStatus === "비밀번호 일치!"
    );

    const checkDuplicate = async (type, value) => {
        if (!value) return;
        try {
            const res = await api.get("/api/users/exists", { params: { type, value } });
            if (type === "email")
                setEmailStatus(res.data.exists ? "이미 사용중인 이메일" : "사용 가능한 이메일");
            if (type === "username")
                setUsernameStatus(res.data.exists ? "이미 사용중인 아이디" : "사용 가능한 아이디");
        } catch {
            if (type === "email") setEmailStatus("확인 실패");
            if (type === "username") setUsernameStatus("확인 실패");
        }
    };

    const checkPasswordMatch = () => {
        if (!password || !passwordCheck)
            setPwCheckStatus("비밀번호 입력 필요");
        else if (password.length > 20)
            setPwCheckStatus("비밀번호는 20자 이하");
        else if (password !== passwordCheck)
            setPwCheckStatus("비밀번호가 일치하지 않음");
        else
            setPwCheckStatus("비밀번호 일치!");
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupMsg("");
        if (!isFormValid) return;
        try {
            const res = await api.post('/api/users/signup', { email, name, username, password, passwordCheck });
            if (res.data.error) {
                setSignupMsg(res.data.error);
            } else {
                alert("가입에 성공했습니다!");
                navigate("/");
            }
        } catch {
            setSignupMsg("네트워크 오류");
        }
    };

    return (
        <div className="signup">
            <h2>회원가입</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setEmailStatus(""); }}
                        className="input-wide"
                    />
                    <button
                        type="button"
                        className="check-btn"
                        onClick={() => checkDuplicate("email", email)}
                    >
                        중복확인
                    </button>
                </div>
                {emailStatus && <div className={emailStatus.startsWith("사용") ? "ok-msg" : "error-msg"}>{emailStatus}</div>}
                <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input-wide"
                />
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={e => { setUsername(e.target.value); setUsernameStatus(""); }}
                        className="input-wide"
                    />
                    <button
                        type="button"
                        className="check-btn"
                        onClick={() => checkDuplicate("username", username)}
                    >
                        중복확인
                    </button>
                </div>
                {usernameStatus && <div className={usernameStatus.startsWith("사용") ? "ok-msg" : "error-msg"}>{usernameStatus}</div>}
                <input
                    type="password"
                    placeholder="비밀번호(20자 이하)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-wide"
                />
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={passwordCheck}
                        onChange={e => setPasswordCheck(e.target.value)}
                        className="input-wide"
                    />
                    <button
                        type="button"
                        className="check-btn"
                        onClick={checkPasswordMatch}
                    >
                        확인
                    </button>
                </div>
                {pwCheckStatus && <div className={pwCheckStatus === "비밀번호 일치!" ? "ok-msg" : "error-msg"}>{pwCheckStatus}</div>}
                <button type="submit" className="signup-btn" disabled={!isFormValid}>가입하기</button>
            </form>
            {signupMsg && <div className="status-msg">{signupMsg}</div>}
        </div>
    );
}

export default Signup;
