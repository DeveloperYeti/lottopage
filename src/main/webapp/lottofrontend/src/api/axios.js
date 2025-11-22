// api/axios.js
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
});

// 로그인 함수
export const handleLogin = async (username, password) => {
    try {
        const res = await api.post('/api/users/login', { username, password });
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('isAdmin', res.data.isAdmin);
            return { ok: true, ...res.data };
        } else if (res.data.error) {
            return { ok: false, error: res.data.error };
        }
    } catch (error) {
        return { ok: false, error: '서버 오류' };
    }
};

// 인증이 필요한 요청 예시 함수
export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');
    return api.get('/api/protected-endpoint', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default api; // 기본 axios 인스턴스도 필요시 export
