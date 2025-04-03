import Dashboard from "../components/Dashboard";
import PersonDetail from "../components/PersonDetail";

function DashboardPage() {
    return (
        <>
            <main>
                <div className="board-space">
                    <Dashboard />
                </div>
                <div className="board-space">
                    <PersonDetail />
                </div>

            </main>
        </>
    );
}

export default DashboardPage;