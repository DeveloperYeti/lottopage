import { Link } from 'react-router-dom';
import './component.css';

function Header({ isLoggedIn, userName, onLogout }) {
    return (
        <header className="header">
            <Link to="/" className="logo">🎱 Lotto</Link>
            <nav className="main-nav">
                <Link to="/buy">구매</Link>
                <Link to="/result">당첨확인</Link>
                <Link to="/history">내역</Link>
            </nav>
            <nav className="user-nav">
                {isLoggedIn ? (
                    <>
                        <span className="user-name">{userName}님</span>
                        <Link to="/mypage" className="btn-link">마이페이지</Link>
                        <button
                            className="btn-link logout-btn"
                            onClick={onLogout}
                        >로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-link">로그인</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
