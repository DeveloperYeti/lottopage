import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LottoBuy from './pages/LottoBuy';
import Result from './pages/Result';
import History from './pages/History';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
    // 반드시 함수 내부에서 선언!
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    // ex) 테스트 목적으로 로그인 버튼 누르면 상태 변경하는 함수, 실제론 로그인/회원가입 연동
    // const handleLogin = (name, admin) => {
    //   setIsLoggedIn(true);
    //   setUserName(name);
    //   setIsAdmin(admin); // true: 관리자, false: 일반
    // };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} userName={userName} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/buy" element={<LottoBuy />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/history" element={<History />} />
                    {/* 관리자 라우트는 조건부로만 추가 */}
                    {isLoggedIn && isAdmin && (
                        <Route path="/admin" element={<Admin />} />
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
