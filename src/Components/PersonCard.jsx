function PersonCard(props) {
    const { personInfo } = props;
    const format = { hour: 'numeric', minute: 'numeric', hour12: true }; // 12시간 형식
    const timeString = personInfo.date.toLocaleTimeString('en-US', format);
    return (
        <div className="person-card">
            <div className="card-top">
                <div>
                    출퇴
                </div>
            </div>
            <div className="card-mid">
                <div>
                    {personInfo.userName}
                </div>
                <div>
                    {timeString}
                </div>
            </div>
        </div>
    )
}

export default PersonCard;