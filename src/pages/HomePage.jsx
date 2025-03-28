import Board from "../Components/Board";

function HomePage() {

    return (
        <>
            <main>
                <div className="go-space">
                    <Board type={'부재중'}/>
                </div>
                <div className="go-space">
                    <Board type={'근무중'}/>
                </div>
            </main>
        </>
    )
}

export default HomePage;