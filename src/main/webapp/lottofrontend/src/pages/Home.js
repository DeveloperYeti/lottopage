import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import '../pages/css/Home.css';

function Home() {
    const [latestDrawNumber, setLatestDrawNumber] = useState(null);
    const [latestWinningNumbers, setLatestWinningNumbers] = useState(null);

    useEffect(() => {
        const fetchLatestDraw = async () => {
            try {
                const res = await api.get('/api/lottoDraw');
                if (Array.isArray(res.data) && res.data.length > 0) {
                    // 당첨번호 존재하는 회차 내림차순 정렬(마지막 완성된 회차)
                    const sorted = res.data
                        .filter(d => d.winningNumbers && d.winningNumbers.length > 0)
                        .sort((a, b) => b.drawNumber - a.drawNumber);

                    if (sorted.length > 0) {
                        setLatestDrawNumber(sorted[0].drawNumber);
                        setLatestWinningNumbers(sorted[0].winningNumbers);
                    }
                }
            } catch {
                setLatestDrawNumber(null);
                setLatestWinningNumbers(null);
            }
        };
        fetchLatestDraw();
    }, []);

    // 현재 회차: 마지막 회차 + 1
    const currentDrawNumber = latestDrawNumber !== null ? latestDrawNumber + 1 : null;

    return (
        <div className="home-wrapper">
            <div className="card">
                <h1>🎱 Yeti Lotto</h1>
                <div style={{marginBottom: '12px', fontWeight: 'bold', fontSize: '1.1em'}}>
                    {currentDrawNumber
                        ? <>현재 회차: <span style={{color: "#0067b3"}}>{currentDrawNumber}회차</span></>
                        : "현재 회차 정보를 불러오는 중..."}
                </div>
                <div style={{marginBottom: '12px', fontSize: '1em'}}>
                    {latestDrawNumber && latestWinningNumbers
                        ? <>마지막({latestDrawNumber}회차) 당첨번호: <span style={{color: "#4caf50"}}>{latestWinningNumbers.join(', ')}</span></>
                        : "마지막 회차 당첨번호 정보를 불러오는 중..."}
                </div>
                <p className="catchphrase">매주 새로운 행운에 <span className="rainbow-text">도전</span>하세요!</p>
                <div className="info-box">
                    <p>실시간 추첨, <b>자동/수동 구매</b> 지원 ✨<br />
                        <span style={{color:"#4caf50"}}>공정한 추첨과 보안</span>을 약속합니다!</p>
                </div>
            </div>
            <div className="quick-menu">
                <a href="/buy" className="qm-btn buy-btn">구매하기</a>
                <a href="/result" className="qm-btn result-btn">당첨확인</a>
                <a href="/history" className="qm-btn history-btn">구매내역</a>
            </div>
        </div>
    );
}

export default Home;
