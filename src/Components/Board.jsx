import PersonCard from "../Components/PersonCard";

function Board(props) {
    const { type, personInfoList, onButtonClick } = props


    const today = new Date()

    return (
        <div className="box">
            <div className="box-top">
                <div>{type.name}</div>
                <div>{today.toLocaleDateString('ko-KR')}</div>
            </div>
            <div className="box-mid">
                <div className="deck">
                    {personInfoList.map((personInfo, index) => (
                        <PersonCard
                            key={index}
                            personInfo={personInfo}
                            button={type.button}
                            onButtonClick={onButtonClick}
                        />
                    ))}
                </div>
            </div>
            <div className="box-bottom">
                <div className="count-graph">
                    <div className="graph-top">
                        <div>0</div><div>10</div>
                    </div>
                    <div className="graph-mid">===============</div>
                    <div className="graph-bottom">
                        <div>
                            공석 : {personInfoList.length}명
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board;