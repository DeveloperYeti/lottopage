import './css/Home.css';

function Home() {
    return (
        <div className="home-wrapper">
            <div className="card">
                <h1>로또 서비스</h1>
                <p>매주 새로운 행운에 도전하세요!</p>
                <img src="/lotto-hero.png" alt="Lotto Hero" className="hero-image" />
                <button className="primary-btn">번호 빠르게 생성</button>
            </div>
            <div className="quick-menu">
                <a href="/buy" className="qm-btn">구매하기</a>
                <a href="/result" className="qm-btn">당첨확인</a>
                <a href="/history" className="qm-btn">구매내역</a>
                {/* 필요시 추가 */}
            </div>
        </div>
    );
}
export default Home;
