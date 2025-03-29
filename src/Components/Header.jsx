function Header() {
    return (
        <header>
            <div className="contents">
                <div className="left">
                    <img src="/under-phase.svg" style={{ width: '28px', height: '28px' }} />
                    <h1>&nbsp;&nbsp;| 사무실 현황</h1></div>
                <div className="right">
                    <img className="ham-menu" src="/hamburger.svg" />
                </div>
            </div>
        </header>
    )
}

export default Header;