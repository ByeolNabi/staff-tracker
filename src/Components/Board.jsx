import PersonCard from "../Components/PersonCard";
import Graph from "./Graph";

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
                <Graph type={type} personInfoList={personInfoList} />
            </div>
        </div>
    )
}

export default Board;