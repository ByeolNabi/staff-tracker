import { useState } from "react";
import Button from "./Button";

function Header() {
    var userId, userPw;
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    return (
        <header>
            <div className="contents">
                <div className="left">
                    <img src="/under-phase.svg" style={{ width: '28px', height: '28px' }} />
                    <h1>&nbsp;&nbsp;| 사무실 현황</h1></div>
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
                        <div>관리자 로그인</div>
                        <img className="close-btn" onClick={() => setIsOpen(false)} src="/close-sidemenu.svg" />
                    </div>
                    <div className="border-line" style={{ background: "#D9D9D9", height: "1px", width: "100vh", position: "fixed", right: "0px", top: "66px" }} />
                    <div className="side-main">
                        <input
                            className="user-input"
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            name="Id"
                        />
                        <input
                            className="user-input"
                            type="text"
                            placeholder="아이디"
                            value={userPw}
                            name="Pw"
                        />
                        <Button text={"로그인"} />
                    </div>
                </div>
                :
                <div className={`side-menu ${isOpen ? "open" : ""}`}>
                    <div className="side-header">
                        <div>Admin님 안녕하세요.</div>
                        <img className="close-btn" onClick={() => setIsOpen(false)} src="/close-sidemenu.svg" />
                    </div>
                    <div className="border-line" style={{ background: "#D9D9D9", height: "1px", width: "100vh", position: "fixed", right: "0px", top: "66px" }} />
                    <div className="side-main">
                        <ul>
                            <li style={{ listStyleImage: "url('/person.svg')" }}>인원 변경</li>
                            <li style={{ listStyleImage: "url('/calendar.svg')" }}>일자별 기록 확인</li>
                        </ul>

                    </div>
                </div>}
        </header>
    )
}

export default Header;