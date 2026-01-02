import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardHome from './pages/DashboardHome';
import PrivateRoute from './components/auth/PrivateRoute';
import Sidebar from './components/layout/Sidebar';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary', transition: '0.3s' }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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