function Graph(props) {
    const { type, personInfoList, personTotal } = props

    return (
        <div className="graph-container">
            <div className="graph-top">
                <div>0</div><div>{personTotal}</div>
            </div>
            <div className="graph-mid">
                <div className="graph-bar">
                    <div className="graph-fill" style={{ width: `${(personInfoList.length / personTotal) * 100}%` }} />
                </div>
            </div>
            <div className="graph-bottom">
                <div>
                    {type.name} : <span style={{ color: "#3572EF" }}>{personInfoList.length}</span>명
                </div>
            </div>
        </div>
    );
}

export default Graph;