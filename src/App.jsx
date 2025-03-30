import './App.css'
import { BrowserRouter } from "react-router";
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header'
import HomePage from './pages/Homepage'
import ManagePage from './pages/ManagePage';
import DashboardPage from './pages/DashboardPage';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
