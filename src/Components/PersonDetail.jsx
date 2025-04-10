import { useEffect, useState } from "react";
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
                if (personName === "none") {
                    setTimelineData([]);
                    return;
                }

                const result = await api.getAttendance(personName);

                // 요일 순서 정의
                const orderedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

                // 데이터를 그래프 형식으로 변환
                const chartData = orderedDays
                    .filter(day => result.weeklyTimeline[day] !== undefined)
                    .map((day) => {
                        const hours = Array(24).fill(0); // 24시간 초기화

                        result.weeklyTimeline[day].forEach((record) => {
                            // 시간 문자열을 date객체로
                            const startKST = new Date(record.start);
                            const endKST = new Date(record.end);

                            // 날짜가 변경되는지 확인
                            const isSameDay = startKST.getDate() === endKST.getDate();

                            if (isSameDay) {
                                // 같은 날에 시작 및 종료
                                for (let hour = startKST.getHours(); hour <= endKST.getHours(); hour++) {
                                    if (hour >= 0 && hour < 24) {
                                        hours[hour] = 1;
                                    }
                                }
                            } else {
                                // 날짜가 변경되는 경우 (예: 23시 -> 02시)
                                // 첫째 날: 시작 시간부터 23시까지
                                for (let hour = startKST.getHours(); hour < 24; hour++) {
                                    hours[hour] = 1;
                                }
                                // 다음 날 처리는 별도로 진행
                            }
                        });

                        return {
                            day: dayMapping[day] || day,
                            hours: hours
                        };
                    });

                // 다음 날로 이어지는 데이터 처리
                orderedDays.forEach((day, index) => {
                    if (index < orderedDays.length - 1 && result.weeklyTimeline[day]) {
                        const nextDay = orderedDays[index + 1];

                        result.weeklyTimeline[day].forEach((record) => {
                            const startKST = new Date(record.start);
                            const endKST = new Date(record.end);

                            // 날짜가 변경되는지 확인
                            if (startKST.getDate() !== endKST.getDate()) {
                                // 다음 날 데이터 찾기
                                const nextDayDataIndex = chartData.findIndex(item => item.day === dayMapping[nextDay]);

                                if (nextDayDataIndex !== -1) {
                                    // 다음 날 0시부터 종료 시간까지
                                    for (let hour = 0; hour <= endKST.getHours(); hour++) {
                                        if (hour < 24) {
                                            chartData[nextDayDataIndex].hours[hour] = 1;
                                        }
                                    }
                                }
                            }
                        });
                    }
                });

                setTimelineData(chartData);
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
    const timeLabels = [
        { label: '0', position: 0 },
        { label: '3', position: 3 },
        { label: '6', position: 6 },
        { label: '9', position: 9 },
        { label: '12', position: 12 },
        { label: '15', position: 15 },
        { label: '18', position: 18 },
        { label: '21', position: 21 },
        { label: '24', position: 24 }
    ];

    // CSS 스타일 객체 정의
    const styles = {
        timelineHeader: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
            position: 'relative',
            height: '20px'
        },
        timeLabels: {
            position: 'relative',
            width: '100%',
            height: '20px',
            marginLeft: '30px',
            marginRight: '3px'  // 우측 여백 추가
        },
        timeLabel: {
            position: 'absolute',
            fontSize: '10px',
            color: '#666',
            transform: 'translateX(-50%)'  // 텍스트 중앙 정렬
        },
        timelineContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            height: '200px',
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
                <div>{personName === "none" ? '' : personName}</div>
                <div>{new Date().toLocaleDateString('ko-KR')}</div>
            </div>
            <div className="box-mid" style={{ flexGrow: "1" }}>
                {personName === "none" ? <div style={styles.loadingMessage}>
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
                                {timeLabels.map((item, index) => (
                                    <div 
                                        key={index} 
                                        style={{
                                            ...styles.timeLabel,
                                            // 각 레이블의 정확한 위치 계산 (24시간 블록에 맞춤)
                                            left: `${(item.position / 26) * 98}%`,
                                            top: "-10px"
                                        }}
                                    >
                                        {item.label}
                                    </div>
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