import '../pages/css/Login.css';

function Login() {
    return (
        <div className="login">
            <h2>로그인</h2>
            <form className="login-form">
                <input type="email" placeholder="이메일" />
                <input type="password" placeholder="비밀번호" />
                <button type="submit" className="login-btn">로그인</button>
            </form>
        </div>
    );
}
export default Login;
