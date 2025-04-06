import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import api from "../services/api";

function Header() {
    const navigate = useNavigate()
    const handleClick = (url) => {
        navigate(url);
        setIsOpen(false)
    }

    const [credentials, setCredentials] = useState({
        id: '',
        pw: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    var { auth, setAuth, logout } = useContext(AuthContext)
    const isLogin = (auth.token == null) ? false : true

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.login(credentials);
            // 로그인 성공 시 토큰 저장 및 상태 업데이트
            localStorage.setItem('token', response.token);
            setAuth({ token: response.token, isAuthenticated: true });
        } catch (err) {
            setError(err.response?.data?.message || '로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
            setCredentials({ id: '', pw: '' })
        }
    };

    return (
        <header>
            <div className="contents">
                <div className="left">
                    <img src="/under-phase.svg" style={{ width: '28px', height: '28px' }} />
                    &nbsp;┃&nbsp;<h1 onClick={() => handleClick('/')} >사무실 현황</h1></div>
                <div className="right">
                    <img className="ham-menu" src="/hamburger.svg"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ cursor: "pointer" }} />
                </div>
            </div>

            <div className={`overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)}></div>

            {isLogin ?
                <div className={`side-menu ${isOpen ? "open" : ""}`}>
                    <div className="side-header">
                        <div>Admin님 안녕하세요.</div>
                        <img className="close-btn" onClick={() => logout()} src="/close-sidemenu.svg" />
                    </div>
                    <div className="border-line" style={{ background: "#D9D9D9", height: "1px", width: "100vh", position: "fixed", right: "0px", top: "66px" }} />
                    <div className="side-main">
                        <ul>
                            <li onClick={() => handleClick('/manage')}><img src="/person.svg" />인원 변경</li>
                            <li onClick={() => handleClick('/dashboard')}><img src="/calendar.svg" />일자별 기록 확인</li>
                        </ul>
                    </div>
                </div>
                :
                <div className={`side-menu ${isOpen ? "open" : ""}`}>
                    <div className="side-header">
                        <div>관리자 로그인</div>
                    </div>
                    <div className="border-line" style={{ background: "#D9D9D9", height: "1px", width: "100vh", position: "fixed", right: "0px", top: "66px" }} />
                    {error && <div className="error-message">{error}</div>}
                    <form className="side-main" onSubmit={handleSubmit}>
                        <input
                            className="user-input"
                            type="text"
                            placeholder="아이디"
                            value={credentials.id}
                            onChange={handleChange}
                            id="id"
                            name="id"
                        />
                        <input
                            className="user-input"
                            type="password"
                            placeholder="비밀번호"
                            value={credentials.pw}
                            onChange={handleChange}
                            id="pw"
                            name="pw"
                        />
                        <button>{loading ? "로그인 중..." : '로그인'}</button>
                    </form>
                </div>
            }
        </header>
    )
}

export default Header;