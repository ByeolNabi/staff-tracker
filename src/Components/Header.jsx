import { useState } from "react";

function Header() {
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
                <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
                <ul>
                    <li>메뉴 1</li>
                    <li>메뉴 2</li>
                    <li>메뉴 3</li>
                </ul>
            </div>
        </header>
    )
}

export default Header;