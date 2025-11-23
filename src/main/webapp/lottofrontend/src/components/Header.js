import React from 'react';
import { Link } from 'react-router-dom';
import './component.css';

function Header({ isLoggedIn, userName, onLogout, isAdmin }) {
    return (
        <header className="header">
            <span className="logo">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    Yeti Lotto
                </Link>
            </span>
            <nav className="main-nav">
                {isAdmin ? (
                    <Link to="/admin">회차/추첨 관리</Link>
                ) : (
                    <>
                        <Link to="/buy">구매</Link>
                        <Link to="/result">당첨확인</Link>
                        <Link to="/history">구매내역</Link>
                    </>
                )}
            </nav>
            <nav className="user-nav">
                {isLoggedIn ? (
                    <>
                        {!isAdmin && <span className="user-name">{userName}님</span>}
                        <button className="btn-link" onClick={onLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
export default Header;
