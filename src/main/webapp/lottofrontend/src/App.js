import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LottoBuy from './pages/LottoBuy';
import Result from './pages/Result';
import History from './pages/History';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import MyPage from './pages/MyPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

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
            <Header isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} isAdmin={isAdmin} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* 관리자 분기: admin 계정이면 admin 페이지만 허용 */}
                    {isAdmin ? (
                        <>
                            <Route path="/admin" element={<Admin />} />
                            {/* 일반 유저 경로는 접근시 강제 admin 리디렉트 */}
                            <Route path="/buy" element={<Navigate to="/admin" />} />
                            <Route path="/result" element={<Navigate to="/admin" />} />
                            <Route path="/mypage" element={<Navigate to="/admin" />} />
                            <Route path="/history" element={<Navigate to="/admin" />} />
                        </>
                    ) : (
                        <>
                            {/* 일반 유저만 */}
                            <Route path="/buy" element={<LottoBuy isLoggedIn={isLoggedIn} userName={userName} />} />
                            <Route path="/result" element={<Result />} />
                            <Route path="/mypage" element={
                                isLoggedIn ? <MyPage userName={userName} /> : <Navigate to="/login" />
                            } />
                            <Route path="/history" element={<History isLoggedIn={isLoggedIn} userName={userName} />} />
                            {/* 관리자 라우트 접근시 홈으로 */}
                            <Route path="/admin" element={<Navigate to="/" />} />
                        </>
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
export default App;
