import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    // Redirigir si no está autenticado (doble verificación)
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstName}!</h1>
      <p className="mt-2">This is your dashboard</p>
    </div>
  );
};

export default Dashboard;