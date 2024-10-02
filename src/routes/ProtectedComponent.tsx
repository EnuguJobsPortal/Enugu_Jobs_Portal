import useAuth from '@/hooks/useAuth';
import { ProtectedComponentProps } from '@/interfaces/routes.interface';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ element, allowedRoles }) => {
    const { isLoggedIn, user } = useAuth();

    //check if user is logged in
    if(!isLoggedIn)
    {
        return <Navigate to="/" replace />;
    }

    // Check if user is authenticated and has the required role
    const hasAccess = user && allowedRoles.includes(user.UserType);

    return hasAccess ? <>{element}</> : <Navigate to="/unauthorized" />;
};

export default ProtectedComponent;