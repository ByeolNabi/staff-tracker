function PersonCard(props) {
    const { personInfo, button, onButtonClick } = props;
    const format = { hour: 'numeric', minute: 'numeric', hour12: true }; // 12시간 형식
    const timeString = personInfo.date.toLocaleTimeString('en-US', format);
    return (
        <div className="person-card" draggable>
            <div className="card-top">
                <button onClick={() => onButtonClick(personInfo)}>{button}</button>
            </div>
            <div className="card-mid">
                <div>{personInfo.userName}</div>
                <div style={{ fontSize: "15px" , textAlign:"end", width:"85%"}}>{timeString}</div>
            </div>
        </div>
    );
}

export default PersonCard;