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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    // 로그인/로그아웃/관리자 권한 처리
    const handleLogin = (name, admin = false) => {
        setIsLoggedIn(true);
        setUserName(name);
        setIsAdmin(admin);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName("");
        setIsAdmin(false);
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/buy" element={<LottoBuy />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/history" element={<History />} />
                    {/* 관리자 페이지는 로그인+관리자일 때만 */}
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
