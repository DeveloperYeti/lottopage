import '../pages/css/Admin.css';

function Admin() {
    return (
        <div className="admin">
            <h2>관리자 페이지</h2>
            <section className="admin-section">
                <form className="admin-form">
                    <h4>회차 당첨번호 등록</h4>
                    <input type="number" placeholder="회차(ex. 1092)" />
                    <input type="text" placeholder="당첨 번호(쉼표구분)" />
                    <button className="admin-btn">등록</button>
                </form>
            </section>
            <section className="admin-section">
                <h4>회원 관리</h4>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>이메일</th><th>가입일</th><th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>user1@test.com</td>
                        <td>2025-11-01</td>
                        <td>정상</td>
                    </tr>
                    <tr>
                        <td>user2@test.com</td>
                        <td>2025-10-28</td>
                        <td>휴면</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}
export default Admin;
