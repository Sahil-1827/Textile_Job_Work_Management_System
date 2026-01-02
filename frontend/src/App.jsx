import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardHome from './pages/DashboardHome';
import PrivateRoute from './components/auth/PrivateRoute';
import Sidebar from './components/layout/Sidebar';
import API from './services/api';

function AuthHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          navigate('/', { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => API.interceptors.response.eject(interceptor);
  }, [navigate, setIsAuthenticated]);

  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(current => {
        const newAuth = !!token;
        return newAuth !== current ? newAuth : current;
      });
    };

    checkAuth();

    window.addEventListener('authChange', checkAuth);

    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  return (
    <Router>
      <AuthHandler setIsAuthenticated={setIsAuthenticated} />

      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', transition: '0.3s' }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />

          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
          />

          <Route element={<PrivateRoute />}>
            <Route path="/*" element={
              <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 4, transition: '0.3s' }}>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Box>
              </Box>
            } />
          </Route>
        </Routes>
      </Box>
    </Router>
  );
}

export default App;