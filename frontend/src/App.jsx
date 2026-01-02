import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardHome from './pages/DashboardHome';
import PrivateRoute from './components/auth/PrivateRoute';
import Sidebar from './components/layout/Sidebar';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/*" element={
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-8 bg-gray-50 min-h-screen">
                <Routes>
                  <Route path="/dashboard" element={<DashboardHome />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;