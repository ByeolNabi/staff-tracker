import { useEffect, useState, useContext } from "react";
import BoardManage from "../components/BoardManage";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

function ManagePage() {
    const type = { name: "현재 인원:", button: "-" };

    const [personCrt, setPersonCrt] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);

    const fetchPersonData = async () => {
        console.log("fetch실행");
        try {
            setLoading(true);
            const data = await api.getPersons();
            // 백엔드 데이터를 애플리케이션에서 사용할 형식으로 변환
            const formattedData = data.map(person => ({
                userName: person.person_name,
                date: new Date(person.last_record_time || Date.now())
            }));
            setPersonCrt(formattedData);
            setError(null);
        } catch (err) {
            console.error("직원 데이터 조회 중 오류 발생:", err);
            setError("데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonData();
    }, []);


    // 직원 삭제 함수
    const deletePerson = async (person) => {
        try {
            if (!auth.token) {
                alert("로그인이 필요합니다.");
                return;
            }

            await api.deletePerson(person.userName);
            // 성공 시 데이터 다시 불러오기
            fetchPersonData();
        } catch (err) {
            console.error("직원 삭제 중 오류 발생:", err);
            alert(err.response?.data?.message || "삭제 중 오류가 발생했습니다.");
        }
    };

    // 직원 추가 함수 (BoardManage에 전달)
    const addPerson = async (personData) => {
        try {
            await api.addPerson(personData);
            // 성공 시 데이터 다시 불러오기
            fetchPersonData();
            return true; // 성공 여부 반환
        } catch (err) {
            console.error("직원 추가 중 오류 발생:", err);
            throw err; // 오류를 상위로 전파
        }
    };

    return (
        <>
            <main>
                <div className="board-space">
                    <BoardManage type={type} personInfoList={personCrt} onButtonClick={deletePerson} onAddPerson={addPerson} />
                </div>
                <div className="board-space">
                </div>
            </main>
        </>
    );
}

export default ManagePage;