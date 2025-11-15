import React from 'react';
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
    return (
        <Router>
            <Header />  {/* 모든 페이지 상단에 공통 노출 */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/buy" element={<LottoBuy />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer /> {/* 모든 페이지 하단에 공통 노출 */}
        </Router>
    );
}

export default App;
