import React, { useState, useEffect } from 'react'; // useEffect 추가!
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

    // 앱 시작 시 토큰이 있으면 로그인 상태 복구
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const admin = localStorage.getItem("isAdmin") === "true";
        if (token) {
            setIsLoggedIn(true);
            setUserName(username || "");
            setIsAdmin(admin);
        }
    }, []);

    const handleLogin = (name, admin = false) => {
        setIsLoggedIn(true);
        setUserName(name);
        setIsAdmin(admin);
        // 토큰/username/isAdmin은 이미 Login.js에서 localStorage에 저장됨을 가정
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName("");
        setIsAdmin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/buy" element={<LottoBuy isLoggedIn={isLoggedIn} userName={userName} />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/history" element={<History isLoggedIn={isLoggedIn} userName={userName} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
export default App;
