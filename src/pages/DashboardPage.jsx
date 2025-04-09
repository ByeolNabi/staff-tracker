import { useState } from "react";
import Dashboard from "../components/Dashboard";
import PersonDetail from "../components/PersonDetail";

function DashboardPage() {
    const [crtPerson, setCrtPerson] = useState('none')

    return (
        <>
            <main>
                <div className="board-space">
                    <Dashboard setCrtPerson={setCrtPerson} />
                </div>
                <div className="board-space">
                    <PersonDetail personName={crtPerson} />
                </div>
            </main>
        </>
    );
}

export default DashboardPage;