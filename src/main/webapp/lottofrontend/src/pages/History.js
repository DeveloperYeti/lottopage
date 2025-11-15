import '../pages/css/Histroy.css';

function History() {
    return (
        <div className="history">
            <h2>구매/당첨 내역</h2>
            <div className="history-list">
                <div className="history-item">
                    <span>1090회 구매 • 나의 번호: 1, 11, 23, 28, 36, 41</span>
                </div>
                <div className="history-item">
                    <span>1089회 당첨 • 3등!</span>
                </div>
            </div>
        </div>
    );
}
export default History;
