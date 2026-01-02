import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import PrivateRoute from './components/auth/PrivateRoute';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-8 bg-gray-50 min-h-screen">
                <Routes>
                  <Route path="/dashboard" element={<DashboardHome />} />
                  {/* Bija pages ahiya add thase */}
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