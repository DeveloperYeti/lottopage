import '../pages/css/Result.css';

function Result() {
    return (
        <div className="result">
            <h2>당첨 확인</h2>
            <div className="result-card">
                <input className="result-input" placeholder="회차 번호" type="number" />
                <button className="result-btn">당첨번호 확인</button>
                <input className="result-input" placeholder="나의 번호 입력" />
                <button className="result-btn">내 번호 확인</button>
            </div>
        </div>
    );
}
export default Result;
