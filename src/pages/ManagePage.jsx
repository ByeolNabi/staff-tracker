import { useState } from "react";
import BoardManage from "../Components/BoardManage";

function ManagePage() {
    const type = { name: "현재 인원:", button: "-" };

    const [personCrt, setPersonCrt] = useState([
        { userName: "김대규", date: new Date() },
        { userName: "장현오", date: new Date() },
        { userName: "김도현", date: new Date() },
        { userName: "이도원", date: new Date() },
    ]);

    const deletePerson = (person) => {
        setPersonCrt((prev) => prev.filter((p) => p.userName !== person.userName));
    }

    return (
        <>
            <main>
                <div className="board-space">
                    <BoardManage type={type} personInfoList={personCrt} onButtonClick={deletePerson} />
                </div>
                <div className="board-space">
                </div>
            </main>
        </>
    );
}

export default ManagePage;