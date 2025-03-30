import { useState } from "react";
import Button from "./Button";

function Header() {
    var userId, userPw;
    const [isOpen, setIsOpen] = useState(false);

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

            <div className={`side-menu ${isOpen ? "open" : ""}`}>

                <div className="side-header">
                    <div>관리자 로그인</div>
                    <img className="close-btn" onClick={() => setIsOpen(false)} src="/close-sidemenu.svg" />
                </div>
                <div className="border-line" style={{ background: "#D9D9D9", height: "1px", width: "100vh", position:"fixed", right:"0px" , top:"66px"}} />
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
                    <Button text={"로그인"}/>
                </div>

            </div>
        </header>
    )
}

export default Header;