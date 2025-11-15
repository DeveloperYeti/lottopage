import { Link } from 'react-router-dom';
import './component.css';

// 임시 로그인 상태 관리(Public/Private 전환)
// 실제론 Redux/context/api 등으로 대체
const isLoggedIn = true;       // false일 경우 미로그인 상태
const userName = "홍길동";     // 로그인한 사용자명 (예시)

function Header() {
    return (
        <header className="header">
            <h1 className="logo">🎱 Lotto</h1>
            <nav className="main-nav">
                <Link to="/">홈</Link>
                <Link to="/buy">구매</Link>
                <Link to="/result">당첨확인</Link>
                <Link to="/history">내역</Link>
                <Link to="/admin">관리자</Link>
            </nav>
            <nav className="user-nav">
                {isLoggedIn ? (
                    <>
                        <span className="user-name">{userName}님</span>
                        <Link to="/mypage" className="btn-link">마이페이지</Link>
                        <button className="btn-link">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-link">로그인</Link>
                        <Link to="/signup" className="btn-link">회원가입</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
export default Header;
