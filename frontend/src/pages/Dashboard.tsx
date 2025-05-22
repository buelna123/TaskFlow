import { useAuthStore } from '../stores/authStore';

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  
  return (
    <div className="p-4">
      <h1>Welcome, {user?.firstName}!</h1>
      <button 
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;