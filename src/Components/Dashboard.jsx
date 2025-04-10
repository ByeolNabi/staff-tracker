import { useEffect, useState } from "react"
import api from "../services/api"

const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

function Dashboard(props) {
    const { setCrtPerson } = props;
    const [weeklyAttendance, setWeeklyAttendance] = useState('')

    const fetchAttendanceData = async () => {
        try {
            const data = await api.getWeeklyAttendance();
            setWeeklyAttendance(data)
        } catch (err) {
            console.error("직원 주간 출석 데이터 조회 중 오류 발생:", err);
        } finally {

        }
    }

    useEffect(() => {
        fetchAttendanceData()
    }, [])

    return (
        <div className="box dashboard">
            <div className="box-top">
                <span style={{ width: "62px" }}>이름</span>
                <span>월</span>
                <span>화</span>
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span>토</span>
                <span>일</span>
            </div>
            <div className="line" style={{ height: "1px", backgroundColor: "#D9D9D9" }}></div>
            <div className="box-mid">
                <div className="attendance-deck">
                    {
                        Object.keys(weeklyAttendance).map((name, idx) => {
                            return (

                                <div className="attendance-card" key={idx} >
                                    <div className="name" style={{ width: "62px" }} onClick={() => { setCrtPerson(name) }}>{name}</div>
                                    {days.map((day, idx) => {
                                        return (
                                            <div key={idx}>
                                                {
                                                    weeklyAttendance[name][day] ?
                                                        <img src="/public/checked.svg" /> : <img src="/public/check.svg" />
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard