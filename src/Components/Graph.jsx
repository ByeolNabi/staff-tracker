function Graph(props) {
    const { type, personInfoList } = props

    return (
        <div className="graph-container">
            <div className="graph-top">
                <div>0</div><div>6</div>
            </div>
            <div className="graph-mid">
                <div className="graph-bar">
                    <div className="graph-fill" style={{width:`${(personInfoList.length/6)*100}%`}}/>
                </div>
            </div>
            <div className="graph-bottom">
                <div>
                    {type.name} : <span style={{color:"#3572EF"}}>{personInfoList.length}</span>명
                </div>
            </div>
        </div>
    );
}

export default Graph;