

function Header() {
    return (
        <header>
            <div className="contents">
                <div className="left">
                    <img src="public/favicon-32x32.png" style={{ width: '28px', height: '28px' }} />
                    <h1>&nbsp;&nbsp;| 사무실 현황</h1></div>
                <div className="right">
                    <img className="ham-menu" src="public/hamburger.svg" />
                </div>
            </div>
        </header>
    )
}

export default Header;