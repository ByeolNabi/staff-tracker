import PersonCard from "../Components/PersonCard";

function HomePage() {
    const personInfoList = [
        { userName: "김대규", date: new Date() },
        { userName: "장현오", date: new Date() },
        { userName: "김도현", date: new Date() },
    ]
    return (
        <>
            <main>
                <div className="go-space">
                    <div className="box">
                        <div className="box-top">
                            <div>공석</div>
                            <div>오늘 날짜</div>
                        </div>
                        <div className="box-mid">
                            <div className="deck">
                                {personInfoList.map((personInfo, index) => (
                                    <PersonCard key={index} personInfo={personInfo} />
                                ))}
                            </div>
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