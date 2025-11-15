import '../pages/css/Signup.css';

function Signup() {
    return (
        <div className="signup">
            <h2>회원가입</h2>
            <form className="signup-form">
                <input type="email" placeholder="이메일" />
                <input type="password" placeholder="비밀번호" />
                <button type="submit" className="signup-btn">가입하기</button>
            </form>
        </div>
    );
}
export default Signup;
