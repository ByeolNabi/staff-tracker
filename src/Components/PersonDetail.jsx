import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import api from "../services/api";

function PersonDetail(props) {
    const { personName } = props
    const [timelineData, setTimelineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 요일 매핑 (영어 -> 한글)
    const dayMapping = {
        "Monday": "월",
        "Tuesday": "화",
        "Wednesday": "수",
        "Thursday": "목",
        "Friday": "금",
        "Saturday": "토",
        "Sunday": "일"
    };

    useEffect(() => {
        async function fetchTimelineData() {
            try {
                setLoading(true);
                const result = await api.getAttendance(personName);

                // 데이터를 그래프 형식으로 변환
                const chartData = Object.keys(result.weeklyTimeline)
                    .filter(day => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(day)) // 평일만 표시
                    .map((day) => {
                        const hours = Array(24).fill(0); // 24시간 초기화

                        result.weeklyTimeline[day].forEach((record) => {
                            const start = new Date(record.start);
                            const end = new Date(record.end);

                            // 시간 범위에 대해 출근 상태 표시
                            for (let hour = start.getHours(); hour <= end.getHours(); hour++) {
                                if (hour >= 0 && hour < 24) { // 유효한 시간 범위만 처리
                                    hours[hour] = 1;
                                }
                            }
                        });

                        return {
                            day: dayMapping[day] || day,
                            hours: hours
                        };
                    });

                setTimelineData(chartData);
                console.log(result)
                console.log(chartData)
                setError(null);
            } catch (err) {
                console.error("타임라인 데이터 조회 중 오류 발생:", err);
                setError("데이터를 불러오는 중 오류가 발생했습니다");
            } finally {
                setLoading(false);
            }
        }

        fetchTimelineData();
    }, [personName]);

    // 시간 레이블 생성
    const timeLabels = ['0', '3', '6', '9', '12', '15', '18', '21', '24'];

    // CSS 스타일 객체 정의
    const styles = {
        timelineHeader: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '10px'
        },
        timeLabels: {
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '30px',
        },
        timeLabel: {
            fontSize: '10px',
            color: '#666'
        },
        timelineContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            height: '180px',
            overflowY: 'auto'
        },
        timelineRow: {
            display: 'flex',
            alignItems: 'center',
            height: '24px'
        },
        dayLabel: {
            width: '30px',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'center'
        },
        timelineChart: {
            flex: 1,
            height: '100%'
        },
        hourBlocks: {
            display: 'flex',
            height: '100%',
            width: '100%'
        },
        hourBlock: {
            flex: 1,
            height: '24px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #e0e0e0',
            transition: 'background-color 0.2s ease'
        },
        hourBlockPresent: {
            backgroundColor: '#3572EF',
            borderColor: '#2a5cc3'
        },
        loadingMessage: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
            marginTop: '20px'
        },
        boldText: {
            fontWeight: 'bold',
            marginBottom: '10px'
        }
    };

    return (
        <div className="box">
            <div className="box-top">
                <div>{personName == "none" ? '' : personName}</div>
                <div>{new Date().toLocaleDateString('ko-KR')}</div>
            </div>
            <div className="box-mid" style={{ flexGrow: "1" }}>
                {personName == "none" ? <div style={styles.loadingMessage}>
                    알고싶은 사람을 선택해주세요
                </div> : loading ? (
                    <div style={styles.loadingMessage}>
                        데이터를 불러오는 중...
                    </div>
                ) : error ? (
                    <div style={styles.errorMessage}>
                        {error}
                    </div>
                ) : (
                    <>
                        <div style={styles.timelineHeader}>
                            <div style={styles.boldText}>주간 출근 현황</div>
                            <div style={styles.timeLabels}>
                                {timeLabels.map((label, index) => (
                                    <div key={index} style={styles.timeLabel}>{label}</div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.timelineContainer}>
                            {timelineData.map((dayData) => (
                                <div key={dayData.day} style={styles.timelineRow}>
                                    <div style={styles.dayLabel}>{dayData.day}</div>
                                    <div style={styles.timelineChart}>
                                        <div style={styles.hourBlocks}>
                                            {dayData.hours.map((value, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        ...styles.hourBlock,
                                                        ...(value === 1 ? styles.hourBlockPresent : {})
                                                    }}
                                                    title={`${index}시: ${value === 1 ? '출근' : '미출근'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PersonDetail;