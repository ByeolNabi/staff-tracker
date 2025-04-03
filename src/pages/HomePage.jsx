import { useState } from "react";
import Board from "../components/Board"

function HomePage() {
    const type_out = { name: "부재중", button: "+" };
    const type_in = { name: "근무중", button: "-" };

    const [personOut, setPersonOut] = useState([
        { userName: "김대규", date: new Date() },
        { userName: "장현오", date: new Date() },
        { userName: "김도현", date: new Date() },
        { userName: "이도원", date: new Date() },
    ]);

    const [personIn, setPersonIn] = useState([
        { userName: "김청해", date: new Date() },
        { userName: "신창섭", date: new Date() },
    ]);

    const movePersonOutIn = (person) => {
        setPersonOut((prev) => prev.filter((p) => p.userName !== person.userName));
        setPersonIn((prev) => [...prev, person]);
    };

    const movePersonInOut = (person) => {
        setPersonIn((prev) => prev.filter((p) => p.userName !== person.userName));
        setPersonOut((prev) => [...prev, person]);
    };

    return (
        <>
            <main>
                <div className="board-space">
                    <Board type={type_out} personInfoList={personOut} onButtonClick={movePersonOutIn}/>
                </div>
                <div className="board-space">
                    <Board type={type_in} personInfoList={personIn} onButtonClick={movePersonInOut}/>
                </div>
            </main>
        </>
    )
}

export default HomePage;