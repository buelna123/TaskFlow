import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import { useAuthStore } from './stores/authStore';

const App = () => {
  const { initialize, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const PrivateRoute = ({ children, path }: { children: JSX.Element, path: string }) => {
    return isAuthenticated ? children : <Navigate to="/login" state={{ from: path }} replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />} />
        
        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={<PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>} 
        />
        <Route 
          path="/tasks" 
          element={<PrivateRoute path="/tasks"><Tasks /></PrivateRoute>} 
        />
        <Route 
          path="/profile" 
          element={<PrivateRoute path="/profile"><Profile /></PrivateRoute>} 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;