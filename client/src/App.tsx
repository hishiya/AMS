import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimePage } from "./pages/AnimePage";
import { HomePage } from "./pages/HomePage";
import { SeriesPage } from "./pages/SeriesPage";
import { FilmsPage } from "./pages/FilmsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser, logout, type User } from "./api/authApi";
import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const syncSession = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    void syncSession();
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  const isAuthenticated = Boolean(currentUser);

  return (
    <main className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/anime">Anime</Link>
        <Link to="/films">Films</Link>
        <Link to="/series">Series</Link>
        <Link to="/dashboard">Dashboard</Link>
        {currentUser ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/anime"
          element={<AnimePage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/films"
          element={<FilmsPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/series"
          element={<SeriesPage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
