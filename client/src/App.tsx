import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { AnimePage } from './pages/AnimePage'
import { HomePage } from './pages/HomePage'
import { SeriesPage } from './pages/SeriesPage'
import { FilmsPage } from './pages/FilmsPage'
import { DashboardPage } from './pages/DashboardPage'
import './App.css'

function App() {
  return (
    <main className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/anime">Anime</Link>
        <Link to="/films">Films</Link>  
        <Link to="/series">Series</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
