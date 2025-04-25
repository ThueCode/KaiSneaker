// src/routes/AdminRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { isAuthenticated, userData } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (userData?.role.roleName !== 'ADMIN') return <Navigate to="/unauthorized" />;

    return <Outlet />;
};

export default AdminRoute;
