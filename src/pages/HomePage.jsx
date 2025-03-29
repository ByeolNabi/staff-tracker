import { useState } from "react";
import Board from "../Components/Board";

function HomePage() {
    const type_out = { name: "부재중", button: "+" };
    const type_in = { name: "근무중", button: "-" };

    const [person_out, setPersonOut] = useState([
        { userName: "김대규", date: new Date() },
        { userName: "장현오", date: new Date() },
        { userName: "김도현", date: new Date() },
        { userName: "이도원", date: new Date() },
    ]);

    const [person_in, setPersonIn] = useState([
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
                <div className="go-space">
                    <Board type={type_out} personInfoList={person_out} onButtonClick={movePersonOutIn}/>
                </div>
                <div className="go-space">
                    <Board type={type_in} personInfoList={person_in} onButtonClick={movePersonInOut}/>
                </div>
            </main>
        </>
    )
}

export default HomePage;