import '../pages/css/LottoBuy.css';
import { useState } from 'react';

function LottoBuy() {
    const [count, setCount] = useState(1);
    return (
        <div className="buy">
            <h2>로또 구매</h2>
            <label>
                구매 수량:
                <input type="number" value={count} min={1} max={5} onChange={e => setCount(e.target.value)} />
            </label>
            <button className="buy-btn">구매하기</button>
            <div className="buy-tips">1~5개까지 한 번에 구매</div>
        </div>
    );
}
export default LottoBuy;
