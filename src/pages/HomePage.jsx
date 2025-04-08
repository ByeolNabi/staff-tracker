import { useState, useContext, useEffect } from "react";
import Board from "../components/Board"
import api from "../services/api";
import AuthContext from "../context/AuthContext";

function HomePage() {
    const type_out = { name: "부재중", button: "+" };
    const type_in = { name: "근무중", button: "-" };
    const { auth } = useContext(AuthContext);

    const [personTotal, setPersonTotal] = useState([]);
    const [personOut, setPersonOut] = useState([]);
    const [personIn, setPersonIn] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 백엔드에서 직원 데이터를 가져오는 함수
    const fetchPersonData = async () => {
        try {
            console.log("fetchPersonData")
            setLoading(true);
            const data = await api.getPersons();
            setPersonTotal(data.length)

            // 백엔드 데이터를 personIn/personOut으로 분류
            const outPersons = [];
            const inPersons = [];

            data.forEach(person => {
                // 백엔드 데이터를 PersonCard에서 사용하는 형식으로 변환
                const formattedPerson = {
                    userName: person.person_name,
                    date: person.last_record_time ? new Date(person.last_record_time) : new Date(),
                    // 필요하다면 추가 데이터 매핑
                };

                // is_present 값에 따라 분류
                if (person.is_present === 1) {
                    inPersons.push(formattedPerson);
                } else {
                    outPersons.push(formattedPerson);
                }
            });

            setPersonOut(outPersons);
            setPersonIn(inPersons);
            setError(null);
        } catch (err) {
            console.error("직원 데이터 조회 중 오류 발생:", err);
            setError("데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchPersonData();
    }, []);

    // 상태 변경: 부재중 → 근무중
    const movePersonOutIn = async (person) => {
        try {
            // 낙관적 UI 업데이트
            // setPersonOut(prev => prev.filter(p => p.userName !== person.userName));
            // setPersonIn(prev => [...prev, { ...person, date: new Date() }]);

            console.log("movePersonOutIn")
            // API 호출로 서버 상태 업데이트 및 출근 기록
            await api.recordAttendance(person.userName, true); // true = 'in'

            await fetchPersonData();

        } catch (err) {
            console.error("출근 처리 중 오류:", err);
            alert("출근 상태 변경에 실패했습니다.");
        }
    };

    // 상태 변경: 근무중 → 부재중
    const movePersonInOut = async (person) => {
        console.log("movePersonInOut")
        try {
            // 낙관적 UI 업데이트
            // setPersonIn(prev => prev.filter(p => p.userName !== person.userName));
            // setPersonOut(prev => [...prev, { ...person, date: new Date() }]);

            // API 호출로 서버 상태 업데이트 및 퇴근 기록
            await api.recordAttendance(person.userName, false); // false = 'out'

            await fetchPersonData();

        } catch (err) {
            console.error("퇴근 처리 중 오류:", err);
            alert("퇴근 상태 변경에 실패했습니다.");
        }
    };

    return (
        <>
            <main>
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        데이터를 불러오는 중...
                    </div>
                ) : error ? (
                    <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="board-space">
                            <Board
                                type={type_out}
                                personInfoList={personOut}
                                personTotal={personTotal}
                                onButtonClick={movePersonOutIn}
                            />
                        </div>
                        <div className="board-space">
                            <Board
                                type={type_in}
                                personInfoList={personIn}
                                personTotal={personTotal}
                                onButtonClick={movePersonInOut}
                            />
                        </div>
                    </>
                )}
            </main>
        </>
    )
}

export default HomePage;