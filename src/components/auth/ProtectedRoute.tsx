import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'client';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'admin') {
        // Admin can access everything, otherwise check specific role
        // If user is client but tries to access admin, redirect to client dashboard
        if (requiredRole === 'admin') {
            return <Navigate to="/client/dashboard" replace />;
        }
        // If user is admin but tries to access client (should be allowed, but maybe redirect to admin dashboard?)
        // For now, allow admin to see client views if needed, or just strict check.
        // Let's stick to strict check: if role doesn't match and not admin, redirect.
    }

    return <>{children}</>;
}
