import PersonCard from "./Components/PersonCard";

function HomePage() {
    return (
        <>
            <main>
                <div className="go-space">출근 공간
                    <div>
                        박스
                        <div className="box-top">
                            <div>공석</div>
                            <div>오늘 날짜</div>
                        </div>
                        <div className="box-mid">박스 중단
                            <PersonCard />
                            <PersonCard />
                            <PersonCard />
                            <PersonCard />
                            <PersonCard />
                            <PersonCard />
                        </div>
                        <div className="box-bottom">
                            <div className="count-graph">
                                <div className="graph-top">
                                    <div>0</div><div>10</div>
                                </div>
                                <div className="graph-mid">
                                    ===============
                                </div>
                                <div className="graph-bottom">
                                    <div>
                                        공석 : n명
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage;