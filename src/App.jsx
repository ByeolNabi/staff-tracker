import './App.css'
import { BrowserRouter } from "react-router";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import HomePage from './pages/Homepage'
import ManagePage from './pages/ManagePage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
